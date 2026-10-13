require('dotenv').config();
const https = require('https');

function fetchJson(url, options = {}) {
  return new Promise((resolve, reject) => {
    const parsedUrl = new URL(url);
    const reqOptions = {
      hostname: parsedUrl.hostname,
      path: parsedUrl.pathname + parsedUrl.search,
      method: options.method || 'GET',
      headers: {
        'User-Agent': 'Nomadas-Setup-Script',
        ...(options.headers || {})
      }
    };

    const req = https.request(reqOptions, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(data) });
        } catch (e) {
          resolve({ status: res.statusCode, raw: data });
        }
      });
    });

    req.on('error', reject);
    req.end();
  });
}

async function checkDeployment() {
  const token = process.env.VERCEL_TOKEN;
  const repoName = process.env.GITHUB_REPO_NAME || 'nomadas-agencia';

  const res = await fetchJson(`https://api.vercel.com/v6/deployments?projectId=${repoName}&limit=3`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (res.status === 200 && res.data.deployments && res.data.deployments.length > 0) {
    const dep = res.data.deployments[0];
    console.log(`🚀 Despliegue en Vercel detectado:`);
    console.log(`   Estado: ${dep.state || dep.status}`);
    console.log(`   URL: https://${dep.url}`);
    console.log(`   Creado: ${new Date(dep.createdAt).toLocaleString()}`);
  } else {
    console.log('ℹ️ Despliegues en Vercel:', res.data);
  }
}

checkDeployment();
