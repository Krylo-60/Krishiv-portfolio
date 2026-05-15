# Krishiv Velocity Portfolio

This repository is the live portfolio and app galaxy for Krishiv PB.

## Live deployments

- Vercel: https://krishiv-new-portfoilo.vercel.app
- Netlify: https://krishiv-new-portfoilo.netlify.app
- GitHub Pages: https://krylo-60.github.io/krishiv_new_portfoilo/
- GitHub repo: https://github.com/Krylo-60/Krishiv-portfolio

## Deployment setup

### Vercel

This project already includes `vercel.json` and is configured to deploy with the existing Node server entrypoint.

To deploy on Vercel:
1. Connect this GitHub repository to Vercel.
2. Set the root directory to the repository root.
3. Use the default production branch (`main` or `master`).
4. Vercel will build and serve the app using `server.js`.

### GitHub Pages

A GitHub Actions workflow is included at `.github/workflows/gh-pages.yml`.

Pushing to `main` or `master` triggers the GitHub Pages deployment workflow.

> Note: GitHub Pages serves the static site files from the repository. Any Node server features will only run on Vercel.

## Release notes

The release history is stored in `data/releases.json` and rendered on `release-notes.html`.

A new deployment release entry has been added for the Vercel + GitHub Pages launch.

## Recommended workflow

1. Update site files.
2. Commit and push to `main` or `master`.
3. GitHub Actions deploys the static site to GitHub Pages.
4. Vercel deploys the full app automatically when the project is linked.

## Helpful pages

- `index.html` — homepage
- `all-links.html` — site directory and link hub
- `release-notes.html` — full release timeline
- `contact.html` — contact and social links
