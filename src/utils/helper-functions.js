const parseData = (data) => {
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


export { parseData};
