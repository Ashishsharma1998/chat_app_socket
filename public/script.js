var socket = io();

const btn = document.getElementById("btn");
const input = document.getElementById("msg");
const list = document.getElementById("list");

btn.onclick = function () {
  socket.emit("msg_send", { msg: input.value });
};

// socket.on("msg_recieved", (data) => {
//   console.log("from client ", data);
//   let li = document.createElement("li");
//   li.innerText = data.msg;
//   list.appendChild(li);
// });

socket.on("msg_recieved", (data) => {
  console.log("from client ", data);
  let li = document.createElement("li");
  li.innerText = data.msg;
  list.appendChild(li);
});
