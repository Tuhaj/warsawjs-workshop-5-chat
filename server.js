const io = require('socket.io');
const socket = io();
const USERS = [];

socket.on('connection', (client) => {
  console.log(`client with id: ${client.id}, connected!`);
  client.on('message', (msg) => {
    console.log(msg);
    client.broadcast.emit('message', msg);
  })
  client.on('register', (userObject) => {
    if (USERS[userObject.username]) {
      client.emit('register', false);
    } else {
      USERS[userObject.username] = {
        password: userObject.password,
        logged_in: false
      };
      client.emit('register', true);
    };
  })
  client.on('login', (userObject) => {
    const user = USERS[userObject.username];
    if (user.password === userObject.password) {
      user.logged_in = true;
      client.emit('login', userObject.username);
    } else {
      client.emit('login', false);
    }
  })

  client.on('logout', (username) => {
    const user = USERS[username];
    user.logged_in = false;
  })
});
socket.listen(3000);

