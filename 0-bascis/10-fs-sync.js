const {readFileSync, writeFileSync} = require('fs');

const first = readFileSync('./content/first.txt', 'utf-8');
const second = readFileSync('./content/first.txt', 'utf-8');

console.log('first', first);
console.log('second', second);

// writeFileSync('./content/result.txt', `Here is the result: ${first}, ${second}`);
writeFileSync('./content/result.txt', `Here is the result: ${first}, ${second}`, {flag: 'a'});