const fs = require('fs');
const path = require('path');
const process = require('process');
const readline = require('readline');

const writeStream = fs.createWriteStream(path.join(__dirname, 'newText.txt'));

const read = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

read.question('Hi! Type something here... \n', (answer) => {
  writeStream.write(answer + '\n');

  if (answer.toLowerCase() === 'exit') {
    read.output.write('Cool. By!');
    process.exit();
  }
});

read.on('line', (data) => {
  data === 'exit' ? read.close() : writeStream.write(data + '\n');
});

read.on('close', () => {
  read.write('Cool. By!');
  process.exit();
});
