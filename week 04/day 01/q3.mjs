import readline from 'node:readline/promises';

import { stdin as input, stdout as output } from 'node:process';

const rl = readline.createInterface({ input, output });

const pi = Math.PI;

const radius = await rl.question('Enter the radius of a circle: ');

const area = pi * radius * radius;

console.log(`The area of a circle with radius ${radius} is ${area.toFixed(2)}`); 

rl.close(); 