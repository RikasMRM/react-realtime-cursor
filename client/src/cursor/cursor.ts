import { io, Socket } from 'socket.io-client';

interface CursorData {
  username: string;
  x: number;
  y: number;
}

let socket: Socket;

export const initSocket = (username: string) => {
  socket = io('http://localhost:3001', { query: { username } });

  socket.on('connect', () => {
    console.log('Connected to the server');
  });

  socket.on('disconnect', () => {
    console.log('Disconnected from the server');
  });
};

export const subscribeToCursorUpdates = (
  canvas: HTMLCanvasElement,
  username: string
) => {
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    console.error('Canvas context not found');
    return;
  }

  const drawCursor = (data: CursorData) => {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = '16px Arial';
    ctx.fillStyle = 'black';
    ctx.fillText(`${data.username}`, data.x, data.y);
  };

  canvas.addEventListener('mousemove', (e) => {
    const cursorData: CursorData = {
      username,
      x: e.clientX,
      y: e.clientY,
    };

    drawCursor(cursorData);
    socket.emit('cursor', cursorData);
  });

  socket.on('cursor', (data: CursorData) => {
    if (data.username !== username) {
      drawCursor(data);
    }
  });
};