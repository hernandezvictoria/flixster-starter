import React from "react";
import ReactDOM from "react-dom";
import "./Modal.css";
import {parseDataForModal} from "../utils/helper-functions.js";
const accessToken = import.meta.env.VITE_API_KEY; // api key

function Modal(props) {

  // props: data, title, onClose, genres, runtime
  const parsedData = parseDataForModal(props.data, props.title);

  if(props.title === "") {
    return;
  }

  const getGenres = () => {
    let genres = "";
    for(let genreId of parsedData.genre_ids) {
      genres += props.genres[genreId] + ", ";
    }
    return genres;
  }

  const getImage = () => {
    if (props.backdrop_path === undefined) {
      return 'src/assets/placeholder-poster.jpg';
    }
    else{
      return `https://image.tmdb.org/t/p/w300${parsedData.backdrop_path}`;
    }
  }

  return (
    <div className="modal-overlay" onClick={props.onClose}>
        <div className="modal" onClick={(event) => event.stopPropagation()}>
            <button className="close-button" onClick={props.onClose}>Close</button>
            <h2>{parsedData.title}</h2>
            <div className="modal-body">
                <img src={getImage()} alt={props.title} />
                <p><strong>Release Date:</strong> {parsedData.release_date}</p>
                <p><strong>Runtime:</strong> {props.runtime}</p>
                <p><strong>Overview:</strong> {parsedData.overview}</p>
                <p><strong>Genres:</strong> {getGenres()}</p>

            </div>
        </div>

    </div>
  );
}

export default Modal;
