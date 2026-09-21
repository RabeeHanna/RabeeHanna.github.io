# Rabee Hanna portfolio

Static HTML, CSS and JavaScript. No build, Node.js, backend, or Vue installation is needed.

## Publish on GitHub Pages

1. Create a new public GitHub repository (for example, `portfolio`).
2. Extract this ZIP. Put its contents directly at the repository root, so `index.html`, `styles.css`, `script.js`, and `assets/` are alongside this README. Do not upload the ZIP itself.
3. Commit and push these files to the `main` branch.
4. Open the repository's **Settings > Pages**.
5. Under **Build and deployment**, select **Deploy from a branch**.
6. Select **main** and **/(root)**, then **Save**.
7. Once GitHub finishes publishing, copy the website URL shown in Settings > Pages. For a repository named `portfolio`, the URL follows `https://YOUR_USERNAME.github.io/portfolio/`.

The empty `.nojekyll` file is included. All site assets use relative paths, so the same files work in a repository subdirectory or at the root of a user site. Google Fonts is the only external visual dependency; system font fallbacks are provided.

Official setup documentation: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

## Push from a terminal

Run these commands inside the extracted folder. Replace the placeholder GitHub repository URL with your new repository URL. Create the remote repository empty if using this sequence.

```sh
git init
git add .
git commit -m "Add portfolio site"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
git push -u origin main
```

## Edit and preview

- `index.html`: content, project descriptions, links, and diagrams.
- `styles.css`: layout, colors, responsive styling, and motion.
- `script.js`: project navigation and interactions.
- `assets/`: portrait and company, university, and technology logos.

Open `index.html` in a browser to preview. For an optional local server, run `python -m http.server 8000` and visit `http://localhost:8000`.

After editing, commit and push to `main` to update the published site.
