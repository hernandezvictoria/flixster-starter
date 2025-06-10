import React from "react";
import ReactDOM from "react-dom";
import MovieCard from "./MovieCard.jsx";
import "./MovieList.css";
import {parseData} from "/Users/vlhernan/internship/codepath/flixster-starter/src/utils/helper-functions.js";

function Forecast(props) {
    //props: data
    //data: poster_path, title, rating

  const parsedData = parseData(props.data);

  return (
    <div className="row">
    {
        parsedData.map(obj => {
            return(<MovieCard poster_path={obj.poster_path} title={obj.title} rating={obj.rating} />);
        })
        }
    </div>
  );
}

export default Forecast;
