import cursorImage from "../assets/cursorG.png";
import { getSocket } from "./socket";

interface CursorData {
  username: string;
  x: number;
  y: number;
}

const userAvatars: { [key: string]: string } = {};

const avatars = [
  "https://api.dicebear.com/6.x/lorelei/svg?seed=Snowball",
  "https://api.dicebear.com/6.x/lorelei/svg?seed=Toby",
  "https://api.dicebear.com/6.x/lorelei/svg?seed=Charlie",
  "https://api.dicebear.com/6.x/lorelei/svg?seed=Bear",
  "https://api.dicebear.com/6.x/lorelei/svg?seed=Nala",
  "https://api.dicebear.com/6.x/lorelei/svg?seed=Snickers",
];

export const subscribeToCursorUpdates = (
  canvas: HTMLCanvasElement,
  username: string
) => {
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    console.error("Canvas context not found");
    return;
  }

  const cursorIcon = new Image();
  cursorIcon.src = cursorImage;
  const cursorWidth = 16;
  const cursorHeight = 16;

  const preloadedAvatars: { [key: string]: HTMLImageElement } = {};

  avatars.forEach((avatar) => {
    const userIcon = new Image();
    userIcon.src = avatar;
    preloadedAvatars[avatar] = userIcon;
  });

  const drawCursor = (data: CursorData, userAvatar: string) => {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // cursor image
    const cursorX = data.x - cursorWidth / 2;
    const cursorY = data.y - cursorHeight / 2;
    ctx.drawImage(cursorIcon, cursorX, cursorY, cursorWidth, cursorHeight);

    // user-specific icon
    const desiredWidth = 28;
    const desiredHeight = 28;
    const userX = data.x + cursorWidth / 2;
    const userY = data.y + cursorHeight / 2;

    // round shape
    const circleRadius = desiredWidth / 2 + 4;
    const circleX = userX + desiredWidth / 2;
    const circleY = userY + desiredHeight / 2;
    ctx.beginPath();
    ctx.arc(circleX, circleY, circleRadius, 0, 2 * Math.PI);
    ctx.fillStyle = "#f0f0f0";
    ctx.fill();

    // a border to the round shape
    ctx.strokeStyle = "#8c8c8c";
    ctx.lineWidth = 2;
    ctx.stroke();

    // user icon on top of the round shape
    const userIcon = preloadedAvatars[userAvatar];
    ctx.drawImage(userIcon, userX, userY, desiredWidth, desiredHeight);

    // username
    const username = data.username;
    const textPadding = 10;
    const usernameX = userX + desiredWidth + textPadding;
    const usernameY = userY + desiredHeight / 2;
    ctx.font = "16px Arial";
    ctx.fillStyle = "black";
    ctx.fillText(username, usernameX, usernameY);
  };

  const cursorDataList: { [key: string]: CursorData } = {};

  const drawAllCursors = () => {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    Object.entries(cursorDataList).forEach(([username, data]) => {
      if (!userAvatars[username]) {
        userAvatars[username] =
          avatars[Math.floor(Math.random() * avatars.length)];
      }
      const userAvatar = userAvatars[username];
      drawCursor(data, userAvatar);
    });
  };

  let timerId: number | null = null;

  const handleMouseMove = (e: MouseEvent) => {
    const { clientX, clientY } = e;
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = window.setTimeout(() => {
      if (!userAvatars[username]) {
        userAvatars[username] =
          avatars[Math.floor(Math.random() * avatars.length)];
      }
      const cursorData: CursorData = {
        username,
        x: clientX,
        y: clientY,
      };
      cursorDataList[username] = cursorData; // Update the cursor data for the current user
      drawAllCursors(); // Draw all cursors
      getSocket().emit("cursor", cursorData);
    }, 5);
  };

  canvas.addEventListener("mousemove", handleMouseMove);

  getSocket().on("cursor", (data: CursorData) => {
    if (data.username !== username) {
      if (!userAvatars[data.username]) {
        userAvatars[data.username] =
          avatars[Math.floor(Math.random() * avatars.length)];
      }
      cursorDataList[data.username] = data; // Update the cursor data for other users
      drawAllCursors(); // Draw all cursors
    }
  });

  getSocket().on("user-disconnected", (disconnectedUsername: string) => {
    if (cursorDataList[disconnectedUsername]) {
      delete cursorDataList[disconnectedUsername];
      drawAllCursors(); // Draw all cursors
    }
  });
};
