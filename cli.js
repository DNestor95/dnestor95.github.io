const outputEl = document.getElementById("output");
const inputEl = document.getElementById("cmdInput");

function focusInput() {
  inputEl.focus();
  const len = inputEl.value.length;
  inputEl.setSelectionRange(len, len);
}

const links = {
  GITHUB: "https://github.com/DNestor95",
  LINKEDIN: "https://www.linkedin.com/in/daniel-nestor-b3685a151/",
  WEBSITE: "https://github.com/DNestor95/dnestor95.github.io",
  DEALMAKER: "https://github.com/DNestor95/DealMaker",
  RESUME: "Resume 1-30.pdf",
  CONTACT: "mailto:me@dnestor95.com",
  APP: "portal.html"
};

function print(text = "") {
  const line = document.createElement("div");
  line.className = "line";
  line.textContent = text;
  outputEl.appendChild(line);
}

function printPromptMarker() {
  print("> _");
}

function renderHeader() {
  print("Daniel Nestor Portfolio System v1.4356.8");
  print("Type HELP for commands.");
  print();
}

function help() {
  [
    "Daniel Nestor Portfolio System v1.4356.8",
    "--------------------------------",
    "",
    "SYSTEM COMMANDS",
    "--------------------------------",
    "",
    "ABOUT",
    "    Information about Daniel Nestor",
    "    Background, education, and experience",
    "",
    "PROJECTS",
    "    Opens the projects directory",
    "    Lists applications and experiments",
    "",
    "RESUME",
    "    View professional resume",
    "",
    "CONTACT",
    "    Email and links",
    "",
    "",
    "DEVELOPMENT",
    "--------------------------------",
    "",
    "WEBSITE",
    "    Personal portfolio website repository",
    "",
    "DEALMAKER",
    "    Machine learning + analytics work repository",
    "",
    "TOOLS",
    "    Development utilities and scripts",
    "",
    "LAB",
    "    Experimental projects",
    "",
    "",
    "FUN / DEMOS",
    "--------------------------------",
    "",
    "DEMO",
    "    Run graphics demo",
    "",
    "ASCII",
    "    ASCII graphics experiments",
    "",
    "FRACTAL",
    "    Mandelbrot renderer",
    "",
    "",
    "SYSTEM",
    "--------------------------------",
    "",
    "HELP",
    "    Display this screen",
    "",
    "CLEAR",
    "    Clear terminal screen",
    "",
    "REBOOT",
    "    Restart system",
    "",
    "",
    "--------------------------------",
    "",
    "Type a command and press ENTER",
    ""
  ].forEach(print);
  printPromptMarker();
}

function showAbout() {
  [
    "Daniel Nestor",
    "Thank you for visiting my site and I hope that you enjoy which ever view you decide to examine."
    ,"This site is to house the projects I work on, give my friends a login for the tools that we use sometimes",
    "and to have a place to experiment and learn new things.",
    "Again, thank you for visiting and I hope you find something interesting here as I continue to add more fun things!"
    

  ].forEach(print);
  printPromptMarker();
}

function showProjects() {
  [
    "Projects",
    "- Website   (type: OPEN WEBSITE)",
    "- DealMaker (type: OPEN DEALMAKER)",
    ""
  ].forEach(print);
  printPromptMarker();
}

function showResume() {
  [
    "Resume",
    "type: OPEN RESUME",
    ""
  ].forEach(print);
  printPromptMarker();
}

function showContact() {
  [
    "Contact",
    "Email: me@dnestor95.com",
    "type: OPEN CONTACT",
    ""
  ].forEach(print);
  printPromptMarker();
}

function showTdil() {
  [
    "TDIL",
    "Build notes and implementation lessons.",
    ""
  ].forEach(print);
  printPromptMarker();
}

function demoAscii() {
  [
    "  /\\\\\\\\",
    " /  __  \\\\",
    "|  /  \\  |",
    "| | () | |",
    "|  \\__/  |",
    " \\______//",
    ""
  ].forEach(print);
  printPromptMarker();
}

function demoFractal() {
  [
    "..::..::::::....::::::..::..",
    ".::..:::.::..::::..::.:::..::",
    "::..::::::..::..::..::::::..:",
    ".:::..::..::::..::::..::..::.",
    ""
  ].forEach(print);
  printPromptMarker();
}

