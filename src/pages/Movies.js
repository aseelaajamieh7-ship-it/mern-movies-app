import { useState } from "react";

function Movies() {
  const [movies, setMovies] = useState([
    { title: "Inception", rating: 9 },
    { title: "Interstellar", rating: 8 },
    { title: "Titanic", rating: 7 },
    { title: "Avatar", rating: 8 },
    { title: "Joker", rating: 9 },
    { title: "Batman", rating: 8 },
    { title: "Spider-Man", rating: 7 },
    { title: "Avengers", rating: 9 },
    { title: "Frozen", rating: 6 },
    { title: "Cars", rating: 6 },
  ]);

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newRating, setNewRating] = useState("");

  // ➕ Add Movie
  const addMovie = () => {
    if (newTitle === "" || newRating === "") {
      alert("Please fill all fields");
      return;
    }

    if (newRating < 1 || newRating > 10) {
  alert("Rating must be between 1 and 10");
  return;
}

    setMovies([...movies, { title: newTitle, rating: Number(newRating) }]);
    setNewTitle("");
    setNewRating("");
  };

  // ❌ Delete
  const deleteMovie = (index) => {
    setMovies(movies.filter((_, i) => i !== index));
  };

  return (
    <div className="container">
      <h2>Movies Page 🎬</h2>

      {/* 🔍 Search */}
      <input
        type="text"
        placeholder="Search movie..."
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* 🔃 Sort */}
      <select onChange={(e) => setSort(e.target.value)}>
        <option value="">Default</option>
        <option value="asc">Low → High</option>
        <option value="desc">High → Low</option>
      </select>

      {/* ➕ Add */}
      <div>
        <input
          type="text"
          placeholder="Movie name"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />

        <input
          type="number"
          placeholder="Rating (1-10)"
          value={newRating}
          onChange={(e) => setNewRating(e.target.value)}
        />

       <button type="button" onClick={addMovie}>Add Movie</button>
      </div>

      {/* 📃 List */}
      <ul>
        {movies
          .filter((movie) =>
            movie.title.toLowerCase().includes(search.toLowerCase())
          )
          .sort((a, b) => {
            if (sort === "asc") return a.rating - b.rating;
            if (sort === "desc") return b.rating - a.rating;
            return 0;
          })
          .map((movie, index) => (
            <li key={movie.title}>
              {movie.title} ⭐ {movie.rating}
              <button onClick={() => deleteMovie(index)}> ❌ </button>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default Movies;