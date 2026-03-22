import React from "react";
import { motion } from "framer-motion";

function MovieCard({ movie, onClick, favorites, toggleFavorite }) {
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Image";

  const isFav = favorites?.some((m) => m.id === movie.id);

  return (
    <motion.div
      whileHover={{ scale: 1.08, y: -8 }}
      className="card h-100 shadow-sm border-0 position-relative"
      style={{ cursor: "pointer", borderRadius: "12px", overflow: "hidden" }}
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleFavorite(movie);
        }}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          background: "white",
          border: "none",
          borderRadius: "50%",
          padding: "5px 8px",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        {isFav ? "❤️" : "🤍"}
      </button>

      <div onClick={() => onClick(movie)}>
        <img
          src={imageUrl}
          className="card-img-top"
          alt={movie.title}
          style={{ height: "280px", objectFit: "cover" }}
        />

        <div className="card-body">
          <h6 className="card-title text-truncate fw-semibold">
            {movie.title}
          </h6>
          <p className="mb-0">⭐ {movie.vote_average}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default MovieCard;