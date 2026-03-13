import fs from 'node:fs';

const file = 'types/jus.d.ts';

let text = fs.readFileSync(file, 'utf8');

// Replace "jus/xyz" -> "jus/xyz.js"
text = text.replace(/("jus\/[^".]+)"/g, '$1.js"');

fs.writeFileSync(file, text);

console.log('Updated jus module paths to include .js');