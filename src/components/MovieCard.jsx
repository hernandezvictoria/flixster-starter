import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./MovieCard.css";

function MovieCard(props) {
  //props: poster_path, title, rating, onCardClick

  const [liked, setLiked] = useState(false);
  const [watched, setWatched] = useState(false);

  const handleClick = (event) => {
    props.onCardClick(props.title);
  };

  const getImage = () => {
    if (props.poster_path === null) {
      return 'src/assets/placeholder-poster.jpg'; // default poster if there is no image
    } else {
      return `https://image.tmdb.org/t/p/w300${props.poster_path}`;
    }
  };

  const switchLikeIcon = (event) => {
    event.stopPropagation();
    setLiked(!liked);
  };

  const switchWatchedIcon = (event) => {
    event.stopPropagation();
    setWatched(!watched);
  };

  return (
    <div className="card" onClick={handleClick}>
      <img className="card-poster" src={getImage()} alt={props.title} />
      <p className="card-title">{props.title}</p>
      <p className="card-rating">Rating: {props.rating}</p>
      <div className="icons">
        {/* using icons from Font Awesome */}

        <div className="like-icon-container">
          <i id="like-icon" className={`fa-heart ${liked ? 'fa-solid' : 'fa-regular'}`} onClick={switchLikeIcon}></i>
          <span className="like-overlay-text">Add/Remove from Liked</span>
        </div>

        <div className="watch-icon-container">
          <i id="watch-icon" className={`fa-solid ${watched ? 'fa-eye' : 'fa-eye-slash'}`} onClick={switchWatchedIcon}></i>
          <span className="watch-overlay-text">Add/Remove from Watched</span>
        </div>
        
      </div>
    </div>
  );
}

export default MovieCard;
