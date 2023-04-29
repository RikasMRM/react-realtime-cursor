import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUsername, selectUsername } from "./store/userSlice";
import { initSocket } from "./cursor/cursor";
import Login from "./components/Login";
import CustomCanvas from "./components/CustomCanvas";

const App: React.FC = () => {
  const dispatch = useDispatch();
  const username = useSelector(selectUsername);

  const handleLogin = (enteredUsername: string) => {
    dispatch(setUsername(enteredUsername));
    initSocket(enteredUsername);
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        cursor: username ? "none" : "auto",
      }}
    >
      {username ? <CustomCanvas /> : <Login onLogin={handleLogin} />}
    </div>
  );
};

export default App;
