const parseData = (data) => {
    let parsedData = [];
    for (let dataPoint of data.results){
        parsedData.push({
            poster_path: dataPoint.poster_path,
            title: dataPoint.title,
            rating: dataPoint.vote_average
        })
    }
    return parsedData;
}

function chunkArray(array, size) {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  }

export { parseData, chunkArray };
