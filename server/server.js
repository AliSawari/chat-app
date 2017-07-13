const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const parser = require('body-parser');
const socketIO = require('socket.io');
const http = require('http');
const fs = require('fs');
const server = http.createServer(app);
const io = socketIO(server);
const Pusher = require('pusher');
const path = require('path');
const public = path.join(__dirname,'../public');
const formidable = require('formidable');
app.use(express.static(public));
app.use(parser.json());
var temp_address;


// var pusher = new Pusher({
//   appId: '364872',
//   key: '91d67e6e341c6538e28c',
//   secret: '2f366e969dbe03ea7018',
//   cluster: 'ap2',
//   encrypted: true
// });
//
// pusher.trigger('my-channel', 'my-event', {
//   "message": "hello world"
// });



app.get('/err', (req, res) => {
  var errPage = path.join(__dirname, './err.html');
  res.status(400).sendFile(errPage);
});

app.post('/file', (req, res) => {
  var form = new formidable.IncomingForm();
  form.parse(req, (err, fields, files) => {
    if(err) return res.status(400).send(err);
    var file_size = files.file.size;
    var file_path = files.file.path;
    var file_name = files.file.name;
    var new_name = file_name.replace(/(.jpg|.png)/gi,'');
    var file_ext = file_name.split('.').pop();
    var t = new Date();
    var time_format = `-${t.getFullYear()}-${t.getMonth()}-${t.getDate()}-${t.getHours()}_${t.getMinutes()}`;
    var new_path = path.join(__dirname, `../public/uploads/${new_name}${time_format}.${file_ext}`);
    if(!file_name) return res.status(400).send("<h1>400 Bad Request</h1><h2>No file recieved</h2>");
    fs.readFile(file_path, (err, data) => {
      if(err) return res.status(400).send(err);
      fs.writeFile(new_path, data, (err) => {
        if(err) return res.status(400).send(err);
        var f;
        if(port === 3000){
          f = new_path.split('uploads\\').pop();
        } else {
          f = new_path.split('uploads/').pop();
        }
        temp_address = `/uploads/${f}`;
        io.on('connection', (socket) => {
          if(temp_address != undefined){
            socket.emit('done');
          }
        });
        res.status(200).redirect('/');
      });
    });
  });
});


io.on('connection', (socket) => {

  socket.on('newMsg', (msg) => {
    if(msg.image && (temp_address != undefined) ){
      io.emit('msg', {from: msg.from, image: true, src: temp_address});
      temp_address = undefined;
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

});


server.listen(port, (err) => {
  if(err) return err;
  console.log(`Server is Up on Port ${port}`);
});
