import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; 

const API_KEY = "87ddb14a";

function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate(); 
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    async function fetchMovieDetails() {
      console.log("Fetching movie details for ID:", id);
      const response = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`);
      const data = await response.json();
      setMovie(data);
    }

    fetchMovieDetails();
  }, [id]);

  if (!movie) return <p>Loading...</p>;

  return (
    <div className="movie-details">
      <h1>{movie.Title}</h1>
      <p><b>Year:</b> {movie.Year}</p>
      <p><b>Genre:</b> {movie.Genre}</p>
      <p className="movie__details-plot"><b>Plot:</b> {movie.Plot}</p>
      <div className="movie__poster">
      <img src={movie.Poster} alt={movie.Title} />
      </div>

    
      <button className="movie__details-btn" onClick={() => navigate("/")}>Back to Home</button>
    </div>
  );
}

export default MovieDetails;
