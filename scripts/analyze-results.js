const fs = require('fs');
const path = require('path');

const dataFile = path.join(__dirname, '..', 'data', 'market-research', 'google-search-results.json');
const rawData = JSON.parse(fs.readFileSync(dataFile, 'utf-8'));

console.log('=== ANÁLISIS DE RESULTADOS EXTRAÍDOS ===\n');

rawData.forEach((search, index) => {
  console.log(`\n-----------------------------------------`);
  console.log(`📌 Búsqueda ${index + 1}: "${search.searchQuery?.term || 'N/A'}"`);
  console.log(`-----------------------------------------`);

  if (search.organicResults && search.organicResults.length > 0) {
    search.organicResults.forEach((item, rIndex) => {
      console.log(`${rIndex + 1}. [${item.title}]`);
      console.log(`   URL: ${item.url}`);
      console.log(`   Snippet: ${item.description || item.snippet || ''}\n`);
    });
  } else {
    console.log('No se encontraron resultados orgánicos.');
  }

  if (search.relatedQueries && search.relatedQueries.length > 0) {
    console.log('🔗 Búsquedas relacionadas:');
    search.relatedQueries.forEach(q => console.log(`   - ${q.title || q}`));
  }
});
