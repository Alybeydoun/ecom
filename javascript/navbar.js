const hamburger = document.getElementById("hamburger");
const itemsContainer = document.querySelector(".items-container");

hamburger.addEventListener("click", () => {
  itemsContainer.classList.toggle("show");
});
