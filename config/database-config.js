const mongoose = require("mongoose");

const connect = async () => {
  await mongoose.connect("mongodb://localhost/chatDB");
};

module.exports = connect;
