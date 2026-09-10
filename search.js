// http://www.omdbapi.com/?apikey=aeff5dc2&

const searchbar = document.getElementById("searchbar");

searchbar.addEventListener("submit", (event) => {
  event.preventDefault();

  const searchbarInput = document.getElementById("searchbarInput");
  localStorage.setItem("value", searchbarInput.value);

  renderMovies();
});

const main = () => {
  const value = localStorage.getItem("value");
  if (value) renderMovies();
};

const renderMovies = async () => {
  const value = localStorage.getItem("value");
  const moviesAPI = await fetch(
    `http://www.omdbapi.com/?apikey=aeff5dc2&s=${value}`,
  );
  const moviesArr = await moviesAPI.json();

  const moviesList = document.querySelector(".movies-list");
  moviesList.innerHTML = moviesArr.Search.map((movie) =>
    getMovieHTML(movie),
  ).join("");
};

const getMovieHTML = (movie) => {
  return `<li class="movie">
    <div class="movie__poster">
      <img class="img" src="${movie.Poster}" />
    </div>

    <div class="movie__info">
      <h3 class="movie__title">${movie.Title}</h3>
      <h4 class="movie__year">${movie.Year}</h4>
    </div>
  </li>
  `;
};

const openModal = () => {
  const modal = document.getElementById("modal");
  modal.showModal();
};

const closeModal = () => {
  const modal = document.getElementById("modal");
  modal.close();
};

main();
