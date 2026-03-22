import React from "react";
import { motion, AnimatePresence } from "framer-motion";

function Modal({ movie, onClose }) {
  if (!movie) return null;

  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Image";

  return (
    <AnimatePresence>
      <motion.div
        className="modal show d-block"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.div
          className="modal-dialog modal-lg modal-dialog-centered"
          onClick={(e) => e.stopPropagation()}
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{movie.title}</h5>
              <button className="btn-close" onClick={onClose}></button>
            </div>

            <div className="modal-body text-center">
              <img
                src={imageUrl}
                alt={movie.title}
                style={{ maxHeight: "400px", borderRadius: "10px" }}
                className="mb-3"
              />

              <p><strong>⭐ Rating:</strong> {movie.vote_average}</p>
              <p>{movie.overview || "No description available."}</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default Modal;