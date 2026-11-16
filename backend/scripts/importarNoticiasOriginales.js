require('dotenv').config();
const mongoose = require('mongoose');
const Noticia = require('../models/Noticia');
const noticiasOriginales = require('../data/noticiasOriginales.json');

async function importar() {
    if (!process.env.MONGO_URI) {
        throw new Error('No se encontró MONGO_URI. Revisá el archivo .env del backend.');
    }
    await mongoose.connect(process.env.MONGO_URI, { dbName: 'gta6' });
    let nuevas = 0;
    let existentes = 0;

    for (const noticia of noticiasOriginales) {
        const resultado = await Noticia.updateOne(
            { slug: noticia.slug },
            { $setOnInsert: noticia },
            { upsert: true }
        );
        if (resultado.upsertedCount) nuevas++;
        else existentes++;
    }

    console.log(`Importación terminada. Nuevas: ${nuevas}. Ya existentes: ${existentes}.`);
    await mongoose.disconnect();
}

importar().catch(async error => {
    console.error('No se pudieron importar las noticias:', error);
    await mongoose.disconnect().catch(() => {});
    process.exit(1);
});
