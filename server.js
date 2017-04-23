const io = require('socket.io');
const socket = io();

socket.on('connection', (client) => {
  console.log(`client with id: ${client.id}, connected!`);
  client.on('message', (msg) => {
    console.log(msg);
  })
});
socket.listen(3000);

