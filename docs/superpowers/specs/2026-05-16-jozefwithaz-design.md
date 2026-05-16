# jozefwithaz.com — design spec

Date: 2026-05-16
Owner: Shadrack Annor (building), Jozef (handoff target)
Domain: jozefwithaz.com
Host: GitHub Pages (static)

## Purpose

A minimal artist hub for Jozef, centered on his self-produced album **The Range** (R&B to rap, live instruments). The site introduces him, plays his music inline, surfaces the AVDP feature, gives a contact path, and collects emails for release notifications. The repo is built by Shadrack and then transferred to Jozef's GitHub account, where he can maintain it through the GitHub web UI without a local toolchain.

## Non-goals

- No CMS, no backend, no build step.
- No analytics, no consent banners, no third-party tracking beyond the embedded streaming/contact services.
- No design system, no component framework, no JS framework.
- No mailing list management within the site. Submissions are forwarded; storage and sending live with a third party.
- No skeuomorphic gear graphics, no decorative LEDs, no panel-screw flourishes. Restraint is the point.

## Aesthetic

Near-black background. Off-white text. No accent color. Links underline on hover, nothing else. One typeface, mono, used for everything (labels, body, navigation, form). Section headings are short uppercase mono labels (`TRACKS`, `BIO`, `FEATURED ON`, `CONTACT`, `NOTIFY ON RELEASE`). Thin hairline rules separate sections. Generous vertical whitespace. The "studio gear" reference enters only through the mono type and the silkscreen-style labels; nothing else.

Concrete tokens:

- Background: `#0a0a0a`
- Text: `#e8e4d8`
- Rule: `#2a2a2a`
- Font family: `"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace`
- Body size: `15px` desktop, `14px` mobile
- Max content width: `640px`, centered
- Vertical rhythm: `2rem` between sections, `1rem` within

## Content structure

Single page. Sections appear in this order:

1. **Header** — "JOZEF WITH A Z" set in mono, all caps, followed by a one-line tagline ("The Range — forthcoming"). No nav, no logo.
2. **Tracks** — vertical list of tracks. First row is "Dunkin' Flow" with Spotify + Apple links. Other rows are unreleased demos played inline.
3. **Bio** — short paragraph (Jozef writes, placeholder until then).
4. **Featured on** — single line linking to AVDP episode (placeholder URL until episode drops) and the AVDP YouTube channel.
5. **Notify on release** — single-input email form posting to a configurable Formspree endpoint.
6. **Contact** — IG link (`@josefwithaz`), email placeholder, both as plain text links one per line.
7. **Footer** — copyright line, current year, nothing else.

Note on spelling: domain is `jozefwithaz.com` (Z), IG handle is `josefwithaz` (S). Intentional carryover from a known mismatch. Treat as given; do not normalize.

## Track player

Each track is one row in the list, separated by hairline rules:

```
01   TRACK TITLE                 3:42   [PLAY]   SPOTIFY   APPLE
     [progress bar appears below when playing]
```

- Track number is two-digit mono.
- Title is uppercase mono.
- Duration is right-aligned within its column.
- `[PLAY]` toggles to `[STOP]` while playing.
- `SPOTIFY` / `APPLE` are inline text links, rendered only when present in the track data.
- When playing, a thin 1px progress bar appears under the row, filling left to right. No scrubber, no time elapsed readout. The user can stop, that is the only control.
- Only one track plays at a time. Starting a new track stops any other.
- Player uses the native HTML5 `<audio>` element, hidden, controlled by JS.

### Track data

`tracks.json` at the repo root holds all track metadata. Adding a track means dropping an MP3 in `/audio/` and adding an entry to this file. No other code changes.

```json
[
  {
    "number": "01",
    "title": "Dunkin' Flow",
    "file": "audio/dunkin-flow.mp3",
    "duration": "3:42",
    "spotify": "https://open.spotify.com/track/75ezScmzHLaRxBMWxDGtmE?si=JVDRlW8YSOCurEpqw3GwSw",
    "apple": "https://music.apple.com/gb/album/dunkin-flow/1826198844?i=1826198845"
  }
]
```

Empty `spotify` / `apple` strings hide those links on that row.

