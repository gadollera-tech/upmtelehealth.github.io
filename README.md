# UP Manila National Telehealth Center — Landing Site

A responsive, accessible static website concept designed around UP institutional branding and NTHC's digital-health identity. It includes program and project sections, current/featured news, contact information, a newsletter/contact-list form, a detailed inquiry form, a success page, and a draft privacy notice.

## Files

- `index.html` — main landing page
- `styles.css` — responsive visual system
- `script.js` — mobile navigation, project filters, and local-preview handling
- `privacy.html` — privacy notice draft for legal/DPO review
- `success.html` — form confirmation page
- `netlify.toml` — hosting and security-header configuration
- `assets/favicon.svg` — local favicon

## Form collection

Both forms are configured for **Netlify Forms**:

- `nthc-updates` — contact list / newsletter signups
- `nthc-inquiry` — partnership, research, training, and general inquiries

### Quick deployment

1. Sign in to Netlify.
2. Drag the entire folder into Netlify Drop, or push it to a Git repository and connect the repository.
3. After deployment, submit each form once to confirm detection.
4. In Netlify, open **Forms** to review and export submissions as CSV.
5. Configure **Form submission notifications** so designated NTHC email addresses receive new-submission alerts.
6. Enable spam filtering and restrict dashboard access to authorized personnel.

The forms intentionally do not request patient or clinical information.

## Before institutional publication

- Obtain approval for the UP Manila, NIH, and NTHC seals/logos and replace remote logo links with approved local high-resolution assets.
- Verify the director, office address, telephone numbers, email addresses, social links, project status, and news dates.
- Review the wording with NTHC leadership and UP Manila IPPAO.
- Finalize the privacy notice with the UP Manila Data Protection Office and legal office.
- Confirm an approved data processor, retention period, access controls, incident-response process, and unsubscribe workflow.
- Remove the “website concept for institutional review” footer language after approval.
- Add the final production domain to Open Graph metadata, JSON-LD, analytics (if institutionally approved), sitemap, and search-console configuration.

## Branding basis

The site prioritizes UP Maroon, Forest Green, Gold, and black/neutral typography, with restrained NTHC blue for digital-health graphics. Headings use system fallbacks consistent with the UP guide’s Optima direction; body text uses Avenir/Helvetica-style system fallbacks.

## Content basis

Content was synthesized from official public sources, including:

- NTHC official website (`telehealth.ph`)
- UP Manila National Institutes of Health center profile
- UP Manila news and announcements
- Official NTHC social pages
- University of the Philippines Visual Identity Guidebook

Research date: 2 August 2026.
