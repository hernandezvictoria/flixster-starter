// import { useState, useEffect } from 'react'
// import './App.css'
// import MovieList from './components/MovieList'
// import LoadMore from './components/LoadMore'
// // import Search from './components/Search'

// const App = () => {

//   // STATE VARIABLES
//   const [data, setData] = useState([]);
//   const [pagesDisplayed, setPagesDisplayed] = useState(1);
//   const accessToken = import.meta.env.VITE_API_KEY;
//   const [searchQuery, setSearchQuery] = useState("");


//   // FETCH DATA FROM NOW PLAYING + LOAD MORE FUNCTIONALITY
//   const loadNowPlaying = async () => {

//     const options = {
//       method: 'GET',
//       headers: {
//         accept: 'application/json',
//         Authorization: `Bearer ${accessToken}`
//       }
//     };

//     const response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?page=${pagesDisplayed}`, options);
//     const data = await response.json();


//     if(pagesDisplayed === 1) {
//       setData((prev) => data.results);
//     }
//     else{
//       setData((prev) => [...prev, ...data.results]);
//     }
//   }

//   useEffect(() => {
//     loadNowPlaying();
//   }, [pagesDisplayed]); // right now running whenever loadMore is called

//   const onLoadMore = () => {
//     setPagesDisplayed((pagesDisplayed) => pagesDisplayed + 1);
//   };


//   // SEARCH FUNCTIONALITY
//   const loadSearchQuery = async () => {
//     const options = {
//       method: 'GET',
//       headers: {
//         accept: 'application/json',
//         Authorization: `Bearer ${accessToken}`
//       }
//     };

//     const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${searchQuery}&page=1`, options);
//     const data = await response.json();
//     setData(data.results);
//   }

//   useEffect(() => {
//     loadSearchQuery();
//   }, [searchQuery]); // right now running whenever loadMore is called

//   const handleSearchChange = (event) => {
//     setSearchQuery(event.target.value);
//   };


//   return (
//     <div className="App">
//       <header className="App-header">
//         <h1>🎥 Flixster 🎬</h1>

//         <div className="subheader">
//           <div className="search-bar">
//             <form>
//                 <input type="text" value={searchQuery} onChange={handleSearchChange} placeholder="Search for movies" />
//                 <button type="submit">Search</button>
//                 <button type="reset">Clear</button>
//             </form>
//         </div>

//           <div className="sort-bar">
//             <select>
//               <option value="default">Sort by</option>
//               <option value="title">Title (A-Z)</option>
//               <option value="releaseDate">Release Date (newest to oldest)</option>
//               <option value="voteAverage">Vote Average (highest to lowest)</option>
//             </select>
//           </div>
//         </div>
//       </header>

//       <body>
//         <div className="movie-container">
//           <MovieList data={data} />
//         </div>
//       </body>

//       <footer>
//         <LoadMore onLoadMore={onLoadMore} />
//       </footer>

//     </div>
//   )
// }

// export default App


import { useState, useEffect } from 'react'
import './App.css'
import MovieList from './components/MovieList'
import LoadMore from './components/LoadMore'

const App = () => {
  // STATE VARIABLES
  const [data, setData] = useState([]);
  const [pagesDisplayed, setPagesDisplayed] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchPage, setSearchPage] = useState(1);

  // Replace with your actual access token
  const accessToken = import.meta.env.VITE_API_KEY;

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

    if (searchPage === 1) {
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
    // eslint-disable-next-line
  }, [pagesDisplayed, isSearching]);

  // EFFECT: Search
  useEffect(() => {
    if (isSearching) {
      loadSearchQuery();
    }
    // eslint-disable-next-line
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
