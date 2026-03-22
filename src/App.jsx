import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { motion, AnimatePresence } from "framer-motion";

import Navbar from "./Navbar";
import MovieCard from "./MovieCard";
import Modal from "./Modal";
import Controls from "./Controls";

const API_KEY = "0021f4dc834c3afabe00d74fb9e04650";

export default function App() {
  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem("favorites")) || [];
  });
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState(0);
  const [sort, setSort] = useState("popularity");
  const [darkMode, setDarkMode] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const fetchMovies = async (search = "") => {
    setLoading(true);

    const url = search
      ? `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${search}`
      : `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`;

    const res = await fetch(url);
    const data = await res.json();

    setMovies(data.results || []);
    setLoading(false);
  };

  const toggleFavorite = (movie) => {
    let updated;
  
    if (favorites.find((m) => m.id === movie.id)) {
      updated = favorites.filter((m) => m.id !== movie.id);
    } else {
      updated = [...favorites, movie];
    }
  
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchMovies(query);
  };


  let filteredMovies = movies.filter(
    (m) => m.vote_average >= rating
  );

  if (sort === "rating") {
    filteredMovies.sort((a, b) => b.vote_average - a.vote_average);
  } else if (sort === "title") {
    filteredMovies.sort((a, b) => a.title.localeCompare(b.title));
  }

  return (
    <div className={`${darkMode ? "bg-dark text-light" : "bg-light text-dark"} min-vh-100 w-100`}>
      <Navbar
        query={query}
        setQuery={setQuery}
        onSearch={handleSearch}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      <div className="container-fluid px-4 py-4">
        <h1 className="text-center mb-4 fw-bold">Discover Movies</h1>

        <Controls
          rating={rating}
          setRating={setRating}
          sort={sort}
          setSort={setSort}
        />

        {loading && <p className="text-center">Loading...</p>}
        {!loading && filteredMovies.length === 0 && (
        <p className="text-center fs-5 mt-4">No movies found 😢</p>
        )}
        
        {favorites.length > 0 && (
  <>
        <h3 className="mb-3">❤️ Favorites</h3>
            <div className="row g-4 mb-4">
              {favorites.map((movie) => (
                <div className="col-6 col-md-4 col-lg-3" key={movie.id}>
                  <MovieCard
                    movie={movie}
                    onClick={setSelectedMovie}
                    favorites={favorites}
                    toggleFavorite={toggleFavorite}
                  />
                </div>
              ))}
            </div>
          </>
        )}
        <div className="row g-4">
          {filteredMovies.map((movie) => (
            <div className="col-6 col-md-4 col-lg-3" key={movie.id}>
              <MovieCard
                movie={movie}
                onClick={setSelectedMovie}
                favorites={favorites}
                toggleFavorite={toggleFavorite}
              />
            </div>
          ))}
        </div>
      </div>

      <Modal
        movie={selectedMovie}
        onClose={() => setSelectedMovie(null)}
      />
    </div>
  );
}






