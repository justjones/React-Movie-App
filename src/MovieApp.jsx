import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";

const API_KEY = "87ddb14a";
const RESULTS_PER_PAGE = 6;

function MovieApp() {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("Avengers");
  const [selectedYear, setSelectedYear] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMovies(currentPage, searchQuery, selectedYear);
  }, [currentPage, searchQuery, selectedYear]);

  async function fetchMovies(page, query, year) {
    let url = `https://www.omdbapi.com/?s=${query}&page=${page}&apikey=${API_KEY}`;
    if (year) url += `&y=${year}`;

    const response = await fetch(url);
    const movieData = await response.json();
    setMovies(movieData.Response === "True" ? movieData.Search : []);
  }

  function handleMovieClick(movie) {
    navigate(`/movie/${movie.imdbID}`); // Navigate to a new movie details page
  }

  return (
    <div className="movie-app">
      <div className="movie__search">
      <h1>Movie Search</h1>
      </div>
      <div className="input__search">
      <input 
        type="text"
        placeholder="Search movies..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
        <option value="">All Years</option>
        {[...Array(new Date().getFullYear() - 1949)].map((_, i) => (
          <option key={i} value={1950 + i}>{1950 + i}</option>
        ))}
      </select>
      </div>
      <div className="movie-list">
        {movies.length > 0 ? (
          movies.slice(0, RESULTS_PER_PAGE).map((movie) => (
            <div key={movie.imdbID} className="movie-card">
              <div className="overlay" onClick={() => handleMovieClick(movie) }> 
                <h3>{movie.Title}</h3>
                <p>{movie.Year}</p>
              </div>
              <img
                src={movie.Poster !== "N/A" ? movie.Poster : "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"}
                alt={movie.Title}
              />              
            </div>
          ))
        ) : (
          <p>No movies found</p>
        )}
      </div>
      <div className="pagination-container">
        {currentPage > 1 && (
          <button onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
        )}
        <button onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
      </div>
    </div>
  );
}

export default MovieApp;
