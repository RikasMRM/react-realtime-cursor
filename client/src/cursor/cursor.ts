import { io, Socket } from "socket.io-client";
import cursorImage from "../assets/cursorG.png";

interface CursorData {
  username: string;
  x: number;
  y: number;
}

let socket: Socket;

export const initSocket = (username: string) => {
  // const serverUrl = process.env.REACT_APP_SERVER_URL || 'http://localhost:3001';
  const serverUrl = "http://localhost:3001";
  socket = io(serverUrl, { query: { username } });

  socket.on("connect", () => {
    console.log("Connected to the server");
  });

  socket.on("disconnect", () => {
    console.log("Disconnected from the server");
  });
};

export const subscribeToCursorUpdates = (
  canvas: HTMLCanvasElement,
  username: string
) => {
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    console.error("Canvas context not found");
    return;
  }

  const drawCursor = (data: CursorData) => {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const img = new Image();
    img.src = cursorImage;
    const desiredWidth = 32;
    const desiredHeight = 32;
    img.onload = () => {
      ctx.drawImage(img, data.x, data.y, desiredWidth, desiredHeight);
    };

    const textPadding = 5;
    ctx.font = "16px Arial";
    ctx.fillStyle = "black";
    ctx.fillText(
      `${data.username}`,
      data.x + desiredWidth + textPadding,
      data.y + desiredHeight / 2
    );
  };

  canvas.addEventListener("mousemove", (e) => {
    const cursorData: CursorData = {
      username,
      x: e.clientX,
      y: e.clientY,
    };

    drawCursor(cursorData);
    socket.emit("cursor", cursorData);
  });

  socket.on("cursor", (data: CursorData) => {
    if (data.username !== username) {
      drawCursor(data);
    }
  });
};
