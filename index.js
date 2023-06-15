// import { Server } from "socket.io";

// console.log("socket started: ");

// const io = new Server({
//     cors: {
//         origin: "http://localhost:3000",
//     },
// });

const server = require("./server");
const express = require("express");
const router = express.Router();

const { createServer: createSocketServer } = require("http");
const { Server: SocketServer } = require("socket.io");

const socketServer = createSocketServer();
const io = new SocketServer(socketServer, {
  cors: { origin: "http://localhost:3000" },
});
console.log("socket started");
let onlineUsers = [];

const addNewUser = (username, socketId) => {
  !onlineUsers.some((user) => user.username === username) &&
    onlineUsers.push({ username, socketId });
};

const removeUser = (socketId) => {
  onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};

const getUser = (username) => {
  return onlineUsers.find((user) => user.username === username);
};

io.on("connection", (socket) => {
  socket.on("newUser", (username) => {
    addNewUser(username, socket.id);
  });

  socket.on("sendNotification", ({ senderName, receiverName, type }) => {
    const receiver = getUser(receiverName);
    console.log(receiver);
    io.to(receiver.socketId).emit("getNotification", {
      senderName,
      type,
    });
  });

  socket.on("sendText", ({ senderName, receiverName, text }) => {
    const receiver = getUser(receiverName);
    io.to(receiver.socketId).emit("getText", {
      senderName,
      text,
    });
  });

  socket.on("disconnect", () => {
    removeUser(socket.id);
  });
});

io.listen(5000);
