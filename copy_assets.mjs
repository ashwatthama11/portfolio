import fs from 'fs';
import path from 'path';

const srcDir = 'C:\\Users\\kapre\\.gemini\\antigravity-ide\\brain\\214a0c25-76d8-4b13-836b-c2d5c21d0487\\scratch\\assets';
const destDir = 'b:\\CODES\\React\\aman\\public\\assets';

fs.mkdirSync(destDir, { recursive: true });

const mappings = {
  '87ce4d48d37f32f8c4d9cf588e1a6e2d6e1265f7.png': 'hero-blueprint.png',
  'd222d9d6251dc95ca6d15b263952d7d0fa168dba.png': 'aman-verma-portrait.png',
  '150b24503c58ea4ebbee38369fe0a35ca87b1c6a.png': 'project-4.png',
  '57933990b0bea9fd434b792646ea735038752732.png': 'project-6.png'
};

for (const [src, dest] of Object.entries(mappings)) {
  const srcPath = path.join(srcDir, src);
  const destPath = path.join(destDir, dest);
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${src} -> ${dest}`);
  } else {
    console.log(`Source ${src} does not exist`);
  }
}
