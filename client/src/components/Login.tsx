import React, { useState } from "react";
import bgImage from "../assets/bg1.png";

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
    <div className="container" style={{ backgroundImage: `url(${bgImage})` }}>
      <div className="box">
        <form className="form" onSubmit={handleSubmit}>
          <label
            className="label"
            style={{ color: "#fff", fontWeight: "bold", fontFamily: "poppins" }}
          >
            Enter your username :
            <input
              className="input"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{
                backgroundColor: "transparent",
                color: "#fff",
                border: "1px solid #fff",
                marginLeft: "20px",
              }}
            />
          </label>
          <button
            className="button"
            type="submit"
            style={{ color: "#fff", fontWeight: "bold", fontFamily: "poppins" }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
