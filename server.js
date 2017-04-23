const io = require('socket.io');
const socket = io();
const USERS = {};

function handleMessage(client) {
  return (msg) => {
    console.log(msg);
    client.broadcast.emit('message', msg);
  }
}

function handleRegister(client) {
  return (userObject) => {
    if (USERS[userObject.username]) {
      client.emit('register', false);
    } else {
      USERS[userObject.username] = {
        password: userObject.password,
        logged_in: false
      };
      client.emit('register', true);
    };
  }
}

function handleLogin(client) {
  return (userObject) => {
    const user = USERS[userObject.username];
    if (user.password === userObject.password) {
      user.logged_in = true;
      client.emit('login', userObject.username);
    } else {
      client.emit('login', false);
    }
  }
}

function handleLogout(client) {
  return (username) => {
    const user = USERS[username];
    user.logged_in = false;
  }
}

socket.on('connection', (client) => {
  console.log(`client with id: ${client.id}, connected!`);
  client.on('message', handleMessage(client));
  client.on('register', handleRegister(client));
  client.on('login', handleLogin(client));
  client.on('logout', handleLogout(client));
});

socket.listen(3000);

