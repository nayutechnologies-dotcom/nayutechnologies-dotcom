# Nayu Technologies Inc. — Website

> AI & Automation Consulting Company Website  
> Built with pure HTML, CSS, JavaScript — zero dependencies, zero build step.

## 📁 Repo Structure

```
nayu-technologies/
├── index.html              ← Homepage (hero, services, training, sectors, clients)
├── css/
│   └── style.css           ← Full design system + responsive styles
├── js/
│   └── main.js             ← Animations, particles, typed text, scroll reveal
├── pages/
│   ├── training.html       ← AI Training Programs page
│   └── contact.html        ← Contact / Get Started page
└── README.md
```

## 🚀 Deploy to GitHub Pages (Free Hosting)

### Step 1 — Push to GitHub

```bash
# Navigate into the folder
cd nayu-technologies

# Initialize git repo
git init
git add .
git commit -m "🚀 Initial launch: Nayu Technologies website"

# Create a repo on github.com named "nayu-technologies" then:
git remote add origin https://github.com/YOUR_USERNAME/nayu-technologies.git
git branch -M main
git push -u origin main
```

### Step 2 — Enable GitHub Pages

1. Go to your repo on GitHub.com
2. Click **Settings → Pages**
3. Under *Source*, select **Deploy from a branch**
4. Set Branch to `main`, folder to `/ (root)`
5. Click **Save**
6. Your site will be live at: `https://YOUR_USERNAME.github.io/nayu-technologies`

### Step 3 — Connect Your Custom Domain

1. In GitHub Pages settings, enter your custom domain (e.g. `nayutechnologies.com`)
2. In your domain registrar (Namecheap/Cloudflare), add DNS records:
   ```
   A Record: @ → 185.199.108.153
   A Record: @ → 185.199.109.153
   A Record: @ → 185.199.110.153
   A Record: @ → 185.199.111.153
   CNAME:    www → YOUR_USERNAME.github.io
   ```
3. Wait 15–60 min for DNS propagation
4. Enable **Enforce HTTPS** in GitHub Pages settings ✅

---

## 📧 Set Up Contact Form (Free)

1. Go to [formspree.io](https://formspree.io) and create a free account
2. Create a new form — copy your Form ID (e.g. `xpzgkwbe`)
3. Open `pages/contact.html` and replace:
   ```html
   action="https://formspree.io/f/YOUR_FORM_ID"
   ```
   with your actual ID:
   ```html
   action="https://formspree.io/f/xpzgkwbe"
   ```
4. You'll receive contact form submissions directly to your email — free for up to 50/month

---

## 🎨 Customizations

### Update Company Info
- **Email**: Search for `info@nayutechnologies.com` and replace in `index.html` + `pages/contact.html`
- **Office address**: Search for `Toronto, Ontario, Canada` in `index.html`
- **LinkedIn**: Search for `linkedin.com/company/nayutech` and update in `index.html`

### Update Colors
Open `css/style.css` and edit the `:root` block:
```css
:root {
  --accent:   #00d4ff;   /* Primary cyan — change to your brand color */
  --accent-2: #7b61ff;   /* Secondary purple */
}
```

### Add Your Logo
Replace the `⬡` emoji icon in the `.nav-logo-icon` divs with an `<img>` tag:
```html
<div class="nav-logo-icon">
  <img src="assets/logo.svg" alt="Nayu" width="24" />
</div>
```

---

## 📊 SEO Checklist (After Launch)

- [ ] Submit site to [Google Search Console](https://search.google.com/search-console)
- [ ] Add your sitemap at `nayutechnologies.com/sitemap.xml`
- [ ] Set up [Google Analytics](https://analytics.google.com) (free)
- [ ] Update meta descriptions in each `<head>` tag
- [ ] Add Open Graph tags for social sharing

---

## 💰 Cost Summary

| Item | Cost |
|---|---|
| Domain (Namecheap, 1yr) | ~$12 CAD |
| GitHub Pages Hosting | **FREE** |
| SSL Certificate | **FREE** |
| Formspree Contact Form | **FREE** (50/mo) |
| **Total Year 1** | **~$12 CAD** |

---

Built by Claude for Nayu Technologies Inc. 🚀
