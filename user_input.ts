import * as promptSync from 'prompt-sync';
const prompt = promptSync();

// Ask for a name
const name = prompt('Enter your name: ');

// Ask for age and convert to number
const ageInput = prompt('Enter your age: ');
const age = parseInt(ageInput);

console.log(`Hello, ${name}! You are ${age} years old.`);