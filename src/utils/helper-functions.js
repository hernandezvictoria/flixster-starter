const parseDataForCard = (data) => {
    let parsedData = [];
    for (let dataPoint of data){
        parsedData.push({
            poster_path: dataPoint.poster_path,
            title: dataPoint.title,
            rating: dataPoint.vote_average
        })
    }
    return parsedData;
}

const parseDataForModal = (data, title) => {
    for (let dataPoint of data){
        if (dataPoint.title === title){
            return ({
                id: dataPoint.id,
                title: dataPoint.title,
                backdrop_path: dataPoint.backdrop_path,
                release_date: dataPoint.release_date,
                overview: dataPoint.overview,
                genre_ids: dataPoint.genre_ids,
                video: dataPoint.video
            })
        }
    }
}


export { parseDataForCard, parseDataForModal };
