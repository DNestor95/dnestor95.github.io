const page = document.body.dataset.page;
const navLinks = document.querySelectorAll(".site-nav a");
const themeToggle = document.getElementById("themeToggle");

const savedTheme = localStorage.getItem("theme");
if (savedTheme === "light") {
  document.body.dataset.theme = "light";
}

if (themeToggle) {
  const updateLabel = () => {
    const isLight = document.body.dataset.theme === "light";
    themeToggle.textContent = isLight ? "theme: light" : "theme: dark";
  };

  updateLabel();
  themeToggle.addEventListener("click", () => {
    const isLight = document.body.dataset.theme === "light";
    if (isLight) {
      delete document.body.dataset.theme;
      localStorage.setItem("theme", "dark");
    } else {
      document.body.dataset.theme = "light";
      localStorage.setItem("theme", "light");
    }
    updateLabel();
  });
}

navLinks.forEach((link) => {
  if (link.dataset.page === page) {
    link.classList.add("active");
  }
});

const sectionLinks = document.querySelectorAll(".site-nav a[data-section]");
const sections = [...sectionLinks]
  .map((link) => document.querySelector(link.dataset.section))
  .filter(Boolean);

if (sections.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const matchingLink = document.querySelector(
          `.site-nav a[data-section="#${entry.target.id}"]`
        );
        if (!matchingLink) return;

        sectionLinks.forEach((link) => link.classList.remove("active"));
        matchingLink.classList.add("active");
      });
    },
    { rootMargin: "-45% 0px -40% 0px", threshold: 0.01 }
  );

  sections.forEach((section) => observer.observe(section));
}

const revealItems = document.querySelectorAll(".fade-in");
if (revealItems.length) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  revealItems.forEach((el) => revealObserver.observe(el));
}