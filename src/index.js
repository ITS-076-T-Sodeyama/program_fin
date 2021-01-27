// Express
const express = require("express"),
  https = require("http"),
  app = express();

// Gatten System
app.use(express.static(__dirname + "/public"));

const server = https.createServer(app).listen(8080);
console.log("server start!!:", 8080);

// Socket.IO
const so = require("socket.io"),
  io = so.listen(server);

io.sockets.on("connection", function (socket) {
  socket.emit("mylogin", socket.id.substr(0, 6));
  io.sockets.emit("login", socket.id.substr(0, 6));

  socket.on("disconnect", function () {
    io.sockets.emit("logout", socket.id.substr(0, 6));
  });

  socket.on("post", function (data) {
    io.sockets.emit("post", { id: socket.id.substr(0, 6), post: data });
  });

  socket.on("stamp", function (data) {
    io.sockets.emit("stamp", { id: socket.id.substr(0, 6), stamp: data });
  });

  socket.on("icon", function (data) {
    io.sockets.emit("icon", { id: socket.id.substr(0, 6), icon: data });
  });

  socket.on("img", function (data) {
    io.sockets.emit("img", { id: socket.id.substr(0, 6), img: data });
  });

  socket.on("sound", function (data) {
    io.sockets.emit("sound", { id: socket.id.substr(0, 6), sound: data });
  });

  socket.on("join", function (room) {
    socket.join(room);
    console.log("New room(" + room + ") created.");
  });

  socket.on("sensor", function (data) {
    io.to(data.room).emit("sensor", data);
  });

  socket.on("sensor-toall", function (data) {
    io.sockets.emit("sensor", data);
  });
});
