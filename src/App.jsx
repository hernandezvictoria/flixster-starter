


import { useState, useEffect } from 'react'
import './App.css'
import MovieList from './components/MovieList'
import LoadMore from './components/LoadMore'
import Modal from './components/Modal'

const App = () => {
  // =============== STATE VARIABLES =================
  const [data, setData] = useState([]);
  const [pagesDisplayed, setPagesDisplayed] = useState(1); // for now playing
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchPage, setSearchPage] = useState(1); // for searching
  const [modalMovieTitle, setModalMovieTitle] = useState("");
  const [genres, setGenres] = useState({}); // genres is a hashmap from genre id to genre name
  const [modalMovieRuntime, setModalMovieRuntime] = useState("");
  const [modalMovieTrailerKey, setModalMovieTrailerKey] = useState("");
  const [sortMode, setSortMode] = useState("default"); // default, title, releaseDate, voteAverage

  const accessToken = import.meta.env.VITE_API_KEY; // api key


  // =============== FETCH DATA FROM NOW PLAYING ================
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

  // EFFECT: Now Playing
  useEffect(() => {
    if (!isSearching) {
      loadNowPlaying();
    }
  }, [pagesDisplayed, isSearching]);

  // =================== FETCH DATA FROM SEARCH ==================
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
      `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&page=${searchPage}`,
      options
    );
    const result = await response.json();

    if (searchPage === 1) {
      setData(result.results);
    } else {
      setData(prev => [...prev, ...result.results]); // load more pages of the same search query
    }
  };

  // EFFECT: Search
  useEffect(() => {
    if (isSearching) {
      loadSearchQuery();
    }
  }, [searchQuery, searchPage, isSearching]);

  // =============== GET GENRES =================
  const loadGenres = async () => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    };

    const response = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list`,
      options
    );

    const result = await response.json();


    let map = {};
    for(const genre of result.genres){
      map[genre.id] = genre.name;
    }

    setGenres(map);
  };

  // EFFECT: Load Genres
  useEffect(() => {
    loadGenres();
  }, []); // load the genres only once on initial page load

  // =================== GET RUNTIME & TRAILER FOR MODAL ==================
  const loadRuntimeAndTrailer = async () => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    };

    let id = "";
    for(const movie of data){
      if(movie.title === modalMovieTitle){
        id = movie.id;
      }
    }

    if (!id) return;

    try {
      const runtimeResponse = await fetch(`https://api.themoviedb.org/3/movie/${id}`, options);
      if (!runtimeResponse.ok) {
        throw new Error('Network response error');
      }
      const runtimeResult = await runtimeResponse.json();
      setModalMovieRuntime(runtimeResult.runtime);
    }
    catch (error) {
      console.error("Unable to fetch runtime: ", error);
    }

    try {
      const trailerResponse = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos`, options);
      if (!trailerResponse.ok) {
        throw new Error('Network response error');
      }
      const trailerResult = await trailerResponse.json();
      console.log(trailerResult);

      for(const video of trailerResult.results){
        if(video.type === "Trailer" && video.site === "YouTube"){
          setModalMovieTrailerKey(video.key);
        }
      }
    }
    catch (error) {
      console.error("Unable to fetch trailer: ", error);
    }

  };

  // EFFECT: Load Runtime and Trailer
  useEffect(() => {
    loadRuntimeAndTrailer();
  }, [modalMovieTitle]);



  //  =============== HANDLERS =================
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

  const handleLoadMore = () => {
    if (isSearching) {
      setSearchPage(prev => prev + 1);
    } else {
      setPagesDisplayed(prev => prev + 1);
    }
  };

  const handleModalClick = (movieTitle) => {
    setModalMovieTitle(movieTitle);
  }

  const handleModalClose = () => {
    setModalMovieTitle("");
  }

  const handleSortChange = (event) => {
    setSortMode(event.target.value);
  }

  return (
    <div className="App">
      <header className="App-header">

        <h1>🎬 Flixster 🎥 </h1>
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
            <select className="sort-bar" onChange={handleSortChange}>
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
          <MovieList data={data} onCardClick={handleModalClick} sortMode={sortMode}/>
          <Modal data={data} title={modalMovieTitle} onClose={handleModalClose} genres={genres} runtime={modalMovieRuntime} trailerKey={modalMovieTrailerKey}/>
        </div>
        <LoadMore onLoadMore={handleLoadMore} />
      </main>

      <footer>
        <p className="footer-content">Created by <a href="https://github.com/hernandezvictoria">Victoria Hernandez</a> </p>
        <p className="footer-content">API provided by <a href="https://www.themoviedb.org/documentation/api">The Movie DB</a></p>
      </footer>
    </div>
  );
};

export default App;
