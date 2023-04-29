import React, { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUsername } from "../store/userSlice";
import { subscribeToCursorUpdates } from "../cursor/cursor";

interface CustomCursorProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
}

const CustomCursor: React.FC<CustomCursorProps> = ({ canvasRef }) => {
  const username = useSelector(selectUsername);

  const cursorUpdateEvents = useCallback(() => {
    if (canvasRef.current && username) {
      subscribeToCursorUpdates(canvasRef.current, username);
    }
  }, [canvasRef, username]);

  useEffect(() => {
    cursorUpdateEvents();
  }, [cursorUpdateEvents]);

  return null;
};

export default CustomCursor;
