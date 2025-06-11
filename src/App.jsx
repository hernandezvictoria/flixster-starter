


import { useState, useEffect } from 'react'
import './App.css'
import MovieList from './components/MovieList'
import LoadMore from './components/LoadMore'

const App = () => {
  // STATE VARIABLES
  const [data, setData] = useState([]);
  const [pagesDisplayed, setPagesDisplayed] = useState(1); // for now playing
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchPage, setSearchPage] = useState(1); // for search
  const accessToken = import.meta.env.VITE_API_KEY; // api key

  // FETCH DATA FROM NOW PLAYING
  const loadNowPlaying = async () => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    };

    const response = await fetch(
      `https://api.themoviedb.org/3/movie/now_playing?page=${pagesDisplayed}`,
      options
    );
    const result = await response.json();

    if (pagesDisplayed === 1) {
      setData(result.results);
    } else {
      setData(prev => [...prev, ...result.results]);
    }
  };

  // FETCH DATA FROM SEARCH
  const loadSearchQuery = async () => {
    if (!searchQuery) return;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    };

    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(searchQuery)}&page=${searchPage}`,
      options
    );
    const result = await response.json();

    // make it so that you can load more pages of the searched page
    if (searchPage === 1) {
      setData(result.results);
    } else {
      setData(prev => [...prev, ...result.results]);
    }

    //setIsSearching(false); // set is searching to false so that it does does not allow for automatic searching
  };

  // EFFECT: Now Playing
  useEffect(() => {
    if (!isSearching) {
      loadNowPlaying();
    }
  }, [pagesDisplayed, isSearching]);

  // EFFECT: Search
  useEffect(() => {
    if (isSearching) {
      loadSearchQuery();
    }
  }, [searchQuery, searchPage, isSearching]);


  // HANDLERS
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setIsSearching(true);
    setSearchPage(1);
    setPagesDisplayed(1);
  };

  const handleSearchReset = (event) => {
    event.preventDefault();
    setSearchQuery("");
    setIsSearching(false);
    setPagesDisplayed(1);
    setSearchPage(1);
  };

  const onLoadMore = () => {
    if (isSearching) {
      setSearchPage(prev => prev + 1);
    } else {
      setPagesDisplayed(prev => prev + 1);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🎥 Flixster 🎬</h1>

        <div className="subheader">
          <div className="search-bar">
            <form onSubmit={handleSearchSubmit} onReset={handleSearchReset}>
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search for movies"
              />
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

      <main>
        <div className="movie-container">
          <MovieList data={data} />
        </div>
      </main>

      <footer>
        <LoadMore onLoadMore={onLoadMore} />
      </footer>
    </div>
  );
};

export default App;
