document.addEventListener("DOMContentLoaded", function () {
  const observerOptions = {
    root: null,
    threshold: 0.6, // trigger when 60% of section is visible
    rootMargin: "0px",
  };

  const observer = new IntersectionObserver(changeLinks, observerOptions);

  // Observe all sections with class 'cont'
  const sections = document.querySelectorAll(".cont");
  sections.forEach((section) => observer.observe(section));

  function changeLinks(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.id;

        document.querySelectorAll("#items a").forEach((link) => {
          link.classList.remove("active");

          if (link.getAttribute("href") === "#" + id) {
            link.classList.add("active");
          }
        });
      }
    });
  }
});
