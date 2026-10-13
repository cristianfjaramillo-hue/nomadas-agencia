require('dotenv').config();
const { ApifyClient } = require('apify-client');

async function testConnection() {
  const token = process.env.APIFY_API_TOKEN;
  if (!token) {
    console.error('ERROR: No se encontró APIFY_API_TOKEN en el archivo .env');
    process.exit(1);
  }

  const client = new ApifyClient({ token });

  try {
    const user = await client.user().get();
    console.log('✅ Conexión con Apify exitosa!');
    console.log(`👤 Usuario: ${user.username}`);
    console.log(`📧 Email: ${user.email}`);
    console.log(`💳 Plan: ${user.plan?.id || 'Free Tier'}`);
  } catch (error) {
    console.error('❌ Error conectando a Apify:', error.message);
    process.exit(1);
  }
}

testConnection();
