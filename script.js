const header = document.querySelector("[data-header]");

const updateHeader = () => {
  header.classList.toggle("is-scrolled", window.scrollY > 12);
};

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

document.querySelector(".reel-button")?.addEventListener("click", () => {
  alert("Здесь будет открываться showreel: видео-фрагменты спектаклей, афиши и фестивальные отметки.");
});
