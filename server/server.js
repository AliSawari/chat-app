const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const parser = require('body-parser');
const socketIO = require('socket.io');
const http = require('http');
const server = http.createServer(app);
const io = socketIO(server);
const path = require('path');
const public = path.join(__dirname,'../public');
app.use(express.static(public));
app.use(parser.json());

io.on('connection' , (socket) => {
  socket.on('newMsg' , (msg) => {
    io.emit('msg', msg);
  });
  socket.on('newUser', (name) => {
    socket.broadcast.emit('wel', name);
  });
  socket.on('type', (name) => {
    socket.broadcast.emit('isTyping', name);
  });


});

app.get('/err', (req, res) => {
  var errPage = path.join(__dirname, './err.html');
  res.status(400).sendFile(errPage);
});

server.listen(port, (err) => {
  if(err) return err;
  console.log(`Server is Up on Port ${port}`);
});
