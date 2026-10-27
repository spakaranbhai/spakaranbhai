import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

const rootDir = process.cwd();
const stagingDir = path.join(rootDir, 'dist_bundle');
const publicDir = path.join(rootDir, 'public');
const destZip = path.join(publicDir, 'nandini-spa-project.zip');
const legacyMassageZip = path.join(publicDir, 'nandini-massage-project.zip');
const legacyPranayaZip = path.join(publicDir, 'pranaya-wellness-project.zip');
const legacyAuranestZip = path.join(publicDir, 'auranest-wellness-project.zip');
const legacySerenovaZip = path.join(publicDir, 'serenova-spa-project.zip');

console.log('Preparing clean staging directory...');
if (fs.existsSync(stagingDir)) {
  fs.rmSync(stagingDir, { recursive: true, force: true });
}
fs.mkdirSync(stagingDir, { recursive: true });

// Copy essential project files
const itemsToCopy = [
  'src',
  'index.html',
  'package.json',
  'package-lock.json',
  'tsconfig.json',
  'vite.config.ts',
  'metadata.json',
  'README.md',
  'vercel.json',
  '.gitignore',
  '.env.example'
];

for (const item of itemsToCopy) {
  const srcPath = path.join(rootDir, item);
  const destPath = path.join(stagingDir, item);
  if (fs.existsSync(srcPath)) {
    fs.cpSync(srcPath, destPath, { recursive: true });
    console.log(`Copied ${item}`);
  }
}

// Copy public assets if any, excluding zip files
const stagingPublic = path.join(stagingDir, 'public');
fs.mkdirSync(stagingPublic, { recursive: true });
if (fs.existsSync(publicDir)) {
  const publicFiles = fs.readdirSync(publicDir);
  for (const file of publicFiles) {
    if (!file.endsWith('.zip')) {
      fs.cpSync(path.join(publicDir, file), path.join(stagingPublic, file));
    }
  }
}

// Create ZIP using PowerShell Compress-Archive
console.log('Creating ZIP archive...');
if (fs.existsSync(destZip)) {
  fs.unlinkSync(destZip);
}

const psScript = `$ProgressPreference = 'SilentlyContinue'; Compress-Archive -Path '${stagingDir}\\*' -DestinationPath '${destZip}' -CompressionLevel Optimal`;
execSync(`powershell -NoProfile -Command "${psScript}"`, { stdio: 'inherit' });

// Also duplicate to legacy zips so all paths work smoothly
fs.copyFileSync(destZip, legacyMassageZip);
fs.copyFileSync(destZip, legacyPranayaZip);
fs.copyFileSync(destZip, legacyAuranestZip);
fs.copyFileSync(destZip, legacySerenovaZip);

// Clean up staging
fs.rmSync(stagingDir, { recursive: true, force: true });

const stats = fs.statSync(destZip);
console.log(`Successfully created ${destZip} (${(stats.size / 1024).toFixed(1)} KB)`);
console.log(`Also synchronized backward-compatible archives: ${legacyMassageZip}, ${legacyPranayaZip}, ${legacyAuranestZip} & ${legacySerenovaZip}`);
