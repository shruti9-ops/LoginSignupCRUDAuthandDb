import React, { useState } from "react";
import "./LoginSignup.css";
import { auth, db } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "firebase/auth";
import { ref, set } from "firebase/database";


const Loginsignup = () => {
  const [mode, setMode] = useState("Login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");

  const handleSignup = async () => {
    if (!email || !password || !fname || !lname) {
      alert("All fields are required");
      return;
    }

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const uid = res.user.uid;

      await set(ref(db, "users/" + uid), {
        firstName: fname,
        lastName: lname,
        email,
        createdAt: new Date().toISOString()
      });

      alert("Account created successfully");
      setMode("Login");
    } catch (err) {
      alert(err.message);
    }
  };

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Email and password required");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2 className="title">{mode}</h2>
        <p className="subtitle">{mode} to continue</p>

        {mode === "Sign Up" && (
          <div className="row">
            <input
              type="text"
              placeholder="First Name"
              onChange={(e) => setFname(e.target.value)}
            />
            <input
              type="text"
              placeholder="Last Name"
              onChange={(e) => setLname(e.target.value)}
            />
          </div>
        )}

        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        {mode === "Login" && <div className="forgot">Forgot password?</div>}

        <button
          className="primary-btn"
          onClick={mode === "Sign Up" ? handleSignup : handleLogin}
        >
          {mode === "Sign Up" ? "Create Account" : "Login"}
        </button>

        <div className="switch">
          {mode === "Login" ? (
            <span onClick={() => setMode("Sign Up")}>
              Don’t have an account? <b>Sign Up</b>
            </span>
          ) : (
            <span onClick={() => setMode("Login")}>
              Already have an account? <b>Login</b>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Loginsignup;
