import React from "react";
import ReactDOM from "react-dom";
import "./MovieCard.css"

function MovieCard(props) {


    //props: poster_path, title, rating
  return (
    <div className="card">
        <img className="card-poster" src={`https://image.tmdb.org/t/p/w300${props.poster_path}`} alt={props.title} />
        <p className="card-title">{props.title}</p>
        <p className="card-rating">Rating: {props.rating}</p>
    </div>
  );
}



export default MovieCard;
