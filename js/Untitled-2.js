// BOTÓN DE SUSCRIPCIÓN

const boton = document.querySelector('#botonSuscripcion');

console.log(boton);

boton.addEventListener('click', function(event) {

    console.log(event.target);
    console.log(event.type);

    alert('Hola, bienvenido a la página de noticias de GTA VI');
});

// FORMULARIO DE SUSCRIPCIÓN

const formulario = document.querySelector('#formularioSuscripcion');

formulario.addEventListener('submit', function(event) {

    event.preventDefault();

    const nombre = document.querySelector('#nombre').value;
    const email = document.querySelector('#email').value;

    console.log('Nombre:', nombre);
    console.log('Email:', email);

    alert('¡Gracias por suscribirte!');
});


// FORMULARIO DE CONTACTO

const formularioContacto = document.querySelector('#formularioContacto');

formularioContacto.addEventListener('submit', function(event) {

    event.preventDefault();

    const nombre = document.querySelector('#nombreContacto').value;
    const email = document.querySelector('#emailContacto').value;
    const mensaje = document.querySelector('#mensaje').value;

    console.log('Nombre:', nombre);
    console.log('Email:', email);
    console.log('Mensaje:', mensaje);

    alert('Mensaje enviado correctamente');
});

// CONTADOR GTA VI

const fechaLanzamiento = new Date('November 19, 2026 00:00:00');

function actualizarContador() {

    const fechaActual = new Date();

    const diferencia = fechaLanzamiento - fechaActual;

    if (diferencia <= 0) {

        document.querySelector('#dias').textContent = 0;
        document.querySelector('#horas').textContent = 0;
        document.querySelector('#minutos').textContent = 0;
        document.querySelector('#segundos').textContent = 0;

        console.log('¡GTA VI ya está disponible!');

    } else {

        const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));

        const horas = Math.floor(
            diferencia / (1000 * 60 * 60) % 24
        );

        const minutos = Math.floor(
            diferencia / (1000 * 60) % 60
        );

        const segundos = Math.floor(
            diferencia / 1000 % 60
        );

        document.querySelector('#dias').textContent = dias;
        document.querySelector('#horas').textContent = horas;
        document.querySelector('#minutos').textContent = minutos;
        document.querySelector('#segundos').textContent = segundos;
    }
}

actualizarContador();

setInterval(actualizarContador, 1000);



// =========================================================
// ANALIZADOR DE RENDIMIENTO GTA VI CON IA (MOTOR HÍBRIDO)
// =========================================================

// OPCIONAL: Si deseas conectar la API de Google Gemini en vivo, pega tu API Key aquí.
// Si se deja vacío (""), funciona automáticamente con el Motor Inteligente Local (100% gratis).
const GEMINI_API_KEY = "";

function evaluarCPU(textoCpu) {
    const cpu = textoCpu.toLowerCase();

    // Tope de gama / Next-gen
    if (cpu.includes('7800x3d') || cpu.includes('7950') || cpu.includes('7900') || cpu.includes('9800x3d') || cpu.includes('14900') || cpu.includes('13900') || cpu.includes('14700') || cpu.includes('13700')) {
        return { puntaje: 98, gama: 'alta-extrema' };
    }
    // Gama alta moderna
    if (cpu.includes('5800x3d') || cpu.includes('5700x3d') || cpu.includes('7700') || cpu.includes('7600') || cpu.includes('13600') || cpu.includes('14600') || cpu.includes('12700') || cpu.includes('ryzen 9') || cpu.includes('i9')) {
        return { puntaje: 88, gama: 'alta' };
    }
    // Gama media-alta (Recomendado sólido)
    if (cpu.includes('5600') || cpu.includes('5700') || cpu.includes('5800') || cpu.includes('12400') || cpu.includes('13400') || cpu.includes('14400') || cpu.includes('12600') || cpu.includes('11700') || cpu.includes('10700')) {
        return { puntaje: 76, gama: 'media-alta' };
    }
    // Gama media / Mínimo recomendado (6 núcleos)
    if (cpu.includes('3600') || cpu.includes('5500') || cpu.includes('4500') || cpu.includes('10400') || cpu.includes('11400') || cpu.includes('12100') || cpu.includes('13100') || cpu.includes('ryzen 7') || cpu.includes('i7') || cpu.includes('ryzen 5') || cpu.includes('i5')) {
        return { puntaje: 62, gama: 'media' };
    }
    // Gama de entrada
    if (cpu.includes('3200g') || cpu.includes('3400g') || cpu.includes('2600') || cpu.includes('1600') || cpu.includes('10100') || cpu.includes('9400') || cpu.includes('9100') || cpu.includes('ryzen 3') || cpu.includes('i3')) {
        return { puntaje: 42, gama: 'baja' };
    }

    return { puntaje: 30, gama: 'muy-baja' };
}

