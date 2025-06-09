import React from "react";
import MovieCard from "./MovieCard.jsx";
import "./MovieList.css";
import { parseData, chunkArray } from "/Users/vlhernan/internship/codepath/flixster-starter/src/utils/helper-functions.js";



function MovieList(props) {
  // props: data
  // data: poster_path, title, rating

  const parsedData = parseData(props.data);
  const movieCards = parsedData.map((obj, idx) => (
    <MovieCard
      poster_path={obj.poster_path}
      title={obj.title}
      rating={obj.rating}
    />
  ));

  const rows = chunkArray(movieCards, 6);

  return (
    <div>
      {rows.map((row, idx) => (
        <div className="row" key={idx}>
          {row}
        </div>
      ))}
    </div>
  );
}

export default MovieList;
