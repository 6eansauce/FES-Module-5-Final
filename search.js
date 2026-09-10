// http://www.omdbapi.com/?apikey=aeff5dc2&

const moviesList = document.querySelector(".movies-list");
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
  const search = document.querySelector(".search");
  const value = localStorage.getItem("value");
  const moviesAPI = await fetch(
    `http://www.omdbapi.com/?apikey=aeff5dc2&s=${value}`,
  );
  const moviesArr = await moviesAPI.json();

  search.classList.add("search--loading");
  moviesList.innerHTML = moviesArr.Search.map((movie) =>
    getMovieHTML(movie),
  ).join("");

  setTimeout(() => {
    search.classList.remove("search--loading");
  }, 1000);
};

const getMovieHTML = (movie) => {
  return `
  <li class="movie">
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

const filterMovies = () => {
  const filter = document.getElementById("filter");
  const value = filter.value;
  const movies = Array.from(document.querySelectorAll(".movie"));

  if (value === "ALPHABETICAL") {
    movies.sort((a, b) => {
      const titleA = a
        .querySelector(".movie__title")
        .textContent.toLocaleLowerCase();
      const titleB = b
        .querySelector(".movie__title")
        .textContent.toLocaleLowerCase();
      return titleA.localeCompare(titleB);
    });
  } else if (value === "LATEST") {
    movies.sort((a, b) => {
      const yearA = parseInt(a.querySelector(".movie__year").textContent);
      const yearB = parseInt(b.querySelector(".movie__year").textContent);
      return yearB - yearA;
    });
  }

  moviesList.innerHTML = "";
  movies.forEach((movie) => {
    moviesList.appendChild(movie);
  });
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