import React from "react";
import ReactDOM from "react-dom";
import MovieCard from "./MovieCard.jsx";
import "./MovieList.css";
import {parseDataForCard} from "../utils/helper-functions.js";

function MovieList(props) {
    //props: data, onCardClick
    //data: poster_path, title, rating, release_date

  let parsedData = parseDataForCard(props.data);

  if(props.sortMode === "title") {
    parsedData = parsedData.sort((a, b) => a.title.localeCompare(b.title));
  }

  if(props.sortMode === "voteAverage"){
    parsedData = parsedData.sort((a, b) => parseInt(b.rating) - parseInt(a.rating));
  }

  if (props.sortMode === "releaseDate") {
    parsedData = parsedData.sort((a, b) => {
      const dateA = new Date(a.release_date);
      const dateB = new Date(b.release_date);
      return dateB.getTime() - dateA.getTime();
    });
  }


  if(props.data.length === 0) {
    return <div className="row">
      <p>No movies found ☹️ </p>
      </div>;
  }

  return (
    <div className="row">
    {
        parsedData.map(obj => {
            return(<MovieCard poster_path={obj.poster_path} title={obj.title} rating={obj.rating} onCardClick={props.onCardClick}/>);
        })
        }
    </div>
  );
}

export default MovieList;
