const io = require('socket.io-client');
const socket = io(`http://${process.argv[2] || 'localhost'}:3000`);
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})


console.log('Client started!');

socket.on('message', (msg) => {
  clearPrompt();
  console.log(`>> ${msg}`);
  readline.prompt();
});

socket.on('register', (registerSuccess) => {
  clearPrompt();
  if (registerSuccess) {
    console.log('>> REGISTRATION SUCCESSFUL');
  } else {
    console.log('>> REGISTRATION FAILED');
  }
  readline.prompt();
})

readline.on('line', (line) => {
  const lineArgs = line.split(/\s+/);
  const firstWord = line.split(/\s+/)[0];
  if (firstWord === '/exit') {
    readline.close();
    process.exit(0);
  } else if (firstWord === '/register' && lineArgs.length >= 3) {
    socket.emit('register', {
      username: lineArgs[1],
      password: lineArgs[2]
    });
  } else if (firstWord === '/login' && lineArgs.length >= 3) {
    socket.emit('login', {
      username: lineArgs[1],
      password: lineArgs[2]
    });
  } else if (line.trim()) {
    socket.emit('message', line);
  }
  readline.prompt();
});

socket.on('login', (username) => {
  clearPrompt();
  if (username) {
    readline.setPrompt(`${username}: `);
  } else {
    console.log('>> LOGIN FAILED');
  }
})

function clearPrompt() {
  process.stdout.cursorTo(0);
  process.stdout.clearLine(0);
}

readline.prompt();
