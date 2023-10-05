const URL_PATH = "https://api.themoviedb.org";
const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzOTA5ZDYyODYxYTVlYjQ2MWVjMWY5NGUzZjhhNDA4ZCIsInN1YiI6IjY0OTBjZGM2MmY4ZDA5MDBjNjY3MTI0ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5B9-ntT3wmN3VIQxa5ukgcUBn4eMit-HezUgIakHkcY'
    }
  };

  const searchMovie = async () => {
    const textSearch = document.getElementById('search-movie').value;
    
    if (textSearch.length < 3) { return; }

    const movies = await getMovies(textSearch)

    let  html = "";
    movies.forEach(movie => {
        const {id,title,poster_path,overview } = movie;
        const urlMoreInfo = `../movie.html?id=${id}`;
        const urlImage = `https://image.tmdb.org/t/p/w500${poster_path}`;
       
        html += `
            <div class ="col-4 custom-card">
                <div class ="card">
                    <div class ="row no-gutters">
                        <div class ="col-md-4">
                        <img src="${urlImage}"  class = "card-img" alt="${title}">
                        </div>
                        <div class="col-md-8" >
                            <div class ="card-body">    
                                <h5 class ="card-title">${title}</h5>
                                <p class ="card-text">${overview.substr(0,40)}...</p>
                                <a href ="${urlMoreInfo}" class ="btn btn-primary">Ver más</a>
                            </div>    
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
    document.getElementsByClassName('list-card')[0].innerHTML = html;
  }

  const getMovies = (textSearch) => {
    const url = `${URL_PATH}/3/search/movie?query=${textSearch}&include_adult=true&language=es-ES&page=1`;
  

  return fetch (url, options)
    .then(response => response.json())
    .then(result => result.results)
    .catch(error => console.console.log(error))

}
