const URL_PATH = "https://api.themoviedb.org";
const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzOTA5ZDYyODYxYTVlYjQ2MWVjMWY5NGUzZjhhNDA4ZCIsInN1YiI6IjY0OTBjZGM2MmY4ZDA5MDBjNjY3MTI0ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5B9-ntT3wmN3VIQxa5ukgcUBn4eMit-HezUgIakHkcY'
    }
  };
let MOVIE_ID = "";

document.addEventListener("DOMContentLoaded", () => {
    
    MOVIE_ID = getUrlVars().id;
    renderMovieDetails(MOVIE_ID)
})

const getUrlVars = () => {
   
    let = vars = {};
    window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value;
    })
    return vars;
}

const getMovieDetails = (movieId) => {
 

      const url = `${URL_PATH}/3/movie/${movieId}?language=es-ES`;
      
    return fetch(url, options)
        .then(response => response.json())
        .then(result => result)
        .catch(error => console.error(error));
}

const renderMovieDetails = async (movieId) => {
    const movieDetails = await  getMovieDetails(movieId);
    const { backdrop_path,poster_path, title, overview, genres, release_date } = movieDetails;
    renderBackground(backdrop_path);
    renderPoster(poster_path, title);
    renderMoviedata(title, overview, genres, release_date);
    getTeaser(movieId);
}

const renderBackground = (backdrop_path) => {
    const urlBackground = `https://image.tmdb.org/t/p/original${backdrop_path}`;
    document.getElementsByClassName('movie-info')[0].style.backgroundImage =`url(${urlBackground})`
}

const renderPoster = (poster_path, title) => {
    const urlPoster = `https://image.tmdb.org/t/p/original${poster_path}`;
    const html = `<img src = "${urlPoster}" class = "img-fluid movie-info__poster-img" alt = ${title}/>`;
    document.getElementsByClassName('movie-info__poster')[0].innerHTML = html;
}

const renderMoviedata = (title, overview, genres, release_date) => {
    const date = release_date.split('-');

    let htmlGenres = "";
    genres.forEach(genre => {
        htmlGenres += `<li>${genre.name}</li>`;
    });

    const html = `
        <h1>${title}
            <span class = "date-any">${date[0]}</span>
            <span class = "teaser" data-toggle="modal" data-target="#video-teaser">
                <i class="fa-solid fa-play"></i>
            Ver trailer
            </span>
        </h1>
        <h5>General</h5>
        <p>${overview}</p>
        <ul>
            ${htmlGenres}
        <ul/>
    `;
    document.getElementsByClassName("movie-info__data")[0].innerHTML = html ;
}

const getTeaser = (movieId) => {
    const url = `${URL_PATH}/3/movie/${movieId}/videos?language=en-US`; 
    
    fetch(url,options)
    .then(response => response.json())
    .then(resutl => {renderTeaser(resutl)})
    .catch(error => console.log(error))
}

const renderTeaser = (objVideo) => {
    let keyVideo = "";
    objVideo.results.forEach(video => {
        if (video.type === "Trailer" && video.site ==="YouTube" && video.official===true) {
            keyVideo = video.key;
        }
        /* if (video.official===true && video.type === "Teaser") {
            keyVideo = video.key;
        } */
    });

    let urlIframe = "";
    if (keyVideo !== "") {
        urlIframe = `
        <iframe width="100%" height="440px" src="https://www.youtube.com/embed/${keyVideo}"
        frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media;
         gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        `;
    }
    else {
        urlIframe = "<div class = 'no-teaser'> La película no tiene trailer</div>";
    }
    document.getElementsByClassName('video-teaser-iframe')[0].innerHTML = urlIframe;
}

