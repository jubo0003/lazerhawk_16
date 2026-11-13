# UHØRT Festival front page

Local website project implemented from Figma frame `194:32` in UHØRT.

## Preview

Requires Node.js. No installation or external dependencies needed.

```sh
npm run dev
```

Open http://localhost:5173. Stop the server with Ctrl+C.

## Edit

- `dist/index.html`: page sections and original Figma artwork geometry.
- `dist/styles.css`: layout, typography and responsive styles.
- `dist/app.js`: menu, artist dialogs, genre highlighting, year selector and share controls.
- `dist/assets/`: downloaded original Figma assets and Gabarito Regular, Medium, SemiBold and Bold copied from your Font Book installation.
- `server.mjs`: local preview server.

Open `UHORT.code-workspace` in Visual Studio Code. A **Preview UHØRT** task is available under Terminal → Run Task.

## Remaining content integrations

The gradient backgrounds use the original `gradient_wave_soft.mp4`, copied from your UHØRT motion folder and verified against Figma’s video hash (`fc0677539f2eca386d725526d4486d87fcb70830`). They loop muted, support pause/play, and respect reduced motion. The original SaveInta concert clip plays in the hero logo mask and Instagram tile, with the Figma crops. The play/pause button controls all five visible videos. The Spotify player remains a still and needs the actual playlist URL. Add the ticket checkout URL, artist pages and press download before launching. Current controls show honest informational dialogs where these destinations are missing. The archive year control updates the selected year; the design only supplies one artist collection, so per-year datasets still need to be provided.

The source is a static HTML/CSS/JavaScript site; `dist/` can be hosted on any static host. No backend, purchases or signup collection are configured.

## GitHub Pages

The `.github/workflows/pages.yml` workflow publishes `dist/` on every push to `main`. In the repository's Settings → Pages, set the source to GitHub Actions. All site assets use relative paths to support a project Pages URL.

## Background music

`dist/assets/back-track.mp3` is the supplied Back track.mp3. The fixed music button starts or stops it independently of the videos. Stopping pauses the track; starting resumes it. It loops at 35% volume and continues while scrolling and using in-page navigation. The page attempts audible playback on load and shows Stop musik when playing. If the browser blocks autoplay, the first eligible interaction starts playback. The welcome popover appears once per browser session. While it is open, a 342 Hz low-pass filter muffles the track. Entering the site opens the cutoff exponentially to 20 kHz over 2.5 seconds without restarting the music.
