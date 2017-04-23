const io = require('socket.io-client');
const socket = io('http://localhost:3000');
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})


console.log('Client started!');

socket.emit('message', "Hello Universe");
socket.on('message', (msg) => {
  clearPrompt();
  console.log(`>> ${msg}`);
  readline.prompt();
});


readline.on('line', (line) => {
  if (line.trim()) {
    socket.emit('message', line);
  }
  readline.prompt();
});

function clearPrompt() {
  process.stdout.cursorTo(0);
  process.stdout.clearLine(0);
}

readline.prompt();
