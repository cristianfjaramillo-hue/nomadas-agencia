require('dotenv').config();
const { execSync } = require('child_process');

try {
  console.log('📦 Agregando archivos al commit...');
  execSync('git add -A');
  
  try {
    execSync('git commit -m "feat(landing): complete high-converting landing page with Next.js 16 and Tailwind v4"');
    console.log('✅ Commit realizado exitosamente.');
  } catch (e) {
    console.log('ℹ️ No hay cambios pendientes por commitear.');
  }

  const owner = process.env.GITHUB_OWNER;
  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPO_NAME || 'nomadas-agencia';

  console.log(`🚀 Empujando código a GitHub (${owner}/${repo})...`);
  const pushUrl = `https://${owner}:${token}@github.com/${owner}/${repo}.git`;
  execSync(`git push ${pushUrl} main --force`);
  console.log('🎉 Push a GitHub completado con éxito! Vercel detectará el commit e iniciará el despliegue automático.');
} catch (error) {
  console.error('❌ Error empujando a GitHub:', error.message);
  process.exit(1);
}
