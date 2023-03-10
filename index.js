const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const app = express();

const server = http.createServer(app);
const io = socketio(server);

app.use("/", express.static(__dirname + "/public"));

io.on("connection", (socket) => {
  console.log("a user connnected");
  setInterval(() => socket.emit("msg_recieved", { msg: "hello ashish" }), 1000);

  socket.on("msg_send", (data) => {
    console.log(data);
    // socket.emit("msg_recieved", data); //to particular socket
    io.emit("msg_recieved", data); //to broardcast everyone including self
    // socket.broadcast.emit("msg_recieved", data); //to broardcast everyone except self
  });
});

server.listen(3000, () => {
  console.log("server is started at port 3000");
});
