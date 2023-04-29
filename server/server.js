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

io.on("connection", (socket) => {
  console.log("User connected:", socket.handshake.query.username);

  socket.on("cursor", (data) => {
    socket.broadcast.emit("cursor", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.handshake.query.username);
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
