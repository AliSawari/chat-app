const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const socketIO = require('socket.io');
const http = require('http');
const fs = require('fs');
const server = http.createServer(app);
const io = socketIO(server);
const path = require('path');
const public = path.join(__dirname,'../public');
const formidable = require('formidable');
app.use(express.static(public));
var temp = undefined;
var online_people = [];
// isThere function to iterate through arrays
function isThere(name){
  let s;
  for(let x in online_people){
    if(online_people[x] === name){
      s = [x];
      return s;
    } else {
      s = false;
    }
  }
  return s;
}

function add(name){
  let s = isThere(name);
  if(!s){
    online_people.push(name);
  }
}
function rem(name){
  let s = isThere(name);
  if(s){
    online_people.splice(s[0],1);
  }
}


app.get('/err', (req, res) => {
  var errPage = path.join(__dirname, './err.html');
  res.status(400).sendFile(errPage);
});

app.post('/file', (req, res) => {
  var form = new formidable.IncomingForm();
  form.parse(req, (err, fields, files) => {
    if(err) return res.status(400).send(err);
    // var file_size = files.file.size;
    var file_path = files.file.path;
    var file_name = files.file.name;
    // var new_name = file_name.replace(/(.jpg|.png)/gi,'');
    var file_ext = file_name.split('.').pop().toLowerCase();
    // var t = new Date();
    // var time_format = `-${t.getFullYear()}-${t.getMonth()}-${t.getDate()}-${t.getHours()}_${t.getMinutes()}`;
    if(!file_name) return res.status(400).send("<h1>400 Bad Request</h1><h2>No file recieved</h2>");
    fs.readFile(file_path, (err, data) => {
      if(err) return res.status(400).send(err);
        temp = {
          src: data.toString('base64'),
          ext: file_ext
        }
      io.on('connection', (socket) => {
        if(temp){
          socket.emit('done');
        }
      });
      res.status(200).redirect('/');
    });
  });
});



io.on('connection', (socket) => {
  let n;
  socket.on('in', (name) => {
    add(name);
    n = name;
  });
  socket.on('disconnect', () => {
    rem(n);
  });
  socket.on('newMsg', (msg) => {
    if(msg.image && temp != undefined){
      io.emit('msg', {
        from: msg.from,
        image: true,
        src: temp.src,
        ext: temp.ext
      });
        temp = undefined;
    } else {
    io.emit('msg', msg);
  }
  });
  socket.on('newUser', (name) => {
      socket.broadcast.emit('wel', name);
  });
  socket.on('type', (name) => {
    socket.broadcast.emit('isTyping', name);
  });
  setInterval(() => {
    socket.emit('online', online_people);
  },500);
});

server.listen(port, (err) => {
  if(err) return err;
  console.log(`Server is Up on Port ${port}`);
});
