import React from "react";
import ReactDOM from "react-dom";
import MovieCard from "./MovieCard.jsx";
import "./MovieList.css";
import {parseDataForCard} from "/Users/vlhernan/internship/codepath/flixster-starter/src/utils/helper-functions.js";

function MovieList(props) {
    //props: data, onCardClick
    //data: poster_path, title, rating

  const parsedData = parseDataForCard(props.data);

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
