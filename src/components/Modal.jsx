import React from "react";
import ReactDOM from "react-dom";
import "./Modal.css";
import {parseDataForModal} from "/Users/vlhernan/internship/codepath/flixster-starter/src/utils/helper-functions.js";

function Modal(props) {

  // props: data, title, onClose, genres
  const parsedData = parseDataForModal(props.data, props.title);

  if(props.title === "") {

    console.log("no title in modal");
    return;
  }

  console.log("movie title in modal is " + props.title);
  console.log(parsedData);

  const getGenres = () => {
    let genres = "";
    for(let genreId of parsedData.genre_ids) {
      genres += props.genres[genreId] + ", ";
    }
    return genres;
  }

  return (
    <div className="modal-overlay" onClick={props.onClose}>
        <div className="modal" onClick={(event) => event.stopPropagation()}>
            <button className="close-button" onClick={props.onClose}>Close</button>
            <h2>{parsedData.title}</h2>
            <div className="modal-body">
                <img src={`https://image.tmdb.org/t/p/w300${parsedData.backdrop_path}`} alt={props.title} />
                <p><strong>Release Date:</strong> {parsedData.release_date}</p>
                <p><strong>Overview:</strong> {parsedData.overview}</p>
                <p><strong>Genres:</strong> {getGenres()}</p>

            </div>
        </div>

    </div>
  );
}

export default Modal;
