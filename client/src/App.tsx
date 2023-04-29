import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUsername, selectUsername } from "./store/userSlice";
import { initSocket, subscribeToCursorUpdates } from "./cursor/cursor";
import Login from "../src/components/Login";

const App: React.FC = () => {
  const dispatch = useDispatch();
  const username = useSelector(selectUsername);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleLogin = (enteredUsername: string) => {
    dispatch(setUsername(enteredUsername));
    initSocket(enteredUsername);
  };

  useEffect(() => {
    if (canvasRef.current && username) {
      subscribeToCursorUpdates(canvasRef.current, username);
    }
  }, [canvasRef, username]);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      {username ? (
        <canvas
          ref={canvasRef}
          width={window.innerWidth}
          height={window.innerHeight}
        />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;