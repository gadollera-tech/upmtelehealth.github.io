# UP Manila National Telehealth Center — GitHub Pages/Jekyll site

This version is built for **GitHub Pages using Jekyll**, GitHub's native static-site generator. No Netlify is required.

## Why Jekyll

- New news/blog posts are Markdown files in `_posts/`.
- Staff, events, careers, projects, and publications are editable YAML files in `_data/`.
- GitHub Pages rebuilds and publishes the site automatically after a commit.
- The design remains static, fast, secure, and easy to migrate later.

## Publish on GitHub Pages

1. Upload all files in this folder to the repository root.
2. In GitHub, open **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select the `main` branch and `/ (root)`, then save.
5. Wait for GitHub Pages to finish the build.

If the repository is a project site such as `username.github.io/repository-name`, set `baseurl: "/repository-name"` in `_config.yml`. For a custom domain or `username.github.io`, leave it blank.

## Forms

The contact and signup forms use the included Google Apps Script workflow. Deploy `google-apps-script/Code.gs` as a web app and paste the `/exec` URL into `config.js`. Until configured, the form opens the visitor's email application.

See `EDITOR-GUIDE.md` for posting and updating content.
