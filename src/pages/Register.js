import { useState } from "react";

function Register() {

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");


  const handleRegister = async () => {

    try {

      const response = await fetch(
  "https://mern-movies-app-o1fz.onrender.com/api/auth/register",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            name,
            email,
            password,
          }),

          credentials: "include",
        }
      );

      const data = await response.json();

      alert(data.message);

    } catch (error) {

      console.log(error);
    }
  };


  return (
    <div
      style={{
        width: "400px",
        margin: "50px auto",
      }}
    >

      <h1>Register</h1>

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br /><br />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br /><br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br /><br />

      <button onClick={handleRegister}>
        Register
      </button>

    </div>
  );
}

export default Register;