function evaluarGPU(textoGpu) {
    const gpu = textoGpu.toLowerCase();

    if (gpu.includes('integrad') || gpu.includes('uhd') || gpu.includes('iris') || gpu.includes('vega 8') || gpu.includes('vega 7') || gpu.includes('gt 1030') || gpu.includes('gt 710')) {
        return { puntaje: 18, vram: 2, marca: 'integrada', soportaRT: false, soportaDLSS: false };
    }
    // Ultra Gama (4K)
    if (gpu.includes('4090') || gpu.includes('5090') || gpu.includes('5080') || gpu.includes('4080') || gpu.includes('7900 xtx') || gpu.includes('7900 xt')) {
        return { puntaje: 99, vram: 16, marca: gpu.includes('rx') || gpu.includes('7900') ? 'amd' : 'nvidia', soportaRT: true, soportaDLSS: !gpu.includes('7900') };
    }
    // Gama Alta (1440p Ultra / 4K DLSS)
    if (gpu.includes('4070') || gpu.includes('3080') || gpu.includes('3090') || gpu.includes('7800 xt') || gpu.includes('7900 gre') || gpu.includes('6800 xt') || gpu.includes('6900')) {
        return { puntaje: 88, vram: 12, marca: gpu.includes('rx') || gpu.includes('6800') || gpu.includes('7800') ? 'amd' : 'nvidia', soportaRT: true, soportaDLSS: gpu.includes('rtx') || gpu.includes('4070') || gpu.includes('3080') || gpu.includes('3090') };
    }
    // Gama Media-Alta (1080p Ultra / 1440p Alto)
    if (gpu.includes('4060 ti') || gpu.includes('3070') || gpu.includes('3060 ti') || gpu.includes('6700 xt') || gpu.includes('6750') || gpu.includes('7700 xt')) {
        return { puntaje: 78, vram: 10, marca: gpu.includes('rx') || gpu.includes('67') || gpu.includes('77') ? 'amd' : 'nvidia', soportaRT: true, soportaDLSS: gpu.includes('rtx') || gpu.includes('4060') || gpu.includes('3070') || gpu.includes('3060') };
    }
    // Gama Media Estándar (1080p Alto)
    if (gpu.includes('4060') || gpu.includes('3060') || gpu.includes('2070') || gpu.includes('2080') || gpu.includes('6600 xt') || gpu.includes('6650') || gpu.includes('7600') || gpu.includes('6600')) {
        return { puntaje: 68, vram: 8, marca: gpu.includes('rx') || gpu.includes('66') || gpu.includes('76') ? 'amd' : 'nvidia', soportaRT: true, soportaDLSS: gpu.includes('rtx') || gpu.includes('4060') || gpu.includes('3060') || gpu.includes('20') };
    }
    // Gama Media-Baja (Requisitos Mínimos / 1080p Medio-Bajo)
    if (gpu.includes('2060') || gpu.includes('3050') || gpu.includes('1660') || gpu.includes('1070') || gpu.includes('1080') || gpu.includes('5600 xt') || gpu.includes('5700')) {
        return { puntaje: 52, vram: 6, marca: gpu.includes('rx') ? 'amd' : 'nvidia', soportaRT: gpu.includes('2060') || gpu.includes('3050'), soportaDLSS: gpu.includes('2060') || gpu.includes('3050') };
    }
    // Gama Baja Antigua (1080p Bajo con FSR)
    if (gpu.includes('1650') || gpu.includes('1060') || gpu.includes('1050') || gpu.includes('580') || gpu.includes('570') || gpu.includes('6500')) {
        return { puntaje: 35, vram: 4, marca: gpu.includes('rx') || gpu.includes('580') ? 'amd' : 'nvidia', soportaRT: false, soportaDLSS: false };
    }

    // Heurística por defecto si escribe otro modelo
    if (gpu.includes('rtx')) {
        return { puntaje: 70, vram: 8, marca: 'nvidia', soportaRT: true, soportaDLSS: true };
    }
    if (gpu.includes('rx')) {
        return { puntaje: 62, vram: 8, marca: 'amd', soportaRT: false, soportaDLSS: false };
    }
    return { puntaje: 40, vram: 4, marca: 'generica', soportaRT: false, soportaDLSS: false };
}

