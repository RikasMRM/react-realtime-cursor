import { io, Socket } from "socket.io-client";

let socket: Socket;

export const initSocket = (username: string) => {
  const serverUrl = import.meta.env.VITE_SERVER_URL || "http://localhost:3001";
  socket = io(serverUrl, { query: { username } });

  socket.on("connect", () => {
    console.log("Connected to the server");
  });

  socket.on("disconnect", () => {
    console.log("Disconnected from the server");
  });

  return socket;
};

export const getSocket = () => {
  return socket;
};
