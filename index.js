const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const connect = require("./config/database-config");
const Chat = require("./models/chat");
const app = express();

const server = http.createServer(app);
const io = socketio(server);
app.set("view engine", "ejs");
app.use("/", express.static(__dirname + "/public"));

io.on("connection", (socket) => {
  socket.on("join_room", (data) => {
    console.log("joining a room", data.roomId);
    socket.join(data.roomId);
  });

  socket.on("msg_send", async (data) => {
    await Chat.create({
      content: data.msg,
      roomId: data.roomId,
      user: data.username,
    });
    io.to(data.roomId).emit("msg_rcvd", data);
  });
});

app.get("/chat/:roomId", async (req, res) => {
  const chats = await Chat.find({
    roomId: req.params.roomId,
  }).select("user content");

  console.log(chats);
  res.render("index", {
    name: "ashish",
    roomId: req.params.roomId,
    chats: chats,
  });
});

server.listen(3000, async () => {
  console.log("server is started at port 3000");
  await connect();
  console.log("connected to mongodb");
});
