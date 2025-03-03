import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MovieApp from "./MovieApp";
import MovieDetails from "./MovieDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MovieApp />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>
    </Router>
  );
}



export default App;