function calcularRendimientoGTAVI(datos) {
    const infoCPU = evaluarCPU(datos.cpu);
    const infoGPU = evaluarGPU(datos.gpu);
    const ram = parseInt(datos.ram, 10);

    // Penalización por resolución
    let factorResolucion = 1.0;
    let textoResolucion = 'en 1080p (Full HD)';
    if (datos.resolucion === '1440p') {
        factorResolucion = 0.74;
        textoResolucion = 'en 1440p (2K)';
    } else if (datos.resolucion === '4k') {
        factorResolucion = 0.48;
        textoResolucion = 'en 4K (Ultra HD)';
    }

    // Penalización por RAM y Disco
    let factorRAM = 1.0;
    if (ram < 8) factorRAM = 0.45;
    else if (ram === 8) factorRAM = 0.78;
    else if (ram === 12) factorRAM = 0.92;
    else if (ram >= 32) factorRAM = 1.05;

    let factorDisco = 1.0;
    if (datos.almacenamiento === 'hdd') factorDisco = 0.80;
    else if (datos.almacenamiento === 'ssd') factorDisco = 0.96;

    // Puntaje ponderado (GPU 60%, CPU 40%)
    const puntajeBase = (infoGPU.puntaje * 0.62) + (infoCPU.puntaje * 0.38);
    const puntajeFinal = Math.min(100, Math.max(8, Math.round(puntajeBase * factorResolucion * factorRAM * factorDisco)));

    // Cálculo de FPS estimados
    const fpsPromedio = Math.max(12, Math.round((puntajeFinal * 0.95)));
    const fpsMin = Math.max(10, fpsPromedio - 7);
    const fpsMax = fpsPromedio + 8;

    // Determinar veredicto y ajustes
    let veredicto = '';
    let subtitulo = '';
    let calidad = '';
    let escalado = '';
    let rayTracing = '';

    const nombreEscalador = infoGPU.soportaDLSS ? 'NVIDIA DLSS 3' : 'AMD FSR 3';

    if (puntajeFinal >= 80) {
        veredicto = '🔥 EXCELENTE (ULTRA)';
        subtitulo = 'Tu PC está lista para dominar Vice City al máximo nivel.';
        calidad = 'Ultra / Muy Alto';
        escalado = `${nombreEscalador} (Calidad)`;
        rayTracing = infoGPU.soportaRT ? 'Activado (Alto)' : 'Desactivado';
    } else if (puntajeFinal >= 62) {
        veredicto = '✅ MUY FLUIDO (RECOMENDADO)';
        subtitulo = 'Cumplís holgadamente para jugar con gran calidad visual y buena tasa de FPS.';
        calidad = 'Alto / Medio-Alto';
        escalado = `${nombreEscalador} (Calidad / Equilibrado)`;
        rayTracing = infoGPU.soportaRT ? 'Activado (Medio)' : 'Desactivado';
    } else if (puntajeFinal >= 44) {
        veredicto = '⚠️ JUGABLE (AJUSTES MEDIOS/BAJOS)';
        subtitulo = 'Podrás jugar GTA VI ajustando opciones gráficas y activando reescalado.';
        calidad = 'Medio / Bajo';
        escalado = `${nombreEscalador} (Equilibrado / Rendimiento)`;
        rayTracing = 'Desactivado (Recomendado)';
    } else {
        veredicto = '❌ RENDIMIENTO INSUFICIENTE';
        subtitulo = 'Tu configuración actual sufrirá caídas severas de FPS en GTA VI.';
        calidad = 'Bajo (720p / 1080p)';
        escalado = 'FSR 3 (Ultra Rendimiento)';
        rayTracing = 'No compatible';
    }

    // Generar explicación detallada de IA
    const parrafos = [];
    parrafos.push(
        `<p><strong> Análisis de Hardware (${datos.cpu} + ${datos.gpu}):</strong> Para la resolución seleccionada (${textoResolucion}), estimamos un rendimiento de entre <strong>${fpsMin} y ${fpsMax} FPS</strong> configurando los gráficos en <strong>${calidad}</strong>.</p>`
    );

    // Detección de cuello de botella
    if (infoGPU.puntaje - infoCPU.puntaje >= 24) {
        parrafos.push(
            `<p><strong>⚖️ Alerta de Cuello de Botella (CPU):</strong> Tu tarjeta gráfica <em>${datos.gpu}</em> es muy potente, pero el procesador <em>${datos.cpu}</em> podría limitarla en las zonas más pobladas de Leonida debido a la densa simulación de tráfico y NPCs del motor RAGE 9.</p>`
        );
    } else if (infoCPU.puntaje - infoGPU.puntaje >= 24) {
        parrafos.push(
            `<p><strong>⚖️ Alerta de Cuello de Botella (GPU):</strong> Tenés un excelente procesador (<em>${datos.cpu}</em>), pero tu placa de video (<em>${datos.gpu}</em>) será el límite principal. Activar <strong>${escalado}</strong> te dará hasta un 35% extra de FPS.</p>`
        );
    } else {
        parrafos.push(
            `<p><strong>⚖️ Equilibrio del Sistema:</strong> Tu procesador y tu tarjeta gráfica están muy bien equilibrados entre sí, evitando cuellos de botella marcados.</p>`
        );
    }

    // Recomendaciones de RAM y Almacenamiento
    const consejos = [];
    if (ram < 16) {
        consejos.push(`Ampliar tu memoria RAM de ${ram} GB a <strong>16 GB en Dual-Channel</strong> es clave para evitar tirones (stuttering) al conducir a alta velocidad.`);
    }
    if (datos.almacenamiento === 'hdd') {
        consejos.push(`⚠️ <strong>Importante:</strong> Seleccionaste un Disco Duro Mecánico (HDD). GTA VI requiere un <strong>SSD NVMe</strong> con tecnología DirectStorage para cargar el mapa sin texturas borrosas ni pantallas congeladas.`);
    }
    if (consejos.length > 0) {
        parrafos.push(`<p><strong>💡 Recomendación de actualización IA:</strong> ${consejos.join(' ')}</p>`);
    } else {
        parrafos.push(`<p><strong>💡 Memoria y Almacenamiento óptimos:</strong> Con ${ram} GB de RAM y unidad SSD, la carga de texturas de Vice City será instantánea.</p>`);
    }

    return {
        puntajeFinal,
        fpsTexto: `${fpsMin} - ${fpsMax}`,
        textoResolucion,
        veredicto,
        subtitulo,
        calidad,
        escalado,
        rayTracing,
        explicacionHTML: parrafos.join('')
    };
}

