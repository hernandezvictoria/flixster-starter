import React from "react";
import ReactDOM from "react-dom";
import "./MovieCard.css"

function MovieCard(props) {
  //props: poster_path, title, rating, onCardClick

  const handleClick = (event) => {
    props.onCardClick(props.title);
  }

  const getImage = () => {
    if (props.poster_path === null) {
      return 'src/assets/placeholder-poster.jpg'; // default poster if there is no image
    }
    else{
      return `https://image.tmdb.org/t/p/w300${props.poster_path}`;
    }
  }

  return (
    <div className="card" onClick={handleClick}>
      <img className="card-poster" src={getImage()} alt={props.title} />
      <p className="card-title">{props.title}</p>
      <p className="card-rating">Rating: {props.rating}</p>
    </div>
  );
}



export default MovieCard;
