# Cowell Lab Website

## 📁 Project Structure

```
cowellcomplab/
├── public/                 # Static files (images, etc.)
│   └── img/
├── src/
│   ├── components/         # Reusable components
│   │   ├── AlumniMemberItem.tsx
│   │   ├── CurrentMemberItem.tsx
│   │   ├── FadeInOnScroll.tsx
│   │   ├── LinkButton.tsx
│   │   ├── Markdown.tsx
│   │   ├── NewsItem.tsx
│   │   ├── ProjectItem.tsx
│   │   ├── PubItem.tsx
│   │   └── ScrollToTop.tsx
│   ├── content/            # MDX/Markdown content
│   │   ├── news/
│   │   ├── people/
│   │   ├── projects/
│   │   └── publications/
│   ├── layout/             # Layout components
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   ├── Layout.tsx
│   │   └── PageTitle.tsx
│   ├── lib/                # Utility functions
│   │   ├── dateFormat.ts
│   │   └── mdx.ts
│   ├── pages/              # Page components
│   │   ├── Home.tsx
│   │   ├── News.tsx
│   │   ├── NewsDetail.tsx
│   │   ├── People.tsx
│   │   ├── PersonDetail.tsx
│   │   ├── Projects.tsx
│   │   ├── ProjectDetail.tsx
│   │   ├── Publications.tsx
│   │   └── PublicationDetail.tsx
│   ├── App.tsx
│   ├── index.css
│   ├── loadContent.ts
│   └── main.tsx
├── index.html
├── package.json
├── pnpm-lock.yaml
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
└── vite.config.ts
```

## 📦 Package Manager

This project uses **pnpm**.

## 🚀 Development

Install dependencies and start the dev server:

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev
```

## 🌐 Base Path (GitHub Pages)

This site is deployed to **GitHub Pages**, so the base path is set to `/cowellcomplab/` in `vite.config.ts`. GitHub Pages serves project sites at `https://<username>.github.io/<repo-name>/`, which is why all assets and routes use this prefix.

- **Config**: `base: "/cowellcomplab/"` in `vite.config.ts`
- **Production URL**: `https://<username>.github.io/cowellcomplab/`

When running locally with `pnpm dev`, Vite uses this base path as well, so the dev URL is `http://localhost:5173/cowellcomplab/`.
This could be changed after the custom domain is purchased.

# ✏️ How to Add New Contents

Content lives in `src/content/` as Markdown files with YAML frontmatter. The **filename** becomes the slug (used in URLs and for linking). Add a new `.md` file in the appropriate folder and use one of the templates below.

Image link could be relative path or global path (already uploaded in the internet)

Below data schema could be changed later...

---

### 📰 News

**Location:** `src/content/news/<slug>.md`  
**Slug example:** `2026-02-members-at-chi` → URL `/cowellcomplab/news/2026-02-members-at-chi`

```
---
title: Your news title
date: "2026-02"
category: News
image: optional-image-url.png
---

Your content in Markdown...
```

---

### 👤 Person (Lab Member)

**Location:** `src/content/people/<slug>.md`

```
---
name: Jane Doe
title: MS Student
degree: MS                    # This should be PHD / MS / BS
program: Computer Science
school: Georgia Tech
isCurrent: true               # In case of alumni, :false
dateEntered: 2025-08
dateLeft: 2025-08
currentAffiliation: Ph.D. Student at XYZ University
image: "https://example.com/photo.jpg"
email: jane@gatech.edu
website: janedoe.com
googleScholar: "https://scholar.google.com/"
---
```

---

### 📄 Publication

**Location:** `src/content/publications/<slug>.md`  
**Slug example:** `smith2026title` → URL `/cowellcomplab/publications/smith2026title`
Use this slug when linking from projects or people.

```
---
title: "Full paper title"
authors: "John Smith, Jane Doe"
year: 2026
month: 4
venue: "CHI"
type: Conference
image: "./img/publications/smith2026title.png"
people:
  - john-smith
  - jane-doe
doi: optional
pdf: optional-url
award: optional
abstract: optional
shortTitle: optional
---

Optional articles in Markdown...
```

---

### 🗂️ Project

**Location:** `src/content/projects/<slug>.md`  
**Slug example:** `my-project` → URL `/cowellcomplab/projects/my-project`

```
---
title: Project Title
description: Brief description for the projects list
image: ./img/projects/my-project.png
publications:
  - smith2026title
  - doe2025paper
---

Project details in Markdown...
```
