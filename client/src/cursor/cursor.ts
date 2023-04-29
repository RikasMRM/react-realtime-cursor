import { useEffect } from "react";
import cursorImage from "../assets/cursor.png";
import userIcons from "../assets/userIcons";
import { getSocket } from "./socket";
interface CursorData {
  username: string;
  x: number;
  y: number;
}

const cursorImg = new Image();
cursorImg.src = cursorImage;

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

    // User-specific icon
    const userIcon = new Image();
    userIcon.src = userIcons[data.username] || ""; // Use the user-specific icon or an empty string
    const desiredWidth = 25; // Set the desired width of the user image
    const desiredHeight = 25; // Set the desired height of the user image
    userIcon.onload = () => {
      ctx.drawImage(
        userIcon,
        data.x + desiredWidth / 2,
        data.y + desiredHeight / 2,
        desiredWidth,
        desiredHeight
      );
    };

    // Default cursor image
    const cursorIcon = new Image();
    cursorIcon.src = cursorImage;
    cursorIcon.onload = () => {
      const cursorWidth = 16; // Set the desired width of the cursor image
      const cursorHeight = 16; // Set the desired height of the cursor image
      ctx.drawImage(cursorIcon, data.x, data.y, cursorWidth, cursorHeight);
    };

    // Username
    const textPadding = 8; // Adjust this value to change the distance between the image and the text
    ctx.font = "16px Arial";
    ctx.fillStyle = "black";
    ctx.fillText(
      `${data.username}`,
      data.x + desiredWidth / 3,
      data.y + desiredHeight * 2 + textPadding
    ); // You can adjust the x and y offsets as needed
  };

  let timerId: number | null = null;

  const handleMouseMove = (e: MouseEvent) => {
    const { clientX, clientY } = e;
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = window.setTimeout(() => {
      const cursorData: CursorData = {
        username,
        x: clientX,
        y: clientY,
      };
      drawCursor(cursorData);
      getSocket().emit("cursor", cursorData);
    }, 5);
  };

  canvas.addEventListener("mousemove", handleMouseMove);

  getSocket().on("cursor", (data: CursorData) => {
    if (data.username !== username) {
      drawCursor(data);
    }
  });
};