function handleCommand(raw) {
  const input = raw.trim();
  if (!input) return;

  print(`> ${input}`);

  const [rawCmd, rawArg] = input.split(/\s+/, 2);
  const cmd = rawCmd.toUpperCase();
  const arg = rawArg ? rawArg.toUpperCase() : "";

  if (cmd === "HELP") return help();
  if (cmd === "CLEAR") {
    outputEl.innerHTML = "";
    renderHeader();
    printPromptMarker();
    return;
  }
  if (cmd === "LS") {
    print("ABOUT TDIL PROJECTS RESUME CONTACT APP WEBSITE DEALMAKER TOOLS LAB DEMO ASCII FRACTAL");
    print();
    printPromptMarker();
    return;
  }
  if (cmd === "DATE") {
    print(new Date().toDateString());
    print();
    printPromptMarker();
    return;
  }
  if (cmd === "TIME") {
    print(new Date().toLocaleTimeString());
    print();
    printPromptMarker();
    return;
  }
  if (cmd === "ABOUT") {
    showAbout();
    return;
  }
  if (cmd === "PROJECTS") {
    showProjects();
    return;
  }
  if (cmd === "TDIL") {
    showTdil();
    return;
  }
  if (cmd === "RESUME") {
    showResume();
    return;
  }
  if (cmd === "CONTACT") {
    showContact();
    return;
  }
  if (cmd === "APP") {
    print("App Access");
    print("type: OPEN APP");
    print();
    printPromptMarker();
    return;
  }
  if (cmd === "WEBSITE") {
    print("WEBSITE");
    print("Personal portfolio website");
    print("Repository: OPEN WEBSITE");
    print();
    printPromptMarker();
    return;
  }
  if (cmd === "DEALMAKER" || cmd === "DEALMKAER" || cmd === "DATA") {
    print("DEALMAKER");
    print("Machine learning + analytics work");
    print("Repository: OPEN DEALMAKER");
    print();
    printPromptMarker();
    return;
  }
  if (cmd === "TOOLS") {
    print("TOOLS");
    print("Development utilities and scripts");
    print("Try: DATE, TIME, CLEAR, REBOOT");
    print();
    printPromptMarker();
    return;
  }
  if (cmd === "LAB") {
    print("LAB");
    print("Experimental projects and prototypes");
    print("Try: DEMO, ASCII, FRACTAL");
    print();
    printPromptMarker();
    return;
  }
  if (cmd === "DEMO") {
    print("Running demo...");
    demoAscii();
    return;
  }
  if (cmd === "ASCII") {
    demoAscii();
    return;
  }
  if (cmd === "FRACTAL") {
    print("Mandelbrot renderer (preview)");
    demoFractal();
    return;
  }
  if (cmd === "REBOOT") {
    outputEl.innerHTML = "";
    boot();
    return;
  }

  if (cmd === "CAT") {
    const route = {
      ABOUT: showAbout,
      TDIL: showTdil,
      PROJECTS: showProjects,
      RESUME: showResume,
      CONTACT: showContact,
      APP: () => {
        print("App Access");
        print("type: OPEN APP");
        print();
      }
    };
    if (!arg || !route[arg]) {
      print("Unknown section. Use: CAT ABOUT|TDIL|PROJECTS|RESUME|CONTACT|APP");
      print();
      printPromptMarker();
      return;
    }
    route[arg]();
    return;
  }

  if (cmd === "OPEN") {
    if (!arg || !links[arg]) {
      print("Unknown target. Use: OPEN GITHUB|LINKEDIN|WEBSITE|DEALMAKER|RESUME|CONTACT|APP");
      print();
      printPromptMarker();
      return;
    }
    window.open(links[arg], "_blank", "noopener,noreferrer");
    print(`Opened: ${arg}`);
    print();
    printPromptMarker();
    return;
  }

  print("Command not found. Type: help");
  print();
  printPromptMarker();
}

function boot() {
  renderHeader();
  printPromptMarker();

  const params = new URLSearchParams(window.location.search);
  const bootCmd = params.get("cmd");
  if (bootCmd) {
    handleCommand(bootCmd);
  }
}

inputEl.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    handleCommand(inputEl.value);
    inputEl.value = "";
  }
});

boot();
focusInput();

window.addEventListener("load", focusInput);
window.addEventListener("pageshow", focusInput);
document.addEventListener("visibilitychange", () => {
  if (!document.hidden) focusInput();
});
document.addEventListener("click", () => {
  if (document.activeElement !== inputEl) {
    focusInput();
  }
});
