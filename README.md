# 💧 WATER WORLD

**Water Industry Career Expo — Event Link Hub**

A lightweight, JSON-driven linktree-style website for sharing event links with attendees. Built for GitHub Pages.

🔗 **Live site:** [waterworldhub.com](https://waterworldhub.com)

---

## 📁 Project Structure

```
waterworld/
├── index.html              ← Main page (rarely needs editing)
├── style.css               ← Theme & styling (rarely needs editing)
├── script.js               ← Rendering logic (rarely needs editing)
├── links.json              ← ⭐ THE FILE YOU EDIT — all content lives here
├── CNAME                   ← Custom domain config
├── images/
│   └── sponsors/           ← Drop sponsor logo PNGs here
├── archive/
│   └── index.html          ← Past events listing page
└── README.md               ← You are here
```

> **The only file you need to edit for most changes is `links.json`.**

---

## 🚀 Quick Start — Common Tasks

### Add a New Link (Speaker, Vendor, etc.)

Open `links.json` and add an entry to the appropriate category's `links` array:

```json
{
  "name": "New Organization Name",
  "description": "Short description of who they are",
  "url": "https://their-website.com",
  "icon": "🌊"
}
```

**Where to add it:**
| You want to add a... | Add it inside this category's `links` array |
|---|---|
| Guest speaker | `"id": "speakers"` |
| Tabling vendor | `"id": "vendors"` |
| Event info link | `"id": "event-info"` |
| Mailing list / social | `"id": "stay-connected"` |

### Remove a Link

Delete the entire `{ ... }` block for that link from the array. Make sure you don't leave a trailing comma on the item before it.

### Hide a Link Without Deleting It

Add `"hidden": true` to any link and it won't render on the page, but stays in the JSON for later:

```json
{
  "name": "Some Vendor",
  "description": "Not attending anymore",
  "url": "https://example.com",
  "icon": "🌊",
  "hidden": true
}
```

> **This also works for sponsors and past events** — just add `"hidden": true` to any item you want to temporarily hide.

### Reorder Links

Links display in the exact order they appear in the JSON. Just move the `{ ... }` block up or down in the array.

---

## 📅 Change Event Details

Edit the `"event"` object at the top of `links.json`:

```json
"event": {
  "title": "WATER WORLD",
  "subtitle": "Water Industry Career Expo",
  "date": "Friday, February 20, 2026",
  "time": "12:00 PM - 4:30 PM",
  "location": "CSUSB - SMSU South"
}
```

All five fields display in the header. Change any of them and refresh.

---

## 🤝 Sponsors / Partner Logos

Sponsors display in a 2-column grid below the link categories.

### Add a New Sponsor

1. **Drop the logo image** into `images/sponsors/` (PNG with transparent background works best)
2. **Add an entry** to the `"sponsors"` array in `links.json`:

```json
{
  "name": "Sponsor Name",
  "logo": "images/sponsors/filename.png",
  "url": "https://sponsor-website.com"
}
```

| Field | Required | Notes |
|---|---|---|
| `name` | Yes | Displays below the logo |
| `logo` | Yes | Path to image in `images/sponsors/` |
| `url` | No | Leave as `""` if no website — logo won't be clickable |
| `hidden` | No | Set to `true` to hide without deleting |

### If a Logo Image is Missing

The site automatically shows the sponsor's **name as styled text** instead. No broken images.

### Logo Tips

- Use **PNG with transparent background** for best results
- Logos are auto-sized to fit — no need to resize manually
- Light-colored logos work best on the dark background
- Recommended size: at least 200px wide

---

## 📬 Mailing List

The mailing list button links to a Google Form. All signups go to a connected Google Sheet automatically.

**To change the form link**, edit the URL in the `"stay-connected"` category in `links.json`.

**To view signups**, open the linked Google Sheet from your Google Forms dashboard at [forms.google.com](https://forms.google.com).

---

## 📊 Google Analytics

Analytics are already set up with measurement ID `G-KZC48JMVLF`.

**What's tracked:**
- Page views (automatic)
- Link button clicks — each click sends the link name to GA as a `link_click` event

**To view analytics:**
1. Go to [analytics.google.com](https://analytics.google.com)
2. Select the waterworldhub.com property
3. Check **Reports → Realtime** for live visitors
4. Check **Reports → Engagement → Events** for link click data

**To change the measurement ID**, edit the `G-XXXXXXXXXX` value in both:
- `index.html` (line ~20)
- `archive/index.html` (line ~12)

---

## 🗂️ Archiving Past Events

When an event is over and you're setting up the next one:

### Step 1 — Save the Current Event

Copy your current `links.json` to the archive folder with a descriptive name:

```bash
cp links.json archive/2026-water-world.json
```

### Step 2 — Add It to Past Events

In `links.json`, add an entry to the `"pastEvents"` array:

```json
"pastEvents": [
  {
    "name": "Water World 2026",
    "date": "February 20, 2026",
    "url": "archive/2026-water-world.json"
  }
]
```

### Step 3 — Update for the New Event

Edit the `"event"` object and all the categories in `links.json` with the new event's info.

**Past events appear as small links in the footer** of the main page, and there's a full listing at `/archive/`.

---

## 🎨 Add a New Category

Add a new object to the `"categories"` array in `links.json`:

```json
{
  "id": "social-media",
  "title": "Follow Us",
  "icon": "📱",
  "links": [
    {
      "name": "Instagram",
      "description": "@waterworldexpo",
      "url": "https://instagram.com/waterworldexpo",
      "icon": "📸"
    }
  ]
}
```

Categories render in the order they appear in the array.

---

## 🔤 Icons

All icons are standard **emojis** — no library needed.

**To pick an icon:**
- On Mac: press `Ctrl + Cmd + Space` to open the emoji picker
- Or browse: [emojipedia.org](https://emojipedia.org)

**Common icons used in this project:**

| Emoji | Use |
|---|---|
| 💧 | Water / speakers |
| 🌊 | Water districts / vendors |
| 🔧 | Technical / consulting |
| 📝 | RSVP / registration |
| 🎓 | Education / career |
| 📍 | Location |
| 📋 | Event info |
| 📬 | Mailing list |
| 🤝 | Sponsors |
| 📸 | Social media |

Just paste any emoji into the `"icon"` field in the JSON.

---

## 🧪 Testing Locally

Since the site uses `fetch()` to load `links.json`, you can't just double-click `index.html`. You need a local server:

```bash
cd ~/Desktop/waterworld
python3 -m http.server 8000
```

Then open [http://localhost:8000](http://localhost:8000) in your browser.

Press `Ctrl + C` in the terminal to stop the server when done.

---

## 🚀 Deploying to GitHub Pages

### First Time Setup

```bash
cd ~/Desktop/waterworld
git init
git add .
git commit -m "Initial commit"
```

Then on [github.com/new](https://github.com/new):
1. Create a new **public** repository (e.g., `waterworld`)
2. Don't initialize with README (we already have one)

```bash
git remote add origin https://github.com/YOUR_USERNAME/waterworld.git
git branch -M main
git push -u origin main
```

Then in the GitHub repo:
1. Go to **Settings → Pages**
2. Source: **Deploy from a branch**
3. Branch: **main** / folder: **/ (root)**
4. Click Save

### Pushing Updates

After editing `links.json` (or any file):

```bash
git add .
git commit -m "Updated vendor links"
git push
```

Site updates automatically within 1-2 minutes.

---

## 🌐 Custom Domain DNS Setup

For `waterworldhub.com`, add these DNS records at your domain registrar:

| Type | Host | Value |
|---|---|---|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | YOUR_USERNAME.github.io |

Then in GitHub repo **Settings → Pages → Custom domain**: enter `waterworldhub.com` and check **Enforce HTTPS**.

---

## 📋 Full `links.json` Reference

```
{
  "event": {                    ← Header info
    "title": "...",
    "subtitle": "...",
    "date": "...",
    "time": "...",
    "location": "..."
  },
  "categories": [               ← Link sections
    {
      "id": "unique-id",
      "title": "Section Name",
      "icon": "emoji",
      "links": [
        {
          "name": "Link Text",       ← Required
          "url": "https://...",      ← Required
          "description": "...",      ← Optional
          "icon": "emoji",           ← Optional (defaults to 🔗)
          "hidden": true             ← Optional (hides without deleting)
        }
      ]
    }
  ],
  "sponsors": [                 ← Sponsor logo grid
    {
      "name": "...",             ← Required
      "logo": "images/...",      ← Required
      "url": "...",              ← Optional
      "hidden": true             ← Optional
    }
  ],
  "pastEvents": [               ← Footer archive links
    {
      "name": "...",
      "date": "...",
      "url": "archive/..."
    }
  ]
}
```

---

## 💡 Tips

- **Always validate your JSON** after editing — a missing comma or bracket breaks the whole page. Use [jsonlint.com](https://jsonlint.com) to check.
- **Refresh with Ctrl+Shift+R** (hard refresh) if changes don't appear immediately.
- **Test locally first** before pushing to GitHub.
- **Sponsor logos** with transparent backgrounds on a dark theme look the best.
- **The site is mobile-first** — always check how it looks on your phone after changes.
