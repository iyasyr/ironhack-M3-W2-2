# React Labs (Vite + TS)

Small project with **3 labs**: animated landing, styled contact form, and CRUD with JSONPlaceholder.

## Tech
- React + TypeScript (Vite)
- Framer Motion
- CSS
- React Router

## Requirements
- Node **>=22.12.0**

## Quick Start
```bash
npm install
npm run dev           # http://localhost:5173
# build / preview
npm run build
npm run preview
```

## Routes
- `/` or `/home` – Landing  
- `/hobbies` – Hobbies grid  
- `/music` – Songs list  
- `/contact` – Contact form  
- `/posts` – Posts CRUD
- `/*` - 404

---

## Lab 1 — Personal Landing + Data
- Show **H1** (name), **H2** (surname), profile image (put in `/public`), and an external link.
- Components: `<Hobbies />`, `<SongList />`.
- Songs JSON (`src/data/songs.json`) – fields in **English**:
  ```json
  [
    { "title": "", "album": "", "albumImage": "", "duration": 0, "rating": 0 }
  ]
  ```

## Lab 2 — Contact Form (CSS)
- Fields: name, email, subject, message.
- Inline validation + visible focus states.
- **Honeypot** anti-spam field (`website`) hidden via CSS.
- Submission is **mocked** (no real backend). Status message on success/fail.

## Lab 3 — Posts CRUD (JSONPlaceholder)
- API: `https://jsonplaceholder.typicode.com/posts`
- **Read** on mount: `GET /posts?_limit=12`
- **Create**: `POST /posts` (optimistic add)
- **Update**: `PUT /posts/:id`
- **Delete**: `DELETE /posts/:id` (with `confirm`)
- Uses a client-only `cid` for React keys (JSONPlaceholder often returns `id: 101` for new posts).
- Sections/cards animate on first render via Framer Motion.

--- 

**Edit content in** `src/pages/*` & `src/components/*`.  
**Images** in `/public`. **Styles** in `src/index.css`.
