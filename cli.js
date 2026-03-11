const outputEl = document.getElementById("output");
const inputEl = document.getElementById("cmdInput");

const links = {
  github: "https://github.com/DNestor95",
  linkedin: "https://www.linkedin.com/in/daniel-nestor-b3685a151/",
  vote4: "https://github.com/DNestor95/Vote4",
  dealmaker: "https://github.com/DNestor95/DealMaker",
  resume: "Resume 1-30.pdf",
  contact: "mailto:danielnestor95@gmail.com",
  app: "portal.html"
};

const pages = {
  about: [
    "Daniel Nestor",
    "Software developer focused on data-driven products, applied math, and machine learning systems.",
    ""
  ],
  tdil: [
    "TDIL:",
    "- Build notes and implementation lessons",
    "- type: cat tdil",
    ""
  ],
  projects: [
    "Projects:",
    "- Vote4     -> type: open vote4",
    "- DealMaker -> type: open dealmaker",
    ""
  ],
  resume: [
    "Resume:",
    "- PDF available",
    "- type: open resume",
    ""
  ],
  contact: [
    "Contact:",
    "- Email: danielnestor95@gmail.com",
    "- type: open contact",
    ""
  ],
  app: [
    "App Access:",
    "- Login / register portal",
    "- type: open app",
    ""
  ]
};

function printLine(text = "") {
  const line = document.createElement("div");
  line.className = "line";
  line.textContent = text;
  outputEl.appendChild(line);
}

function printHelp() {
  [
    "Commands:",
    "help                    show this help",
    "about                   show about info",
    "projects                list projects",
    "tdil                    show tdil info",
    "resume                  show resume info",
    "contact                 show contact info",
    "app                     show app portal info",
    "ls                      list sections",
    "cat <section>           print section (about/tdil/projects/resume/contact/app)",
    "open <target>           open link (github/linkedin/vote4/dealmaker/resume/contact/app)",
    "clear                   clear screen",
    "date                    show date",
    "time                    show time",
    ""
  ].forEach(printLine);
}

function runCommand(raw) {
  const input = raw.trim();
  if (!input) return;

  printLine(`> ${input}`);

  const [cmd, arg] = input.split(/\s+/, 2);

  if (cmd === "help") {
    printHelp();
    return;
  }

  if (cmd === "about" || cmd === "tdil" || cmd === "projects" || cmd === "resume" || cmd === "contact" || cmd === "app") {
    pages[cmd].forEach(printLine);
    return;
  }

  if (cmd === "ls") {
    printLine("about tdil projects resume contact app");
    printLine();
    return;
  }

  if (cmd === "cat") {
    if (!arg || !pages[arg]) {
      printLine("Unknown section. Use: cat about|tdil|projects|resume|contact|app");
      printLine();
      return;
    }
    pages[arg].forEach(printLine);
    return;
  }

  if (cmd === "open") {
    if (!arg || !links[arg]) {
      printLine("Unknown target. Use: open github|linkedin|vote4|dealmaker|resume|contact|app");
      printLine();
      return;
    }
    window.open(links[arg], "_blank", "noopener,noreferrer");
    printLine(`Opened: ${arg}`);
    printLine();
    return;
  }

  if (cmd === "clear") {
    outputEl.innerHTML = "";
    return;
  }

  if (cmd === "date") {
    printLine(new Date().toDateString());
    printLine();
    return;
  }

  if (cmd === "time") {
    printLine(new Date().toLocaleTimeString());
    printLine();
    return;
  }

  printLine("Command not found. Type: help");
  printLine();
}

function boot() {
  printLine("Daniel Nestor Terminal Site");
  printLine("Type 'help' to see commands.");
  printLine();

  const params = new URLSearchParams(window.location.search);
  const start = params.get("cmd");
  if (start) runCommand(start);
}

inputEl.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    runCommand(inputEl.value);
    inputEl.value = "";
  }
});

boot();
inputEl.focus();
