import { useState, useEffect } from 'react'
import './App.css'
import tempData from './data/data.js'
import MovieList from './components/MovieList'
import LoadMore from './components/LoadMore'

const App = () => {

  const [data, setData] = useState(tempData.results);
  const [pagesDisplayed, setPagesDisplayed] = useState(1);
  const [apiLink, setApiLink] = useState('https://api.themoviedb.org/3/movie/now_playing');

  const onLoadMore = () => {
    setPagesDisplayed((pagesDisplayed) => pagesDisplayed + 1);
    console.log("updated pages displayed");
  };

  const fetchData = async () => {

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MmU2MjFjY2JhNjg1NTYxZGE5MGY4OTEwMmE1ZGQzZSIsIm5iZiI6MTc0OTUwODM3NS41NTksInN1YiI6IjY4NDc2MTE3OGRlMzYyZmYxZTlmNTIyMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cYtzRVWB_-f8d56mpHoF1KrK0PpgevkNtQDpIo7_hTI'
      }
    };

    const response = await fetch('https://api.themoviedb.org/3/movie/now_playing', options);

    const data = await response.json();
    console.log(data.results);
    setData(data.results);

  }


  useEffect(() => {
    fetchData();
  }, [apiLink]); // right now running every time


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
        <LoadMore onLoadMore={onLoadMore} />
      </footer>

    </div>
  )
}

export default App
