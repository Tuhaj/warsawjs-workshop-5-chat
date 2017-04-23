const io = require('socket.io');
const socket = io();

socket.on('connection', (client) => {
  console.log("client", client);
  console.log(`client with id: ${client.id}, connected!`);
});
socket.listen(3000);

