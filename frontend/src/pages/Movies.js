import { useEffect, useState } from "react";

function Movies() {

  const [title, setTitle] = useState("");

  const [description, setDescription] = useState("");

  const [movies, setMovies] = useState([]);

  const [editingId, setEditingId] = useState(null);


  // GET MOVIES
  const getMovies = async () => {

    try {

      const response = await fetch(
        "https://mern-movies-app-o1fz.onrender.com/api/movies",
        {
          credentials: "include",
        }
      );

      const data = await response.json();

      if (Array.isArray(data)) {

        setMovies(data);
      }

    } catch (error) {

      console.log(error);
    }
  };


  // ADD MOVIE
  const addMovie = async () => {

    try {

      const response = await fetch(
        "https://mern-movies-app-o1fz.onrender.com/api/movies",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          credentials: "include",

          body: JSON.stringify({
            title,
            description,
          }),
        }
      );

      const data = await response.json();

      alert(data.message);

      setTitle("");

      setDescription("");

      getMovies();

    } catch (error) {

      console.log(error);
    }
  };


  // DELETE MOVIE
  const deleteMovie = async (id) => {

    try {

      const response = await fetch(
        `https://mern-movies-app-o1fz.onrender.com/api/movies/${id}`,
        {
          method: "DELETE",

          credentials: "include",
        }
      );

      const data = await response.json();

      alert(data.message);

      getMovies();

    } catch (error) {

      console.log(error);
    }
  };


  // START EDIT
  const startEdit = (movie) => {

    setEditingId(movie._id);

    setTitle(movie.title);

    setDescription(movie.description);
  };


  // UPDATE MOVIE
  const updateMovie = async () => {

    try {

      const response = await fetch(
        `https://mern-movies-app-o1fz.onrender.com/api/movies/${editingId}`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
          },

          credentials: "include",

          body: JSON.stringify({
            title,
            description,
          }),
        }
      );

      const data = await response.json();

      alert(data.message);

      setEditingId(null);

      setTitle("");

      setDescription("");

      getMovies();

    } catch (error) {

      console.log(error);
    }
  };


  // LOGOUT
  const logout = async () => {

    await fetch(
      "https://mern-movies-app-o1fz.onrender.com/api/auth/logout",
      {
        method: "GET",

        credentials: "include",
      }
    );

    alert("Logged out");

    window.location.href = "/login";
  };


  useEffect(() => {

    getMovies();

  }, []);


  return (

    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f4f4f4",
        padding: "40px",
        fontFamily: "Arial",
      }}
    >

      <div
        style={{
          maxWidth: "700px",
          margin: "auto",
          backgroundColor: "white",
          padding: "30px",
          borderRadius: "15px",
          boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
        }}
      >

        <button
          onClick={logout}
          style={{
            padding: "10px 15px",
            backgroundColor: "#333",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            marginBottom: "20px",
          }}
        >
          Logout
        </button>

        <h1
          style={{
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          🎬 Movies App
        </h1>

        <input
          type="text"
          placeholder="Movie Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px",
            borderRadius: "8px",
            border: "1px solid gray",
          }}
        />

        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "20px",
            borderRadius: "8px",
            border: "1px solid gray",
          }}
        />

        {
          editingId ? (

            <button
              onClick={updateMovie}
              style={{
                width: "100%",
                padding: "12px",
                backgroundColor: "#ff9800",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "16px",
              }}
            >
              Update Movie
            </button>

          ) : (

            <button
              onClick={addMovie}
              style={{
                width: "100%",
                padding: "12px",
                backgroundColor: "#4caf50",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "16px",
              }}
            >
              Add Movie
            </button>

          )
        }

        <hr
          style={{
            margin: "30px 0",
          }}
        />

        {
          movies.length === 0 ? (

            <p
              style={{
                textAlign: "center",
              }}
            >
              No movies yet
            </p>

          ) : (

            movies.map((movie) => (

              <div
                key={movie._id}
                style={{
                  backgroundColor: "#fafafa",
                  padding: "20px",
                  marginBottom: "20px",
                  borderRadius: "12px",
                  boxShadow: "0px 0px 5px rgba(0,0,0,0.1)",
                }}
              >

                <h2>{movie.title}</h2>

                <p>{movie.description}</p>

                <button
                  onClick={() => startEdit(movie)}
                  style={{
                    padding: "10px 15px",
                    backgroundColor: "#2196f3",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                  }}
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteMovie(movie._id)}
                  style={{
                    padding: "10px 15px",
                    backgroundColor: "#f44336",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    marginLeft: "10px",
                  }}
                >
                  Delete
                </button>

              </div>
            ))
          )
        }

      </div>

    </div>
  );
}

export default Movies;