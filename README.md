# jozefwithaz.com

Your website. Hosted on GitHub Pages. Static files, no server. Edit anything from this page directly in the browser (use the pencil icon on any file).

## Open items before launch

These are the things still pending. Knock them out and the site is shippable.

- **Bio paragraph.** `index.html` has placeholder copy in the Bio section. Write the real one and replace it.
- **Formspree endpoint.** The mailing list form is wired up but pointed at a placeholder. Sign up at formspree.io, create a form, copy its endpoint URL, and replace `REPLACE_WITH_FORMSPREE_ID` near the top of `app.js`.
- **AVDP episode link.** Once the AVDP episode goes live, swap the Featured On link in `index.html` to point at the episode (currently just points at the AVDP homepage).
- **Visual direction.** The site is intentionally bare so it does not constrain your visual identity. Decide what the visual artist treatment is, commission whoever, then drop the visuals in. Right now there is just text on black.
- **Styling.** The current look is mono type on black. Change the four CSS custom properties at the top of `style.css` (`--bg`, `--fg`, `--rule`, `--font-mono`) to recolor or change the font without touching anything else.
- **Visual artist reachout.** Get someone to do covers, photography, or art direction for the album. The site is set up to drop in custom cover art per track (the `art` field in `tracks.json`, files go in `img/covers/`).
- **More tracks.** Drop them in `tracks.json` as they release. See below.

## How to add a track

1. Open `tracks.json`. Click the pencil icon.
2. Add a new entry to the array. Put a comma after the previous entry's closing brace.
3. Commit.

A track entry looks like this:

```json
{
  "number": "02",
  "title": "Track Title",
  "art": "img/covers/track-title.jpg",
  "spotify_embed": "https://open.spotify.com/embed/track/TRACK_ID",
  "apple_embed": "https://embed.music.apple.com/COUNTRY/album/ALBUM_SLUG/ALBUM_ID?i=TRACK_ID",
  "spotify": "https://open.spotify.com/track/TRACK_ID",
  "apple": "https://music.apple.com/COUNTRY/album/ALBUM_SLUG/ALBUM_ID?i=TRACK_ID"
}
```

To get the embed URLs:
- **Spotify**: open the track on open.spotify.com, click Share, copy the link, replace `https://open.spotify.com/track/` with `https://open.spotify.com/embed/track/`.
- **Apple Music**: open the song on music.apple.com, click Share, copy the link, replace `https://music.apple.com/` with `https://embed.music.apple.com/`.

Drop the cover art in `img/covers/` and reference it in the `art` field.

## How to change copy

Open `index.html` and edit the text between the tags. The Bio paragraph, Featured On, Contact, and footer sections are all plain HTML.

## Mailing list

The form sends submissions to Formspree, which emails you each signup. To point it at your own Formspree account:

1. Sign up at formspree.io.
2. Create a new form. Copy its endpoint URL (looks like `https://formspree.io/f/abcd1234`).
3. Open `app.js`. Near the top, replace `REPLACE_WITH_FORMSPREE_ID` with your endpoint URL.
4. Commit.

## DNS and the domain

`CNAME` tells GitHub Pages your custom domain is `jozefwithaz.com`. DNS is configured at the registrar to point at GitHub Pages. If you ever change registrars, follow GitHub's "Configuring a custom domain" docs.

## When things break

- Site shows the wrong content: check the `Actions` tab. A red X means a deploy failed.
- A track does not show: confirm the JSON in `tracks.json` is valid (missing commas are the usual culprit).
- An embed does not load: double check the `spotify_embed` / `apple_embed` URLs in `tracks.json` actually load when pasted into a browser.
- Form does not work: confirm the Formspree endpoint in `app.js` is yours and active.

## What is what

| File | Job |
|---|---|
| `index.html` | The page itself. Text and structure. |
| `style.css` | Colors, fonts, spacing. Change the four custom properties at the top to recolor. |
| `app.js` | Renders the track embeds. Handles the mailing list form. |
| `tracks.json` | List of tracks. The one file you edit to add a release. |
| `img/covers/` | Cover art for tracks. |
| `fonts/` | The mono font, self-hosted. |
| `CNAME` | The custom domain. Do not delete. |
