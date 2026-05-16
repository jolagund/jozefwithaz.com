// jozefwithaz.com — see README.md for what each section does.

const FORM_ENDPOINT = "https://formspree.io/f/REPLACE_WITH_FORMSPREE_ID";

async function loadTracks() {
  const list = document.getElementById("track-list");
  if (!list) return;
  const res = await fetch("tracks.json", { cache: "no-cache" });
  if (!res.ok) return;
  const tracks = await res.json();
  while (list.firstChild) list.removeChild(list.firstChild);
  for (const t of tracks) {
    list.appendChild(renderTrack(t));
  }
}

function renderTrack(t) {
  const li = document.createElement("li");
  li.className = "track";
  li.dataset.file = t.file || "";

  const number = document.createElement("span");
  number.className = "track-number";
  number.textContent = t.number;

  const title = document.createElement("span");
  title.className = "track-title";
  title.textContent = t.title;

  const duration = document.createElement("span");
  duration.className = "track-duration";
  duration.textContent = t.duration || "";

  const play = document.createElement("button");
  play.className = "track-play";
  play.type = "button";
  play.setAttribute("aria-pressed", "false");
  play.textContent = "[ Play ]";
  if (!t.file) play.hidden = true;

  const spotify = makeLink(t.spotify, "Spotify");
  const apple = makeLink(t.apple, "Apple");

  const progress = document.createElement("div");
  progress.className = "track-progress";
  progress.setAttribute("role", "progressbar");
  progress.setAttribute("aria-valuemin", "0");
  progress.setAttribute("aria-valuemax", "100");
  progress.setAttribute("aria-valuenow", "0");

  li.append(number, title, duration, play, spotify, apple, progress);
  return li;
}

function makeLink(href, label) {
  const a = document.createElement("a");
  a.className = "track-link";
  a.textContent = label;
  if (href) a.href = href;
  else a.hidden = true;
  a.target = "_blank";
  a.rel = "noopener";
  return a;
}

loadTracks();
