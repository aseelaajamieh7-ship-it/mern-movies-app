import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Movies from "./pages/Movies";
import About from "./pages/About";

function App() {

  return (
    <BrowserRouter>

      <div
        style={{
          backgroundColor: "#222",
          padding: "20px",
        }}
      >

        <Link
          to="/"
          style={{
            color: "white",
            marginRight: "20px",
            textDecoration: "none",
            fontSize: "18px",
          }}
        >
          Home
        </Link>

        <Link
          to="/register"
          style={{
            color: "white",
            marginRight: "20px",
            textDecoration: "none",
            fontSize: "18px",
          }}
        >
          Register
        </Link>

        <Link
          to="/login"
          style={{
            color: "white",
            marginRight: "20px",
            textDecoration: "none",
            fontSize: "18px",
          }}
        >
          Login
        </Link>

        <Link
          to="/movies"
          style={{
            color: "white",
            marginRight: "20px",
            textDecoration: "none",
            fontSize: "18px",
          }}
        >
          Movies
        </Link>

        <Link
          to="/about"
          style={{
            color: "white",
            textDecoration: "none",
            fontSize: "18px",
          }}
        >
          About
        </Link>

      </div>


      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/movies"
          element={<Movies />}
        />

        <Route
          path="/about"
          element={<About />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;