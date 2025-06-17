import React, { useState } from "react";
import "./LoginSignup.css";
import user_icon from "../assets/person.png";
import email_icon from "../assets/email.png";
import password_icon from "../assets/password.png";
import login_icon from "../assets/login-icon.avif";
// delete

const LoginSignup = () => {
  const [action, setAction] = useState("Sign Up");

  return (
    <div className="container">
      <div className="logo">
        <img src={login_icon} alt="logo" />
      </div>
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>

      <div className="inputs">
        <div
          className="input"
          style={{ display: action === "Login" ? "none" : "flex" }}
        >
          <img src={user_icon} alt="user" />
          <input type="text" placeholder="Username" />
        </div>

        <div className="input">
          <img src={user_icon} alt="user" />
          <input type="select" placeholder="Username" />
        </div>

        <div className="input">
          <img src={email_icon} alt="id" />
          <input type="text" placeholder="Restaurant ID" />
        </div>

        <div className="input">
          <img src={email_icon} alt="email" />
          <input type="text" placeholder="Email ID" />
        </div>

        <div className="input">
          <img src={password_icon} alt="password" />
          <input type="password" placeholder="Password" />
        </div>
      </div>

      <div
        className="forgot-password"
        style={{ display: action === "Sign Up" ? "none" : "flex" }}
      >
        Forgot Password? <span>Click Here!</span>{" "}
      </div>
      <div className="submit-container">
        <div
          className={action === "Login" ? "submit gray" : "submit"}
          onClick={() => {
            setAction("Sign Up");
          }}
        >
          {" "}
          Sign Up{" "}
        </div>
        <div
          className={action === "Sign Up" ? "submit gray" : "submit"}
          onClick={() => {
            setAction("Login");
          }}
        >
          {" "}
          Login{" "}
        </div>
      </div>
    </div>
  );
};
export default LoginSignup;
