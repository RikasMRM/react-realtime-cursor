import React, { useRef, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { selectUsername } from "../store/userSlice";
import { subscribeToCursorUpdates } from "../cursor/cursor";

const CustomCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const username = useSelector(selectUsername);

  const updateCanvasSize = useCallback(() => {
    if (canvasRef.current) {
      canvasRef.current.width = window.innerWidth;
      canvasRef.current.height = window.innerHeight;
    }
  }, []);

  useEffect(() => {
    window.addEventListener("resize", updateCanvasSize);
    updateCanvasSize();

    return () => {
      window.removeEventListener("resize", updateCanvasSize);
    };
  }, [updateCanvasSize]);

  useEffect(() => {
    if (canvasRef.current && username) {
      subscribeToCursorUpdates(canvasRef.current, username);
    }
  }, [canvasRef, username]);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <canvas ref={canvasRef} />
    </div>
  );
};

export default CustomCanvas;
