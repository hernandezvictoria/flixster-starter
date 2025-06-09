import { useState } from 'react'
import './App.css'
import data from './data/data.js'
import MovieList from './components/MovieList'

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>🎥 Flixster 🎬</h1>

        <div className="subheader">
          <div className="search-bar">
            <form>
              <input type="text" placeholder="Search for movies" />
              <button type="submit">Search</button>
              <button type="reset">Clear</button>
            </form>
          </div>

          <div className="sort-bar">
            <select>
              <option value="default">Sort by</option>
              <option value="title">Title (A-Z)</option>
              <option value="releaseDate">Release Date (newest to oldest)</option>
              <option value="voteAverage">Vote Average (highest to lowest)</option>
            </select>
          </div>
        </div>
      </header>

      <body>
        <div className="movie-container">
          <MovieList data={data} />
        </div>
      </body>

      <footer>

      </footer>

    </div>
  )
}

export default App
