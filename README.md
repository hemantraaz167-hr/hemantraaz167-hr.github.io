# Hemant Raaz Sah — Portfolio V3

A completely redesigned editorial portfolio for www.hemantraaz.com.np.

## Design
- Light editorial / Swiss-inspired layout
- Warm paper background, cobalt blue, coral orange and mint accents
- Large typography and asymmetric composition
- Responsive mobile navigation
- Scroll reveal animations
- Direct clickable GitHub project cards

## Deploy
Upload the contents of this folder to the root of the GitHub Pages repository. Keep `CNAME` in the root.

## V4 visual refresh
- Replaced the full-black sections with gradient color fields
- Added cobalt, violet, mint and warm coral palette
- Added softer blue/green editorial background treatment
- Kept all project GitHub links and the original deployment structure

## V5 enhancements
- Interactive project category filters
- Open-to-opportunities animated badge
- Copy-email interaction
- Scroll cue and enhanced micro-interactions
- More layered gradients, texture, depth, hover states and responsive polish

## V7 — Separate Training & Certifications section
- New section `#certifications` (06) after Education, with its own nav link
- Education now spans the full width in a clean 3-item row
- Hover a certificate thumbnail to pop it out (desktop); tap any card to open the viewer (image preview, Open PDF / Open image, Download, prev/next, Esc, swipe)
- Certificate files live in `assets/certificates/`
- To add another: drop files in that folder, add an `<article class="cert-card reveal">` card in `index.html`, and a matching entry in the `CERTS` object at the bottom of `script.js`
- `style.css?v=8` / `script.js?v=8` are version-tagged so browsers fetch the new files; bump the number whenever you edit them
