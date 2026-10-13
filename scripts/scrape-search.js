require('dotenv').config();
const { ApifyClient } = require('apify-client');
const fs = require('fs');
const path = require('path');

async function runSearchScraper() {
  const client = new ApifyClient({
    token: process.env.APIFY_API_TOKEN,
  });

  console.log('🔍 Iniciando extracción de investigación de mercado en Ecuador con Apify...');

  const input = {
    queries: [
      'agencia de marketing digital Puyo Pastaza',
      'diseño grafico y publicidad Puyo Ecuador',
      'agencias de marketing digital Ecuador servicios destacados'
    ].join('\n'),
    maxPagesPerQuery: 1,
    resultsPerPage: 10,
    countryCode: 'ec',
    languageCode: 'es'
  };

  try {
    console.log('🚀 Ejecutando actor: apify/google-search-scraper...');
    const run = await client.actor('apify/google-search-scraper').call(input);
    console.log(`✅ Extracción completada! Run ID: ${run.id}`);

    // Obtener los resultados del dataset
    const { items } = await client.dataset(run.defaultDatasetId).listItems();
    console.log(`📊 Se obtuvieron ${items.length} conjuntos de resultados.`);

    // Crear carpeta data/market-research
    const outputDir = path.join(__dirname, '..', 'data', 'market-research');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const outputFile = path.join(outputDir, 'google-search-results.json');
    fs.writeFileSync(outputFile, JSON.stringify(items, null, 2), 'utf-8');
    console.log(`💾 Resultados guardados en: ${outputFile}`);

    return items;
  } catch (error) {
    console.error('❌ Error durante la extracción:', error.message);
    throw error;
  }
}

runSearchScraper();
