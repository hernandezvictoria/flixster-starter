import React from "react";
import ReactDOM from "react-dom";
import "./MovieCard.css"

function MovieCard(props) {

  const handleClick = (event) => {
    props.onCardClick(props.title);
  }

    //props: poster_path, title, rating, onCardClick
  return (
    <div className="card" onClick={handleClick}>
        <img className="card-poster" src={`https://image.tmdb.org/t/p/w300${props.poster_path}`} alt={props.title} />
        <p className="card-title">{props.title}</p>
        <p className="card-rating">Rating: {props.rating}</p>
    </div>
  );
}



export default MovieCard;
