import React, { useState } from "react";
import cursorImage from "../assets/cursorG.png";

interface LoginProps {
  onLogin: (username: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState<string>("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (username.trim()) {
      onLogin(username);
    }
  };

  return (
    <div className="container">
      <div className="logo-container">
        <div className="cursor" style={{ display: "block" }}>
          <img src={cursorImage} alt="cursor" />
        </div>
      </div>
      <form className="form" onSubmit={handleSubmit}>
        <label className="label">
          Enter your username 
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <button className="button" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
