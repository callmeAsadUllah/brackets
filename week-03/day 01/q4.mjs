import readline from 'node:readline/promises';

import { stdin as input, stdout as output } from 'node:process';

const rl = readline.createInterface({ input, output });

const name = await rl.question('What is your name? ');

const age = await rl.question('What is your age? ');

console.log(`Oh, so your name is ${name} and you are ${age} years old.`);

rl.close(); 
