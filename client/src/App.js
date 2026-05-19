import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

import Home from "./pages/Home";
import Movies from "./pages/Movies";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("login") === "true";
  });

  useEffect(() => {
    localStorage.setItem("login", isLoggedIn);
  }, [isLoggedIn]);

  return (
    <Router>
      <div className="container">
        <h1>Movies App 🎬</h1>

        <nav>
         <Link to="/" className="nav-btn">Home</Link>
<Link to="/movies" className="nav-btn">Movies</Link>
<Link to="/login" className="nav-btn">Login</Link>
<Link to="/register" className="nav-btn">Register</Link>
<Link to="/about" className="nav-btn">About</Link>

          {isLoggedIn && (
            <button onClick={() => setIsLoggedIn(false)}>Logout</button>
          )}
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/movies"
            element={
              isLoggedIn ? <Movies /> : <Navigate to="/login" />
            }
          />

          <Route
            path="/login"
            element={<Login setIsLoggedIn={setIsLoggedIn} />}
          />

          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;