async function consultarGeminiAPI(datos, calculoBase) {
    if (!GEMINI_API_KEY || GEMINI_API_KEY.trim() === "") {
        return null;
    }

    const prompt = `Sos un experto en hardware de PC y en el motor RAGE de Rockstar Games para GTA VI.
Un visitante de nuestra web de noticias de GTA VI ingresó esta PC:
- CPU: ${datos.cpu}
- GPU: ${datos.gpu}
- RAM: ${datos.ram} GB
- Resolución: ${datos.resolucion}
- Almacenamiento: ${datos.almacenamiento}
- Estimación base: ${calculoBase.fpsTexto} FPS en calidad ${calculoBase.calidad}.

Redactá un diagnóstico breve (máximo 3 párrafos cortos en español rioplatense/neutro) explicando cómo le correrá GTA VI, si tendrá cuello de botella y qué ajuste o mejora le recomendás. Usá etiquetas <p> y <strong>.`;

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;

    const respuesta = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }]
        })
    });

    if (!respuesta.ok) {
        throw new Error('Error al consultar Gemini API');
    }

    const json = await respuesta.json();
    const texto = json?.candidates?.[0]?.content?.parts?.[0]?.text;
    return texto || null;
}

const formAnalizador = document.querySelector('#formularioAnalizadorPC');

