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

  const head = document.createElement("div");
  head.className = "track-head";

  const number = document.createElement("span");
  number.className = "track-number";
  number.textContent = t.number;

  const title = document.createElement("span");
  title.className = "track-title";
  title.textContent = t.title;

  head.append(number, title);
  li.appendChild(head);

  if (t.spotify_embed) {
    li.appendChild(makeEmbed(t.spotify_embed, "Spotify embed: " + t.title, 152, "spotify"));
  }
  if (t.apple_embed) {
    li.appendChild(makeEmbed(t.apple_embed, "Apple Music embed: " + t.title, 175, "apple"));
  }

  return li;
}

function makeEmbed(src, title, height, kind) {
  const iframe = document.createElement("iframe");
  iframe.className = "track-embed track-embed-" + kind;
  iframe.src = src;
  iframe.title = title;
  iframe.width = "100%";
  iframe.height = String(height);
  iframe.loading = "lazy";
  iframe.setAttribute("frameborder", "0");
  iframe.setAttribute("allow", "autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture");
  iframe.setAttribute("allowtransparency", "true");
  return iframe;
}

loadTracks();

const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

const form = document.getElementById("notify-form");
if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const status = document.getElementById("notify-status");
    const email = form.elements.email.value.trim();
    if (!email) {
      status.textContent = "Enter an email.";
      return;
    }
    status.textContent = "Sending...";
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({ email })
      });
      if (!res.ok) throw new Error("bad response");
      while (form.firstChild) form.removeChild(form.firstChild);
      const msg = document.createElement("p");
      msg.className = "muted";
      msg.textContent = "Saved. We will let you know when The Range drops.";
      form.appendChild(msg);
    } catch {
      status.textContent = "Something went wrong. Try again.";
    }
  });
}
