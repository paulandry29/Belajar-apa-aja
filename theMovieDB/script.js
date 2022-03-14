const key = '5f3ce09c26fa3b69db25670561cad50e';
const url = 'https://api.themoviedb.org/3/movie/';
const movieID = 414906;
const btnEl = document.getElementById('btn');
const contentEl = document.getElementById('content');

function getDetailMovie(){
    fetch(url + 
            movieID + 
            '?api_key=' + key + 
            '&language=en-US')
    .then(Response => Response.json())
    .then(data => {
        console.log(data)
        contentEl.innerHTML = '<h2>' + data.original_title + '</h2><br>' + data.overview
    })
}

btnEl.addEventListener('click', () => {
    getDetailMovie()
})

