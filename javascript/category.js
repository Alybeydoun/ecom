document.querySelectorAll(".category-container").forEach((container) => {
  container.addEventListener("click", function () {
    this.parentElement.classList.toggle("open");
  });
});
