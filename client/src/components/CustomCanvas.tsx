import React, { useRef, useEffect } from 'react';
import CustomCursor from './CustomCursor';

const CustomCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const updateCanvasSize = () => {
    if (canvasRef.current) {
      canvasRef.current.width = window.innerWidth;
      canvasRef.current.height = window.innerHeight;
    }
  };

  useEffect(() => {
    window.addEventListener('resize', updateCanvasSize);
    updateCanvasSize();

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
    };
  }, []);

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <canvas ref={canvasRef} />
      <CustomCursor canvasRef={canvasRef} />
    </div>
  );
};

export default CustomCanvas;