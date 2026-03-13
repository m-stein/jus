import fs from 'node:fs';

const file = 'types/jet.d.ts';

let text = fs.readFileSync(file, 'utf8');

// Replace "jet/xyz" -> "jet/xyz.js"
text = text.replace(/("jet\/[^".]+)"/g, '$1.js"');

fs.writeFileSync(file, text);

console.log('Updated jet module paths to include .js');