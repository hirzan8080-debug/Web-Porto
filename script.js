const projects = [
  {
    title: "IBM Project",
    tags: ["html", "css", "js"],
    description:
      "Make a website design with IBM Bob and support by AI Agent.",
  },
  {
    title: "Study landing page",
    tags: ["html", "css"],
    description:
      "A one-page layout for a class assignment: hero, features, and a clear call to action.",
  },
  {
    title: "Task board",
    tags: ["js", "html"],
    description:
      "A small JavaScript board to add, complete, and filter daily study tasks in the browser.",
  },
];

const grid = document.getElementById("project-grid");
const year = document.getElementById("year");
const toggle = document.querySelector(".nav-toggle");
const nav = document.getElementById("site-nav");
const form = document.getElementById("contact-form");
const status = document.getElementById("form-status");

year.textContent = new Date().getFullYear();

function renderProjects(filter) {
  const list =
    filter === "all" ? projects : projects.filter((item) => item.tags.includes(filter));

  grid.innerHTML = list
    .map(
      (item) => `
      <article class="project-card">
        <h3>${item.title}</h3>
        <p>${item.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}</p>
        <p>${item.description}</p>
      </article>
    `
    )
    .join("");
}

renderProjects("all");

document.querySelectorAll("[data-filter]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll("[data-filter]").forEach((el) => el.classList.remove("is-active"));
    button.classList.add("is-active");
    renderProjects(button.dataset.filter);
  });
});

toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("is-open");
  toggle.setAttribute("aria-expanded", String(open));
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  });
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(form);
  status.textContent = `Thanks, ${data.get("name")}. Your note is saved on this page (demo form).`;
  form.reset();
});