if (formAnalizador) {
    formAnalizador.addEventListener('submit', async function(event) {
        event.preventDefault();

        const datosUsuario = {
            cpu: document.querySelector('#cpuInput').value.trim(),
            gpu: document.querySelector('#gpuInput').value.trim(),
            ram: document.querySelector('#ramSelect').value,
            resolucion: document.querySelector('#resolucionSelect').value,
            almacenamiento: document.querySelector('#almacenamientoSelect').value
        };

        const cajaCargando = document.querySelector('#iaCargando');
        const cajaResultado = document.querySelector('#iaResultado');
        const textoCarga = document.querySelector('#textoCargaIA');

        cajaResultado.classList.add('oculto');
        cajaCargando.classList.remove('oculto');

        textoCarga.textContent = `Analizando ${datosUsuario.cpu} y ${datosUsuario.gpu} con IA...`;

        const resultado = calcularRendimientoGTAVI(datosUsuario);

        // Pequeña pausa visual para simular el análisis o consultar API
        await new Promise(resolve => setTimeout(resolve, 850));

        let explicacionFinal = resultado.explicacionHTML;
        const badgeModo = document.querySelector('#modoIABadge');

        if (GEMINI_API_KEY && GEMINI_API_KEY.trim() !== "") {
            try {
                const respuestaViva = await consultarGeminiAPI(datosUsuario, resultado);
                if (respuestaViva) {
                    explicacionFinal = respuestaViva;
                    badgeModo.textContent = '✨ Gemini AI Live';
                }
            } catch (err) {
                console.warn('Usando motor híbrido local:', err);
                badgeModo.textContent = '⚡ Motor IA Híbrido';
            }
        } else {
            badgeModo.textContent = '⚡ Motor IA Híbrido';
        }

        // Mostrar resultados en el DOM
        document.querySelector('#resVeredicto').textContent = resultado.veredicto;
        document.querySelector('#resSubtitulo').textContent = resultado.subtitulo;
        document.querySelector('#resFPS').textContent = `${resultado.fpsTexto} FPS`;
        document.querySelector('#resResolucionNota').textContent = resultado.textoResolucion;
        document.querySelector('#resPorcentaje').textContent = `${resultado.puntajeFinal}%`;
        document.querySelector('#resBarraProgreso').style.width = `${resultado.puntajeFinal}%`;
        document.querySelector('#resCalidad').textContent = resultado.calidad;
        document.querySelector('#resEscalado').textContent = resultado.escalado;
        document.querySelector('#resRayTracing').textContent = resultado.rayTracing;
        document.querySelector('#resExplicacionIA').innerHTML = explicacionFinal;

        cajaCargando.classList.add('oculto');
        cajaResultado.classList.remove('oculto');
    });
}
