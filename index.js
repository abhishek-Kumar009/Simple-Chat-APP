var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  //Send a message to everyone when someone connects
  socket.broadcast.emit('user', 'a user connected!');

  //Send a message to everyone when someone disconnects
  socket.on('disconnect', () => {
    socket.broadcast.emit('user', 'a user disconnected!');
  });

  socket.on('chat message', (payload) => {
    io.emit('chat message', payload);
  });
});

http.listen(8080, () => console.log('Listening on port 8080...'));
