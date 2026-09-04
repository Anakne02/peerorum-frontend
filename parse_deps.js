import fs from 'fs';

const content = fs.readFileSync('src/data/departments.ts', 'utf8');

// Simple regex to extract the COLLEGES array
const match = content.match(/export const COLLEGES[\s\S]*?\]/);
if (match) {
  let jsCode = match[0].replace('export const COLLEGES: College[] =', 'const COLLEGES =');
  jsCode += '\nconst allDeps = COLLEGES.flatMap(c => c.departments);\nconsole.log(JSON.stringify(allDeps));';
  fs.writeFileSync('temp.js', jsCode);
}
