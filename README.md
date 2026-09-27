# THUNDER — GFG × Bennett University

A Marvel-inspired, Thor-themed event landing page created for the GeeksForGeeks Student Chapter, Bennett University.

## Files

- `index.html` — page structure and content
- `style.css` — responsive visual system, animations, layout
- `script.js` — scroll reveals, registration modal, validation, localStorage, cursor/magnetic interactions
- `assets/thor.png` — supplied Thor artwork

## Run locally

No npm, framework, or build step is required.

1. Extract the folder.
2. Open `index.html` in a browser.

For a local server (recommended):
- VS Code → install/use Live Server → right-click `index.html` → Open with Live Server.

## Registration behavior

The registration form asks for:
- Full name
- Email ID
- College ID

Because this is a frontend-only submission, registrations are stored in the browser's `localStorage` under `thunderRegistrations`. For a real event, connect the submit handler to a backend, Google Form, Firebase, Supabase, or another database.

## Deployment

This is ready for GitHub Pages, Netlify, Vercel static hosting, or any standard static host.

### GitHub Pages

1. Create a GitHub repository.
2. Upload all files while keeping the `assets` folder.
3. Go to Settings → Pages.
4. Deploy from the main branch / root.
5. Use the generated public URL as the submission's live website link.

## Design direction

- Palette: red / white / black
- Typography: Manrope + DM Sans
- Motion: cinematic reveal, floating hero artwork, subtle lightning, magnetic CTA, cursor glow
- UX: fixed navigation, smooth scroll, responsive layout, accessible modal form, Escape-to-close
- Content: event details, experience, journey, registration CTA

## Asset note

The supplied Thor image is used as the primary visual. The layout deliberately reuses/crops it in different sections to keep the visual system consistent rather than mixing unrelated fan-art assets.
