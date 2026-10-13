require('dotenv').config();
const https = require('https');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

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
          const json = JSON.parse(data);
          resolve({ status: res.statusCode, data: json });
        } catch (e) {
          resolve({ status: res.statusCode, raw: data });
        }
      });
    });

    req.on('error', reject);
    if (options.body) {
      req.write(typeof options.body === 'string' ? options.body : JSON.stringify(options.body));
    }
    req.end();
  });
}

async function run() {
  const githubToken = process.env.GITHUB_TOKEN;
  const vercelToken = process.env.VERCEL_TOKEN;

  console.log('🔄 Validando credenciales de GitHub y Vercel...\n');

  // 1. Validar GitHub
  let githubUser;
  try {
    const ghRes = await fetchJson('https://api.github.com/user', {
      headers: {
        'Authorization': `Bearer ${githubToken}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    });

    if (ghRes.status !== 200) {
      throw new Error(`GitHub API Error (${ghRes.status}): ${JSON.stringify(ghRes.data)}`);
    }
    githubUser = ghRes.data;
    console.log(`✅ GitHub conectado con éxito!`);
    console.log(`   Usuario: @${githubUser.login}`);
    console.log(`   Nombre: ${githubUser.name || 'N/A'}`);
  } catch (err) {
    console.error(`❌ Error en GitHub:`, err.message);
    process.exit(1);
  }

  // 2. Validar Vercel
  let vercelUser;
  try {
    const vercelRes = await fetchJson('https://api.vercel.com/v2/user', {
      headers: {
        'Authorization': `Bearer ${vercelToken}`
      }
    });

    if (vercelRes.status !== 200) {
      throw new Error(`Vercel API Error (${vercelRes.status}): ${JSON.stringify(vercelRes.data)}`);
    }
    vercelUser = vercelRes.data.user;
    console.log(`✅ Vercel conectado con éxito!`);
    console.log(`   Usuario: ${vercelUser.username || vercelUser.name}`);
    console.log(`   Email: ${vercelUser.email}`);
  } catch (err) {
    console.error(`❌ Error en Vercel:`, err.message);
    process.exit(1);
  }

  // 3. Actualizar GITHUB_OWNER y GITHUB_REPO_NAME en .env si falta
  const envPath = path.join(__dirname, '..', '.env');
  let envContent = fs.readFileSync(envPath, 'utf-8');
  const repoName = 'nomadas-agencia';

  if (!envContent.includes(`GITHUB_OWNER=${githubUser.login}`)) {
    envContent = envContent.replace(/GITHUB_OWNER=.*(\r?\n)/, `GITHUB_OWNER=${githubUser.login}$1`);
  }
  if (!envContent.includes(`GITHUB_REPO_NAME=${repoName}`)) {
    envContent = envContent.replace(/GITHUB_REPO_NAME=.*(\r?\n)/, `GITHUB_REPO_NAME=${repoName}$1`);
  }
  fs.writeFileSync(envPath, envContent, 'utf-8');

  // 4. Crear repositorio en GitHub si no existe
  console.log(`\n📦 Verificando repositorio remoto "${repoName}" en GitHub...`);
  const repoRes = await fetchJson(`https://api.github.com/repos/${githubUser.login}/${repoName}`, {
    headers: {
      'Authorization': `Bearer ${githubToken}`,
      'Accept': 'application/vnd.github.v3+json'
    }
  });

  if (repoRes.status === 404) {
    console.log(`🚀 Creando repositorio público "${repoName}" en GitHub...`);
    const createRes = await fetchJson('https://api.github.com/user/repos', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${githubToken}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json'
      },
      body: {
        name: repoName,
        description: 'NÓMADAS Agencia de Diseño y Marketing Digital - Puyo, Pastaza, Ecuador',
        private: false,
        auto_init: false
      }
    });

    if (createRes.status !== 201) {
      throw new Error(`No se pudo crear el repo en GitHub: ${JSON.stringify(createRes.data)}`);
    }
    console.log(`✅ Repositorio creado en GitHub: https://github.com/${githubUser.login}/${repoName}`);
  } else {
    console.log(`ℹ️ Repositorio existente encontrado: https://github.com/${githubUser.login}/${repoName}`);
  }

  // 5. Configurar git remote y push
  console.log('\n🔗 Sincronizando Git local con GitHub...');
  try {
    try {
      execSync('git remote remove origin', { stdio: 'ignore' });
    } catch (e) {}

    const remoteUrl = `https://${githubUser.login}:${githubToken}@github.com/${githubUser.login}/${repoName}.git`;
    execSync(`git remote add origin ${remoteUrl}`);
    execSync('git branch -M main');
    execSync('git push -u origin main --force');
    console.log('✅ Código subido exitosamente a la rama main en GitHub!');
    
    // Normalizar la url del remoto para que no guarde el token en el archivo local de configuración
    const publicRemoteUrl = `https://github.com/${githubUser.login}/${repoName}.git`;
    execSync(`git remote set-url origin ${publicRemoteUrl}`);
  } catch (gitErr) {
    console.error('❌ Error sincronizando con Git:', gitErr.message);
  }

  // 6. Conectar proyecto en Vercel
  console.log('\n▲ Conectando proyecto en Vercel...');
  try {
    // Buscar si el proyecto ya existe en Vercel
    const checkVercelProj = await fetchJson(`https://api.vercel.com/v9/projects/${repoName}`, {
      headers: {
        'Authorization': `Bearer ${vercelToken}`
      }
    });

    let vercelProject;
    if (checkVercelProj.status === 200) {
      vercelProject = checkVercelProj.data;
      console.log(`ℹ️ Proyecto Vercel existente: ${vercelProject.name}`);
    } else {
      console.log(`🚀 Creando proyecto "${repoName}" en Vercel vinculado al repositorio de GitHub...`);
      const createVercel = await fetchJson('https://api.vercel.com/v9/projects', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${vercelToken}`,
          'Content-Type': 'application/json'
        },
        body: {
          name: repoName,
          framework: 'nextjs',
          gitRepository: {
            type: 'github',
            repo: `${githubUser.login}/${repoName}`
          }
        }
      });

      if (createVercel.status === 200 || createVercel.status === 201) {
        vercelProject = createVercel.data;
        console.log(`✅ Proyecto Vercel creado y vinculado con GitHub!`);
      } else {
        console.log(`⚠️ Nota Vercel (${createVercel.status}):`, createVercel.data?.error?.message || createVercel.data);
      }
    }

    if (vercelProject) {
      console.log(`🌐 URL estimada de producción: https://${repoName}.vercel.app`);
    }
  } catch (vErr) {
    console.error('⚠️ Error vinculando Vercel:', vErr.message);
  }

  console.log('\n🎉 Sincronización GitHub y Vercel completada con éxito!');
}

run();
