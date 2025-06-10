import React from "react";
import ReactDOM from "react-dom";
import "./LoadMore.css"

function LoadMore({onLoadMore}) {

    const handleClick = () => {
        onLoadMore();
    };

    //props: poster_path, title, rating
  return (
    <div className="load-more">
        <button onClick={handleClick} className="load-more-button">Load More</button>
    </div>
  );
}



export default LoadMore;
