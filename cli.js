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
  APP: "portal.html",
  HOME: "index.html"
};

const TDIL_DRAFTS_KEY = "dnestor.tdilDrafts";
let pendingTdil = null;

function print(text = "") {
  const line = document.createElement("div");
  line.className = "line";
  line.textContent = text;
  outputEl.appendChild(line);
  outputEl.scrollTop = outputEl.scrollHeight;
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
    "TDIL",
    "    Show Today Daniel/I Learned entries",
    "",
    "TDIL ADD <tag> <entry>",
    "    Draft a new TDIL entry and print the local save command",
    "",
    "ADD TDIL <title>",
    "    Start a guided TDIL draft",
    "",
    "TIL <tag> <entry>",
    "    Short version of TDIL ADD",
    "",
    "TDIL DRAFTS",
    "    Show TDIL drafts saved in this browser",
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

function readTdilDrafts() {
  try {
    const drafts = JSON.parse(localStorage.getItem(TDIL_DRAFTS_KEY) || "[]");
    return Array.isArray(drafts) ? drafts : [];
  } catch {
    return [];
  }
}

function saveTdilDraft(draft) {
  const drafts = readTdilDrafts();
  drafts.unshift(draft);
  try {
    localStorage.setItem(TDIL_DRAFTS_KEY, JSON.stringify(drafts.slice(0, 20)));
    return true;
  } catch {
    return false;
  }
}

function shellQuote(value) {
  return '"' + value.replace(/(["\\$`])/g, "\\$1") + '"';
}

function localDateString(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function validateDate(date) {
  return /^\d{4}-\d{2}-\d{2}$/.test(date) && !Number.isNaN(new Date(date + "T00:00:00Z").getTime());
}

function formatTdilPublishCommand(draft) {
  return `npm run tdil -- --date ${draft.date} --tag ${shellQuote(draft.tag)} ${shellQuote(draft.entry)}`;
}

function finishTdilDraft(draft) {
  const saved = saveTdilDraft(draft);
  print(saved ? "TDIL draft saved in this browser." : "TDIL draft created for this command.");
  print("Run this from the repo to publish it:");
  print(formatTdilPublishCommand(draft));
  print();
  print("Type TDIL to see saved drafts and published entries.");
  print("Then commit and push tdil.json when you publish locally.");
  print();
  printPromptMarker();
}

function renderTdilEntries(entries, drafts = readTdilDrafts()) {
  print("TDIL");
  print("Build notes and implementation lessons.");
  print("--------------------------------");

  if (!entries.length && !drafts.length) {
    print("No entries found.");
    print();
    printPromptMarker();
    return;
  }

  if (drafts.length) {
    print("DRAFTS SAVED IN THIS BROWSER");
    drafts.forEach((draft) => {
      const tag = draft.tag ? ` [${draft.tag}]` : "";
      print(`${draft.date}${tag}`);
      print(`  ${draft.entry}`);
      print();
    });
    print("PUBLISHED ENTRIES");
    print("--------------------------------");
  }

  entries
    .slice()
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .forEach((entry) => {
      const tag = entry.tag ? ` [${entry.tag}]` : "";
      print(`${entry.date}${tag}`);
      print(`  ${entry.entry}`);
      print();
    });

  print("Add one locally:");
  print('  npm run tdil -- --tag CSS "What I learned today"');
  print();
  printPromptMarker();
}

function showTdil() {
  print("Loading TDIL entries...");

  fetch(new URL("tdil.json", window.location.href))
    .then((response) => {
      if (!response.ok) throw new Error("Could not load tdil.json");
      return response.json();
    })
    .then((entries) => renderTdilEntries(Array.isArray(entries) ? entries : []))
    .catch(() => {
      print("Could not load tdil.json.");
      const drafts = readTdilDrafts();
      if (drafts.length) {
        print("Showing browser-saved drafts instead.");
        print();
        renderTdilEntries([], drafts);
        return;
      }
      print("If this is a local file, open it through the preview server instead.");
      print();
      printPromptMarker();
    });
}

function showTdilHelp() {
  [
    "TDIL COMMANDS",
    "--------------------------------",
    "TDIL",
    "    Show published TDIL entries from tdil.json",
    "",
    "TDIL ADD <tag> <entry>",
    "    Save a browser draft and print the repo command to add it",
    "",
    "ADD TDIL <title>",
    "    Start a guided TDIL draft, then enter date and body",
    "",
    "TIL <tag> <entry>",
    "    Short version of TDIL ADD",
    "",
    "TDIL DRAFTS",
    "    List drafts saved in this browser",
    ""
  ].forEach(print);
  printPromptMarker();
}

function addTdilDraft(args) {
  const parts = args.trim().split(/\s+/).filter(Boolean);
  const tag = parts.shift();
  const entry = parts.join(" ").trim();

  if (!tag || !entry) {
    print("Usage: TDIL ADD <tag> <entry>");
    print('Example: TDIL ADD CSS learned how to keep terminal output readable');
    print();
    printPromptMarker();
    return;
  }

  finishTdilDraft({
    date: localDateString(),
    tag,
    entry
  });
}

function startGuidedTdil(title) {
  const tag = title.trim();

  if (!tag) {
    print("Usage: ADD TDIL <title>");
    print("Example: ADD TDIL JavaScript prompts");
    print();
    printPromptMarker();
    return;
  }

  pendingTdil = {
    step: "date",
    tag,
    date: "",
    entry: ""
  };

  print(`TDIL title: ${tag}`);
  print(`Date? Press ENTER for today (${localDateString()}) or type YYYY-MM-DD.`);
  printPromptMarker();
}

function handlePendingTdil(input) {
  if (!pendingTdil) return false;

  if (input.toUpperCase() === "CANCEL") {
    pendingTdil = null;
    print("TDIL draft cancelled.");
    print();
    printPromptMarker();
    return true;
  }

  if (pendingTdil.step === "date") {
    const date = input.trim() || localDateString();
    if (!validateDate(date)) {
      print("Date must use YYYY-MM-DD. Try again, or type CANCEL.");
      return true;
    }

    pendingTdil.date = date;
    pendingTdil.step = "body";
    print("Body?");
    printPromptMarker();
    return true;
  }

  if (pendingTdil.step === "body") {
    const entry = input.trim();
    if (!entry) {
      print("Body is required. Type the TDIL body, or type CANCEL.");
      return true;
    }

    const draft = {
      date: pendingTdil.date,
      tag: pendingTdil.tag,
      entry
    };
    pendingTdil = null;
    finishTdilDraft(draft);
    return true;
  }

  pendingTdil = null;
  return false;
}

function showTdilDrafts() {
  const drafts = readTdilDrafts();

  print("TDIL DRAFTS");
  print("--------------------------------");
  if (!drafts.length) {
    print("No drafts saved in this browser.");
    print();
    printPromptMarker();
    return;
  }

  drafts.forEach((draft, index) => {
    const tag = draft.tag ? ` [${draft.tag}]` : "";
    print(`${index + 1}. ${draft.date}${tag}`);
    print(`   ${draft.entry}`);
    print(`   ${formatTdilPublishCommand(draft)}`);
    print();
  });

  printPromptMarker();
}

function handleTdilCommand(args) {
  const [subcommand = ""] = args.trim().split(/\s+/, 1);
  const rest = args.slice(subcommand.length).trim();

  if (!subcommand) {
    showTdil();
    return;
  }
  if (subcommand.toUpperCase() === "ADD") {
    addTdilDraft(rest);
    return;
  }
  if (subcommand.toUpperCase() === "DRAFTS") {
    showTdilDrafts();
    return;
  }
  if (subcommand.toUpperCase() === "HELP") {
    showTdilHelp();
    return;
  }

  print("Unknown TDIL command. Use: TDIL, TDIL ADD, TDIL DRAFTS, or TDIL HELP");
  print();
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
  if (!input && pendingTdil) {
    print(">");
    handlePendingTdil(input);
    return;
  }
  if (!input) return;

  print(`> ${input}`);

  if (handlePendingTdil(input)) return;

  const [rawCmd, rawArg] = input.split(/\s+/, 2);
  const cmd = rawCmd.toUpperCase();
  const arg = rawArg ? rawArg.toUpperCase() : "";
  const args = input.slice(rawCmd.length).trim();

  if (cmd === "HELP") return help();
  if (cmd === "CLEAR") {
    outputEl.innerHTML = "";
    renderHeader();
    printPromptMarker();
    return;
  }
  if (cmd === "LS") {
    print("ABOUT TDIL PROJECTS RESUME CONTACT APP WEBSITE DEALMAKER TOOLS LAB DEMO ASCII FRACTAL HOME");
    print("ADD TDIL TIL TDIL ADD TDIL DRAFTS");
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
    handleTdilCommand(args);
    return;
  }
  if (cmd === "ADD" && arg === "TDIL") {
    const title = args.slice(rawArg.length).trim();
    startGuidedTdil(title);
    return;
  }
  if (cmd === "TIL") {
    addTdilDraft(args);
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
      print("Unknown target. Use: OPEN GITHUB|LINKEDIN|WEBSITE|DEALMAKER|RESUME|CONTACT|APP|HOME");
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
