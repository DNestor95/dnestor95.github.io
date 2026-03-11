(function () {
  const path = window.location.pathname.split("/").pop() || "index.html";

  const normalizeHref = (href) => {
    if (!href) return "";
    const clean = href.split("#")[0].split("?")[0];
    const file = clean.split("/").pop();
    return file || "index.html";
  };

  document.querySelectorAll(".icon-link, .left-pane .links a, .drive-link").forEach((el) => {
    const target = normalizeHref(el.getAttribute("href"));
    if (target === path) {
      el.classList.add("active");
    }
  });
})();
