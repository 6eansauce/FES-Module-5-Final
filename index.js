const searchbar = document.getElementById("searchbar");

searchbar.addEventListener("submit", (event) => {
  event.preventDefault();

  const searchbarInput = document.getElementById("searchbarInput");
  localStorage.setItem("value", searchbarInput.value);

  window.location.href = `${window.location.origin}/search.html`;
});

const openModal = () => {
  const modal = document.getElementById("modal");
  modal.showModal();
};

const closeModal = () => {
  const modal = document.getElementById("modal");
  modal.close();
};
