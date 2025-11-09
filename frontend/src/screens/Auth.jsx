import React, { useState } from "react";
import "./Auth.css";
export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");      // for signup
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // handle signup
  const handleSignup = async () => {
    const res = await fetch("http://localhost:5000/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password })
    });
    const data = await res.json();
    if (res.ok) {
      localStorage.setItem("name", data.name);
      alert("Signup Successful");
      setIsLogin(true);
    } else {
      alert(data.error || "Signup failed");
    }
  };

  // handle login
  const handleLogin = async () => {
    const res = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (res.ok) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("email", email);
      localStorage.setItem("name", data.name);
      window.location.href = "/dashboard";
    } else {
      alert(data.error || "Login failed");
    }
  };

  return (
    <div className="Conntainer">
      <div className="form-container">
        <div className="form-toggle">
          <button className={isLogin ? "active" : ""} onClick={() => setIsLogin(true)}>Login</button>
          <button className={!isLogin ? "active" : ""} onClick={() => setIsLogin(false)}>SignUp</button>
        </div>

        {isLogin ? (
          <div className="form">
            <h2>Login</h2>
            <input type="email" placeholder="username" value={email} onChange={e => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Login</button>
          </div>
        ) : (
          <div className="form">
            <h2>SignUp</h2>
            <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
            <input type="email" placeholder="username" value={email} onChange={e => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
            <button onClick={handleSignup}>SignUp</button>
          </div>
        )}
      </div>
    </div>
  );
}

