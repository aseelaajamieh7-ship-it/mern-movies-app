import { useState, useEffect } from "react";

function Movies() {
  const [movies, setMovies] = useState(() => {
    const saved = localStorage.getItem("movies");
    return saved
      ? JSON.parse(saved)
      : [
          { title: "Inception", rating: 9, favorite: false },
          { title: "Interstellar", rating: 8, favorite: false },
          { title: "Titanic", rating: 7, favorite: false },
          { title: "Avatar", rating: 8, favorite: false },
          { title: "Joker", rating: 9, favorite: false }
        ];
  });

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newRating, setNewRating] = useState("");
  const [error, setError] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    localStorage.setItem("movies", JSON.stringify(movies));
  }, [movies]);

  const addMovie = () => {
    if (newTitle.trim() === "" || newRating === "") {
      setError("Please fill all fields");
      return;
    }

    if (newRating < 1 || newRating > 10) {
      setError("Rating must be 1-10");
      return;
    }

    setError("");

    if (editIndex !== null) {
      const updated = [...movies];
      updated[editIndex] = {
        ...updated[editIndex],
        title: newTitle,
        rating: Number(newRating)
      };
      setMovies(updated);
      setEditIndex(null);
    } else {
      setMovies([
        ...movies,
        { title: newTitle, rating: Number(newRating), favorite: false }
      ]);
    }

    setNewTitle("");
    setNewRating("");
  };

  const deleteMovie = (index) => {
    setMovies(movies.filter((_, i) => i !== index));
  };

  const startEdit = (index) => {
    setNewTitle(movies[index].title);
    setNewRating(movies[index].rating);
    setEditIndex(index);
  };

  const toggleFavorite = (index) => {
    const updated = [...movies];
    updated[index].favorite = !updated[index].favorite;
    setMovies(updated);
  };

  const displayed = movies
    .filter((m) =>
      m.title.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sort === "asc") return a.rating - b.rating;
      if (sort === "desc") return b.rating - a.rating;
      return 0;
    });

  return (
    <div className="container">
      <h2>Movies</h2>

      <div className="controls">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select onChange={(e) => setSort(e.target.value)}>
          <option value="">Default</option>
          <option value="asc">Low → High</option>
          <option value="desc">High → Low</option>
        </select>
      </div>

      <div className="form">
        <input
          type="text"
          placeholder="Movie name"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />

        <input
          type="number"
          placeholder="Rating"
          value={newRating}
          onChange={(e) => setNewRating(e.target.value)}
        />

        <button onClick={addMovie}>
          {editIndex !== null ? "Update" : "Add"}
        </button>
      </div>

      {error && <p className="error">{error}</p>}

      <ul className="list">
        {displayed.map((movie, index) => (
          <li
            key={index}
            className={`card ${movie.favorite ? "fav" : ""}`}
          >
            <div className="info">
              <span className="title">{movie.title}</span>
              <span className="rating">{movie.rating}</span>
            </div>

            <div className="actions">
              <button onClick={() => toggleFavorite(index)}>
                {movie.favorite ? "★" : "☆"}
              </button>
              <button onClick={() => startEdit(index)}>Edit</button>
              <button onClick={() => deleteMovie(index)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Movies;