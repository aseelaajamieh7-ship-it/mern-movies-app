function Login({ setIsLoggedIn }) {
  return (
    <div>
      <h2>Login</h2>
      <input placeholder="Email" />
      <input placeholder="Password" type="password" />

      <button onClick={() => setIsLoggedIn(true)}>
        Login
      </button>
    </div>
  );
}

export default Login;