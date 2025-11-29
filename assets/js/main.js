// ********* HTML Input
const closeBtn = document.querySelector('#closeBtn');
const menuBtn = document.querySelector('#menuBtn');
const sidebarMenu = document.querySelector('#sidebarMenu');
const searchInput = document.querySelector('#searchInput');
const moviesContainer = document.querySelector('#moviesContainer');
const nowPlaying = document.querySelector('.nowPlaying');
const popular = document.querySelector('.popular');
const topRated = document.querySelector('.topRated');
const upcoming = document.querySelector('.upcoming');
const contactUs = document.querySelector('.contactUs');
const submitBtn = document.querySelector('#submitBtn');
const errorMsg = document.querySelector('#error');
const successMsg = document.querySelector('#success');

// ^ App Variables
const api_key = "a8d248c4b65c1ff47fc6dbacdc6f2cb0"; 
const base_url = "https://api.themoviedb.org/3";
const img_path = "https://image.tmdb.org/t/p/w185";
let typingTimer;
const typingDelay = 400;

// ^ Regex
const nameRegex = /^[A-Za-z]+$/;
const emailRegex = /^[A-Za-z0-9._%+-]{5,15}@[A-Za-z0-9.-]{5,15}\.com$/;
const phoneRegex = /^01[0|1|2|5][0-9]{8}$/;
const ageRegex = /^[1-9][0-9]?$/;
const passwordRegex = /^[A-Za-z0-9]{5,}$/;



// ********* Functions
// ! Side Menu
menuBtn.addEventListener('click', ()=> {
    sidebarMenu.classList.add('active');
});
closeBtn.addEventListener('click', ()=> {
    sidebarMenu.classList.remove('active');
});

// ! Load popular movies at first
getMovies(`${base_url}/movie/popular?api_key=${api_key}`);
async function getMovies(url) {
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
    showMovies(data.results);
}

// ! Show loaded movies
async function showMovies(movies) {
    moviesContainer.innerHTML = '';
    movies.forEach(movie => {
        const {title, poster_path} = movie;
        const movieCard = document.createElement('div');
        movieCard.classList.add('movieCard');
        movieCard.innerHTML += `
            <img src='${img_path + poster_path}' alt='${title}'>
            <div class="overlay">
                <h3 class="title text-center">${movie.title}</h3>
                <p class="desc">${movie.overview.slice(0, 200)}...</p>
                <span class="rating">⭐ ${movie.vote_average}</span>
            </div>
        `;
        moviesContainer.appendChild(movieCard);
    });
} 

// ! Searching
searchInput.addEventListener('input', () => {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(() => {
        const searchTerm = searchInput.value.trim();
        if(searchTerm == '') {
            getMovies(`${base_url}/movie/popular?api_key=${api_key}`);
        } else {
            getMovies(`${base_url}/search/movie?api_key=${api_key}&query=${searchTerm}`);
        }
    }, typingDelay);
});

// ! Validate
submitBtn.addEventListener("click", function (e) {
    e.preventDefault();

    const username = document.querySelector('#name').value.trim();
    const email = document.querySelector('#email').value.trim();
    const phone = document.querySelector('#phone').value.trim();
    const age = document.querySelector('#age').value.trim();
    const password = document.querySelector('#password').value.trim();

    if (!nameRegex.test(username)) {
        errorMsg.textContent = "❌ Username must contain only letters and numbers (min 5 characters).";
        return;
    }
    if (!phoneRegex.test(phone)) {
        errorMsg.textContent = "❌ Invalid mobile number.";
        return;
    }
    if (!passwordRegex.test(password)) {
        errorMsg.textContent = "❌ Password must contain only letters and numbers (min 5 characters).";
        return;
    }
    errorMsg.textContent = "";
    successMsg.textContent = "✅ All inputs are valid!";
});


// ? Show Now playing movies
nowPlaying.addEventListener('click', () => {
    getMovies(`${base_url}/movie/now_playing?api_key=${api_key}`);
})
// ? Show Popular movies
popular.addEventListener('click', () => {
    getMovies(`${base_url}/movie/popular?api_key=${api_key}`);
})
// ? Show Top rated movies
topRated.addEventListener('click', () => {
    getMovies(`${base_url}/movie/top_rated?api_key=${api_key}`);
})
// ? Show Upcoming movies
topRated.addEventListener('click', () => {
    getMovies(`${base_url}/movie/upcoming?api_key=${api_key}`);
})