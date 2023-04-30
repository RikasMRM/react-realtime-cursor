const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.use(cors());

const cursorDataList = {}; // Store cursor data for all connected users

io.on("connection", (socket) => {
  const username = socket.handshake.query.username;
  console.log("User connected:", username);

  // Send the current state of all cursors to the newly connected user
  socket.emit("initial-cursors", cursorDataList);

  socket.on("cursor", (data) => {
    cursorDataList[username] = data; // Update cursor data for the current user
    socket.broadcast.emit("cursor", data); // Broadcast cursor data to other users
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", username);
    delete cursorDataList[username]; // Remove cursor data for the disconnected user
    socket.broadcast.emit("user-disconnected", username); // Notify other users about the disconnection
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
