const header = document.querySelector("[data-header]");
const navLinks = [...document.querySelectorAll(".main-nav a[href^='#']")];
const revealTargets = [
  ".intro",
  ".showreel",
  ".section-head",
  ".work-card",
  ".member-card",
  ".service-row",
  ".price-card",
  ".contact-copy",
  ".contact-form",
  ".site-footer",
];
const root = document.documentElement;
let scrollFrame = null;

const updateHeader = () => {
  header.classList.toggle("is-scrolled", window.scrollY > 12);
};

const updateScrollGradient = () => {
  const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
  const progress = Math.min(window.scrollY / maxScroll, 1);
  const wave = Math.sin(progress * Math.PI * 2);

  root.style.setProperty("--scroll-progress", progress.toFixed(4));
  root.style.setProperty("--gradient-x", `${(progress * 220 - 80).toFixed(2)}px`);
  root.style.setProperty("--gradient-y", `${(wave * 90).toFixed(2)}px`);
  root.style.setProperty("--gradient-rotate", `${(progress * 46).toFixed(2)}deg`);
  root.style.setProperty("--accent-hue", `${(progress * 18).toFixed(2)}deg`);
  scrollFrame = null;
};

const requestScrollGradientUpdate = () => {
  if (scrollFrame) return;
  scrollFrame = requestAnimationFrame(updateScrollGradient);
};

updateHeader();
updateScrollGradient();
window.addEventListener(
  "scroll",
  () => {
    updateHeader();
    requestScrollGradientUpdate();
  },
  { passive: true }
);
window.addEventListener("resize", requestScrollGradientUpdate);

document.querySelectorAll("a[href^='#']").forEach((link) => {
  link.addEventListener("click", (event) => {
    const target = document.querySelector(link.getAttribute("href"));

    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });

    if (link.hash) {
      history.pushState(null, "", link.hash);
    }
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    });
  },
  { rootMargin: "0px 0px -12% 0px", threshold: 0.16 }
);

revealTargets.forEach((selector) => {
  document.querySelectorAll(selector).forEach((element, index) => {
    element.dataset.reveal = "";
    element.dataset.revealDelay = String(Math.min(index % 4, 3));
    revealObserver.observe(element);
  });
});

const sectionObserver = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visible) return;

    navLinks.forEach((link) => {
      link.classList.toggle("is-active", link.getAttribute("href") === `#${visible.target.id}`);
    });
  },
  { rootMargin: "-24% 0px -54% 0px", threshold: [0.12, 0.4, 0.72] }
);

navLinks.forEach((link) => {
  const section = document.querySelector(link.getAttribute("href"));
  if (section) sectionObserver.observe(section);
});

document.querySelector(".reel-button")?.addEventListener("click", () => {
  alert("Здесь будет открываться showreel: видео-фрагменты спектаклей, афиши и фестивальные отметки.");
});
