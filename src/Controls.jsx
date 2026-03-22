import React from 'react'


function Controls({ rating, setRating, sort, setSort }) {
    return (
      <div className="d-flex justify-content-between mb-4 flex-wrap gap-2">
        <div>
          <label className="me-2">⭐ Min Rating:</label>
          <select
            className="form-select d-inline w-auto"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
          >
            <option value={0}>All</option>
            <option value={5}>5+</option>
            <option value={6}>6+</option>
            <option value={7}>7+</option>
            <option value={8}>8+</option>
          </select>
        </div>
  
        <div>
          <label className="me-2">Sort:</label>
          <select
            className="form-select d-inline w-auto"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="popularity">Popularity</option>
            <option value="rating">Rating</option>
            <option value="title">Title</option>
          </select>
        </div>
      </div>
    );
  }

export default Controls