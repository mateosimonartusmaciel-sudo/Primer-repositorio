
import { useEffect, useRef, useState } from 'react';

function App() {
    const [noticias, setNoticias] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState('');

    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [noticiaEditando, setNoticiaEditando] = useState(null);

    const [categoria, setCategoria] = useState('');
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [contenido, setContenido] = useState('');
    const [imagen, setImagen] = useState(null);

    const [publicando, setPublicando] = useState(false);
    const [mensaje, setMensaje] = useState('');
    const [filtroCategoria, setFiltroCategoria] = useState('Todas');

    const categoriasBase = ['Plataformas', 'Personajes', 'Mapa y lugares', 'Historia y teorías'];
    const categorias = [...new Set([...categoriasBase, ...noticias.map(n => n.categoria).filter(Boolean)])];
    const noticiasFiltradas = filtroCategoria === 'Todas'
        ? noticias
        : noticias.filter(noticia => noticia.categoria === filtroCategoria);

    function obtenerRutaImagen(ruta) {
        if (!ruta) return '';

        // Las imágenes subidas desde el panel se sirven desde el backend.
        if (/^https?:\/\//i.test(ruta)) return ruta;
        if (ruta.startsWith('/uploads/')) {
            return `http://localhost:3001${ruta}`;
        }

        // Las imágenes originales pertenecen al frontend.
        // BASE_URL contempla tanto localhost como GitHub Pages.
        return `${import.meta.env.BASE_URL}${ruta.replace(/^\/+/, '')}`;
    }

    // REFERENCIAS
    const formularioRef = useRef(null);
    const enviandoRef = useRef(false);

    // CARGAR NOTICIAS Y VERIFICAR SESIÓN
    useEffect(() => {
        async function cargarNoticias() {
            try {
                const sesion = await fetch(
                    'http://localhost:3001/api/administradores/sesion',
                    { credentials: 'include' }
                );

                if (!sesion.ok) {
                    window.location.href = 'login.html';
                    return;
                }

                const respuesta = await fetch(
                    'http://localhost:3001/api/noticias',
                    {
                        credentials: 'include',
                        cache: 'no-store'
                    }
                );

                if (!respuesta.ok) {
                    throw new Error('No se pudieron cargar las noticias.');
                }

                const datos = await respuesta.json();
                setNoticias(datos);

            } catch (error) {
                console.error('Error al cargar noticias:', error);
                setError('No se pudo conectar con el servidor.');

            } finally {
                setCargando(false);
            }
        }

        cargarNoticias();
    }, []);

    // LIMPIAR FORMULARIO
    function limpiarFormulario() {
        setCategoria('');
        setTitulo('');
        setDescripcion('');
        setContenido('');
        setImagen(null);
        setNoticiaEditando(null);

        if (formularioRef.current) {
            formularioRef.current.reset();
        }
    }

    // PUBLICAR O ACTUALIZAR UNA NOTICIA
    async function publicarNoticia(e) {
        e.preventDefault();

        if (enviandoRef.current) {
            return;
        }

        if (!imagen && !noticiaEditando) {
            setMensaje('Tenés que seleccionar una imagen.');
            return;
        }

        enviandoRef.current = true;
        setPublicando(true);
        setMensaje('');

        console.log('INICIO: envío de noticia');

        const datosFormulario = new FormData();

        datosFormulario.append('categoria', categoria);
        datosFormulario.append('titulo', titulo);
        datosFormulario.append('descripcion', descripcion);
        datosFormulario.append('contenido', contenido);

        if (imagen) {
            datosFormulario.append('imagen', imagen);
        }

        try {
            const estaEditando = Boolean(noticiaEditando);

            const url = estaEditando
                ? `http://localhost:3001/api/noticias/${noticiaEditando._id}`
                : 'http://localhost:3001/api/noticias';

            console.log('ENVIANDO:', estaEditando ? 'PUT' : 'POST');

            const respuesta = await fetch(url, {
                method: estaEditando ? 'PUT' : 'POST',
                credentials: 'include',
                body: datosFormulario
            });

            console.log('RESPUESTA DEL SERVIDOR:', respuesta.status);

            const datos = await respuesta.json();

            if (!respuesta.ok) {
                throw new Error(
                    datos.mensaje || 'No se pudo guardar la noticia.'
                );
            }

            if (!datos.noticia) {
                throw new Error('El servidor no devolvió la noticia actualizada.');
            }

            if (estaEditando) {
                setNoticias(previas =>
                    previas.map(noticia =>
                        noticia._id === datos.noticia._id
                            ? datos.noticia
                            : noticia
                    )
                );

                setMensaje('¡Noticia actualizada correctamente!');

                console.log('NOTICIA ACTUALIZADA:', datos.noticia);

            } else {
                setNoticias(previas => [
                    datos.noticia,
                    ...previas
                ]);

                setMensaje('¡Noticia publicada correctamente!');

                console.log('NOTICIA PUBLICADA:', datos.noticia);
            }

            limpiarFormulario();
            setMostrarFormulario(false);

            console.log('FORMULARIO LIMPIADO');

        } catch (error) {
            console.error('ERROR AL GUARDAR:', error);
            setMensaje(error.message || 'Ocurrió un error al guardar.');

        } finally {
            enviandoRef.current = false;
            setPublicando(false);

            console.log('FIN DEL PROCESO DE GUARDADO');
        }
    }

    // PREPARAR NOTICIA PARA EDITAR
    function prepararEdicion(noticia) {
        setNoticiaEditando(noticia);

        setCategoria(noticia.categoria);
        setTitulo(noticia.titulo);
        setDescripcion(noticia.descripcion);
        setContenido(noticia.contenido || '');

        setImagen(null);
        setMensaje('');
        setMostrarFormulario(true);
    }

    // ELIMINAR NOTICIA
    async function eliminarNoticia(id) {
        const confirmar = window.confirm(
            '¿Estás seguro de que querés eliminar esta noticia?'
        );

        if (!confirmar) {
            return;
        }

        try {
            const respuesta = await fetch(
                `http://localhost:3001/api/noticias/${id}`,
                {
                    method: 'DELETE',
                    credentials: 'include'
                }
            );

            const datos = await respuesta.json();

            if (!respuesta.ok) {
                throw new Error(
                    datos.mensaje || 'No se pudo eliminar la noticia.'
                );
            }

            setNoticias(previas =>
                previas.filter(noticia => noticia._id !== id)
            );

            setMensaje('¡Noticia eliminada correctamente!');

        } catch (error) {
            console.error('Error al eliminar:', error);
            setMensaje(error.message);
        }
    }

    // ABRIR FORMULARIO DE NUEVA NOTICIA
    useEffect(() => {
        const boton = document.getElementById('btnNuevaNoticia');

        function abrirFormulario() {
            limpiarFormulario();
            setMensaje('');
            setMostrarFormulario(true);
        }

        boton?.addEventListener('click', abrirFormulario);

        return () => {
            boton?.removeEventListener('click', abrirFormulario);
        };
    }, []);

    // CERRAR SESIÓN
    useEffect(() => {
        const boton = document.getElementById('btnCerrarSesion');

        async function cerrarSesion() {
            boton.disabled = true;

            try {
                const respuesta = await fetch(
                    'http://localhost:3001/api/administradores/logout',
                    {
                        method: 'POST',
                        credentials: 'include'
                    }
                );

                if (!respuesta.ok) {
                    throw new Error('No se pudo cerrar la sesión.');
                }

                window.location.href = 'login.html';

            } catch (error) {
                console.error('Error al cerrar sesión:', error);
                boton.disabled = false;
                setMensaje(error.message);
            }
        }

        boton?.addEventListener('click', cerrarSesion);

        return () => {
            boton?.removeEventListener('click', cerrarSesion);
        };
    }, []);

    // ESTADOS DE CARGA Y ERROR
    if (cargando) {
        return <p>Cargando noticias...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    // INTERFAZ
    return (
        <div className="noticias-admin">

            {mensaje && <p>{mensaje}</p>}

            {mostrarFormulario && (
                <form
                    ref={formularioRef}
                    onSubmit={publicarNoticia}
                >

                    <h2>
                        {noticiaEditando
                            ? 'Editar noticia'
                            : 'Nueva noticia'}
                    </h2>

                    <label>Categoría</label>
                    <input
                        type="text"
                        value={categoria}
                        onChange={e => setCategoria(e.target.value)}
                        required
                    />

                    <label>Título</label>
                    <input
                        type="text"
                        value={titulo}
                        onChange={e => setTitulo(e.target.value)}
                        required
                    />

                    <label>Descripción</label>
                    <textarea
                        value={descripcion}
                        onChange={e => setDescripcion(e.target.value)}
                        required
                    />

                    <label>Contenido completo del artículo</label>
                    <textarea
                        value={contenido}
                        onChange={e => setContenido(e.target.value)}
                        placeholder={'Escribí o pegá aquí el artículo completo.\n\nPodés separar los párrafos con una línea en blanco y escribir los subtítulos en líneas independientes.'}
                        rows={14}
                        required
                    />

                    <p>
                        Consejo: separá los párrafos con una línea en blanco. Para los subtítulos, escribí el texto en una línea independiente.
                    </p>
                    <p>
                        Palabras aproximadas: {contenido.trim() ? contenido.trim().split(/\s+/).length : 0}
                    </p>

                    <label>Imagen</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={e => setImagen(e.target.files[0] || null)}
                    />

                    {noticiaEditando && (
                        <p>
                            Si no seleccionás otra imagen,
                            se conservará la actual.
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={publicando}
                    >
                        {publicando
                            ? 'GUARDANDO...'
                            : noticiaEditando
                                ? 'GUARDAR CAMBIOS'
                                : 'PUBLICAR NOTICIA'}
                    </button>

                    <button
                        type="button"
                        disabled={publicando}
                        onClick={() => {
                            limpiarFormulario();
                            setMostrarFormulario(false);
                        }}
                    >
                        CANCELAR
                    </button>

                </form>
            )}

            <section className="resumen-admin">
                <div className="resumen-card resumen-total">
                    <span>Total de noticias</span>
                    <strong>{noticias.length}</strong>
                </div>
                {categorias.map(nombre => (
                    <div className="resumen-card" key={nombre}>
                        <span>{nombre}</span>
                        <strong>{noticias.filter(n => n.categoria === nombre).length}</strong>
                    </div>
                ))}
            </section>

            <div className="filtro-noticias">
                <label htmlFor="filtroCategoria">Filtrar por categoría</label>
                <select id="filtroCategoria" value={filtroCategoria} onChange={e => setFiltroCategoria(e.target.value)}>
                    <option value="Todas">Todas las categorías</option>
                    {categorias.map(nombre => <option key={nombre} value={nombre}>{nombre}</option>)}
                </select>
                <span>{noticiasFiltradas.length} noticia(s)</span>
            </div>

            <div>
                {noticias.length === 0 ? (
                    <p>Todavía no hay noticias publicadas.</p>
                ) : (
                    noticiasFiltradas.map(noticia => (
                        <article key={noticia._id}>

                            <h3>{noticia.titulo}</h3>

                            <p>{noticia.categoria} · {noticia.origen === 'original' ? 'Noticia original' : 'Publicada desde el panel'}</p>

                            <p>{noticia.descripcion}</p>

                            <img
                                src={obtenerRutaImagen(noticia.imagen)}
                                alt={noticia.titulo}
                                width="200"
                            />

                            <button
                                type="button"
                                onClick={() => prepararEdicion(noticia)}
                            >
                                EDITAR
                            </button>

                            <button
                                type="button"
                                onClick={() => eliminarNoticia(noticia._id)}
                            >
                                ELIMINAR
                            </button>

                        </article>
                    ))
                )}
            </div>

        </div>
    );
}

export default App;