## Mailing list

A single text input (email) and a submit button. Posts via `fetch` to a Formspree endpoint stored as a constant at the top of `app.js`:

```js
const FORM_ENDPOINT = "https://formspree.io/f/REPLACE_WITH_FORMSPREE_ID";
```

On success: replace the form with the text "Saved. We will let you know when The Range drops."
On failure: show "Something went wrong. Try again."
The endpoint can be repointed by Jozef after handoff by editing this one constant. README documents how.

## Repository layout

```
jozefwithaz.com/
├── index.html
├── style.css
├── app.js
├── tracks.json
├── audio/
│   └── dunkin-flow.mp3
├── fonts/
│   └── jetbrains-mono.woff2
├── img/
│   └── favicon.svg
├── CNAME            # contains: jozefwithaz.com
├── README.md        # handoff notes for Jozef
└── docs/
    └── superpowers/
        └── specs/
            └── 2026-05-16-jozefwithaz-design.md
```

`docs/` is kept in the repo for provenance but is unreferenced by the site.

## File responsibilities

**index.html** — semantic HTML, one section per content block, no inline scripts or styles. Loads `style.css` and `app.js`. Includes a `<noscript>` block inside the Tracks section listing released tracks with their Spotify and Apple links hardcoded, so a no-JS visitor can still reach the music. Unreleased demos are not surfaced without JS (they have no public link to point at anyway).

**style.css** — all visual styling. Mobile-first. One breakpoint at `640px`. No CSS frameworks, no resets beyond box-sizing and margin reset on body. Custom properties for color and font tokens at the top so Jozef can recolor by editing four lines.

**app.js** — three responsibilities, in this order:
1. Fetch `tracks.json` and render the track list into the DOM.
2. Wire up play/stop buttons and the shared `<audio>` element.
3. Handle the mailing list form submit (fetch POST to Formspree, swap message on response).

No build step. No imports. No npm. Plain ES2020 in one file.

**tracks.json** — described above.

**README.md** — for Jozef, written in plain English. Covers:
- How to add a track (drop MP3, edit `tracks.json`, push).
- How to change copy (edit `index.html`).
- How to repoint the mailing list to his own Formspree account (replace the constant in `app.js`).
- How GitHub Pages serves the site, where DNS is configured, what `CNAME` does.
- How to edit any of the above directly in the GitHub web UI without ever cloning the repo.

**CNAME** — single line, `jozefwithaz.com`.

## Accessibility

- All interactive elements are real `<button>` or `<a>` elements.
- Play/stop button announces state via `aria-pressed` and visible text change.
- Progress bar has `role="progressbar"` with `aria-valuenow` updated as it fills.
- Form input has a visible `<label>`.
- Color contrast: off-white on near-black exceeds WCAG AAA.
- All copy renders without JS via the `<noscript>` fallback.

## Performance

- Single HTML file, single CSS file, single JS file. Three requests for the shell.
- One font: `JetBrains Mono` self-hosted as `woff2` in `/fonts/`, preloaded. No Google Fonts request.
- Audio files load lazy on click, never on page load.
- No images on first paint beyond favicon.

## Handoff readiness

The site is "transfer-ready" when:

- Repo lives at a clean URL (e.g. `taiscoding/jozefwithaz.com`), ready for ownership transfer to Jozef's GitHub.
- README documents every change a non-developer might want to make.
- All third-party endpoints (Formspree) are stored as named constants Jozef can edit without reading the surrounding code.
- DNS is configured with an `A`/`CNAME` record pointing to GitHub Pages, and a `CNAME` file is committed.
- No secrets, tokens, or Shadrack-specific endpoints remain in the repo.

## Open items (resolve before launch, not blockers for v1 build)

- Final bio paragraph from Jozef.
- Contact email (or decision to omit and use IG only).
- AVDP episode URL once published.
- Tracks 02+ audio files and metadata.
- Formspree account (Shadrack creates, transfers to Jozef, or Jozef creates and Shadrack pastes the endpoint).
- Spelling discrepancy between domain (`jozefwithaz`) and IG (`josefwithaz`) — flagged, owner aware, not blocking.
