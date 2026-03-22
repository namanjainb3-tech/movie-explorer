import React from 'react'


function Navbar({ query, setQuery, onSearch, darkMode, setDarkMode }) {
    return (
      <nav className="navbar bg-black navbar-dark px-4">
        <div className="container-fluid">
          <span className="navbar-brand fw-bold">🎬 Movie Explorer</span>
  
          <div className="d-flex gap-2">
            <form className="d-flex" onSubmit={onSearch}>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search movies..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button className="btn btn-outline-light">Search</button>
            </form>
  
            <button
              className="btn btn-outline-light"
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? "☀️" : "🌙"}
            </button>
          </div>
        </div>
      </nav>
    );
  }

export default Navbar;