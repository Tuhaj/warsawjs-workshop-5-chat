const io = require('socket.io-client');
const socket = io('http://localhost:3000');
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})


console.log('Client started!');

socket.emit('message', "Hello Universe");
socket.on('message', (msg) => {
  console.log(`from server: ${msg}`);
});


readline.on('line', (line) => {
  socket.emit('message', line);
});

readline.prompt();
