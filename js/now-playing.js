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
    let {page} = getUrlVars();
    page == undefined ? page = 1 : null;
    renderNewsMovies(page);
    renderControl(page);
});

const getUrlVars = () => {
   
    let = vars = {};
    window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value;
    })
    return vars;
}

const getNewsMovies = (page) => {
    const url = `${URL_PATH}/3/movie/now_playing?language=es-ES&page=${page}`;

    return fetch(url,options)
    .then(response => response.json())
    .then(resutl => resutl.results)
    .catch(error => console.log(error))
}


const renderNewsMovies = async (page) => {
    const movies = await getNewsMovies(page);
    
    let = html = "";
    movies.forEach(movie => {
        console.log(movie)
        const {id, title, poster_path} = movie;
        const urlImage = `https://image.tmdb.org/t/p/w500${poster_path}`;
        const urlMovie = `../movie.html?id=${id}`;

        html += `
            <div class = "col-3 col-custom">
                <a href = "${urlMovie}" class = "card custom-card">
                    <img src = "${urlImage}" class = "card-img-top" alt = "${title}">
                    <div class = "card-body">
                        <h4 class = "card-title text-center m-0">${title}</h4>
                    </div>
                </a>
            </div>
        `;
    });
    document.getElementsByClassName('list-cards')[0].innerHTML = html;
}

const renderControl = (page) => {
    const baseUrlPage = "../now-playing.html?page=";
    const pageNumber = parseInt(page);
    const previus = pageNumber - 1;
    const next = pageNumber + 1;

    let html = "";

    if (page == 1){
    html = `
            <ul class = "pagination justify-content-center">
                <li class ="page-item disable">
                    <a class ="page-link" href = "#">
                        <i class= "fas fa-chevron-left"></i>
                    </a>            
                </li>
                <li class = "page-item active">
                    <a class ="page-link" href ="${baseUrlPage + "1"}">1</a>
                </li>
                <li class = "page-item ">
                    <a class ="page-link" href ="${baseUrlPage + "2"}">2</a>
                </li>
                <li class = "page-item ">
                    <a class ="page-link" href ="${baseUrlPage + "3"}">3</a>
                </li>
                <li class = "page-item ">
                    <a class ="page-link" href ="${baseUrlPage + "4"}">
                        <i class ="fas fa-chevron-right"></i>
                    </a>
                </li>
            </ul>
        `;
    } else {
        html = `
            <ul class = "pagination justify-content-center">
                <li class ="page-item disable">
                    <a class ="page-link" href = "${baseUrlPage + previus}">
                        <i class= "fas fa-chevron-left"></i>
                    </a>            
                </li>
                <li class = "page-item ">
                    <a class ="page-link" href ="${baseUrlPage + previus}">${previus}</a>
                </li>
                <li class = "page-item active ">
                    <a class ="page-link" href ="${baseUrlPage + page}">${page}</a>
                </li>
                <li class = "page-item ">
                    <a class ="page-link" href ="${baseUrlPage + next}">${next}</a>
                </li>
                <li class = "page-item ">
                    <a class ="page-link" href ="${baseUrlPage + next}">
                        <i class ="fas fa-chevron-right"></i>
                    </a>
                </li>
            </ul>
        `;
    }
    document.getElementsByClassName('navigation')[0].innerHTML = html;

}

/* const renderControl = (page) => {
    const baseUrlPage = "../now-playing.html?page=";
    const pageNumber = parseInt(page);
    const previus = pageNumber - 1;
    const next = pageNumber + 1;
    const totalPages = 4; // Cambiar al número total de páginas

    let html = `
        <ul class="pagination justify-content-center">
            <li class="page-item ${page === 1 ? 'disabled' : ''}">
                <a class="page-link" href="${page === 1 ? '#' : baseUrlPage + previus}">
                    <i class="fas fa-chevron-left"></i>
                </a>            
            </li>
    `;

    for (let i = 1; i <= totalPages; i++) {
        html += `
            <li class="page-item ${i === pageNumber ? 'active' : ''}">
                <a class="page-link" href="${baseUrlPage + i}">${i}</a>
            </li>
        `;
    }

    html += `
            <li class="page-item ${page === totalPages ? 'disabled' : ''}">
                <a class="page-link" href="${page === totalPages ? '#' : baseUrlPage + next}">
                    <i class="fas fa-chevron-right"></i>
                </a>
            </li>
        </ul>
    `;

    document.getElementsByClassName('navigation')[0].innerHTML = html;
} */