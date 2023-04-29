import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectUsername } from '../store/userSlice';
import { subscribeToCursorUpdates } from '../cursor/cursor';

interface CustomCursorProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
}

const CustomCursor: React.FC<CustomCursorProps> = ({ canvasRef }) => {
  const username = useSelector(selectUsername);

  useEffect(() => {
    if (canvasRef.current && username) {
      subscribeToCursorUpdates(canvasRef.current, username);
    }
  }, [canvasRef, username]);

  return null;
};

export default CustomCursor;