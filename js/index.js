
const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzOTA5ZDYyODYxYTVlYjQ2MWVjMWY5NGUzZjhhNDA4ZCIsInN1YiI6IjY0OTBjZGM2MmY4ZDA5MDBjNjY3MTI0ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5B9-ntT3wmN3VIQxa5ukgcUBn4eMit-HezUgIakHkcY'
    }
  };

  document.addEventListener("DOMContentLoaded", () => {
    renderNewMovies();
    renderPopularMovies();
    renderTopRatedMovies();
})

const getMovies = (type) => {
  
  const url = `https://api.themoviedb.org/3/movie/${type}?language=es-ES&page=1`;

  return fetch(url, options)
      .then(response => response.json())
      .then(result => result.results)
      .catch(error => console.error(error)); 
}

const renderNewMovies = async () => {
    const newMovies = await getMovies('now_playing');

    let html = '';

    newMovies.forEach((movie, index) => {
        const {id, title, overview,backdrop_path} = movie;
        const urlImage = `https://image.tmdb.org/t/p/original${backdrop_path}`;
        const urlMovie = `../movie.html?id=${id}`;

        html +=`
        <div class="carousel-item ${index === 0 ? "active" : null}" style="background-image: url('${urlImage}')">
        
          <div class = "carousel-caption">
          <h5>${title}</h5>
          <p>${overview}</p>
          <a href = "${urlMovie}" class = "btn btn-primary"> Mas Informacion</a>
          </div>
        </div>
        `;
        html +=`
        <a class="carousel-control-prev" href="#carousel-news-movies" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Anterior</span>
        </a>
        <a class="carousel-control-next" href="#carousel-news-movies" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Siguiente</span>
        </a>
        `;
    });
    document.getElementsByClassName('list-news-movies')[0].innerHTML = html;
};

const renderPopularMovies = async () =>  {
  const popularMovies = await getMovies('popular');
  renderMovieList(popularMovies,'now-playing__list');
}

const renderTopRatedMovies = async () => {
  const movies = await getMovies('top_rated');
  renderMovieList(movies,'top-rated-playing__list');
}

const renderMovieList = (movies,targetClassName) => { 
  let  html = '';

  movies.slice(0, 5).forEach(movie => {
    const {id,title,poster_path} = movie;
    const movieCover = `https://image.tmdb.org/t/p/w500${poster_path}`;
    const urlMovie = `../movie.html?id=${id}`;

      html += `
        <li class = "list-group-item">
          <img src = "${movieCover}" alt = "${title}">
            <h3>${title}</h3>
            <a href="${urlMovie}"class ="btn-primary btn-style" > Ver Más</a>
        </li>
      `;
  });

  document.getElementsByClassName(targetClassName)[0].innerHTML = html;
};

