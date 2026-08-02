# Content Update Guide

## Post a new news or blog story

1. In GitHub, open the `_posts` folder.
2. Click **Add file → Create new file**.
3. Name it `YYYY-MM-DD-short-title.md`, for example `2026-08-20-digital-health-workshop.md`.
4. Copy the contents of `templates/news-post-template.md`.
5. Replace the title, category, summary, source link, and article text.
6. Click **Commit changes**. GitHub Pages publishes it automatically.

Supported categories in the current news filters: `News`, `Training`, and `Milestone`. Additional categories still display, but add a filter button in `news.html` if needed.

## Add an event

Edit `_data/events.yml`. Copy one complete event block and change the values. Use dates in `YYYY-MM-DD` format. Future-dated events automatically appear in the Upcoming panel and calendar.

## Add a staff member

Edit `_data/staff.yml`. Copy one person block. Add only institution-approved names, titles, emails, bios, and photos. The current design uses initials, so no photo is required.

## Post a vacancy

Edit `_data/careers.yml`. Add the newest vacancy at the top and use `status: Open`. When the deadline passes, change it to `Closed`. Vacancies with `status: Open` automatically appear in the Open Positions section. When the deadline passes, change the status to `Closed`; the listing moves to the archive automatically.

## Add or update a project

Edit `_data/projects.yml`. Use `featured: true` for projects that should appear on the homepage.

## Add a publication

Edit `_data/publications.yml`. Add the newest publication at the top and include a DOI, PubMed, PMC, journal, or publisher link.

## WordPress later?

WordPress is useful if many non-technical staff need logins, visual editing, media management, approval workflows, and scheduled publishing. This Jekyll version is better for a small editorial team comfortable with GitHub. The site structure and content categories are already organized for a future WordPress migration.
