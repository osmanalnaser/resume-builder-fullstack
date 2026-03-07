# Resume Builder — Frontend

<div align="center">

![Resume Builder](https://img.shields.io/badge/Resume Builder-Frontend-C9A84C?style=for-the-badge)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3-06B6D4?style=for-the-badge&logo=tailwindcss)
![Docker](https://img.shields.io/badge/Docker-Containerized-2496ED?style=for-the-badge&logo=docker)

**A premium, dark-themed resume builder frontend built with React + Vite.**  
Create, edit, and export professional resumes with live preview and PayPal payments.

[Live Demo](#) · [Backend Repository](https://github.com/osmanalnaser/resumebuilderapi) · [Report Bug](#)

</div>

---

## Screenshots

> _Add screenshots to `/screenshots` folder and update paths below_

| Landing Page | Dashboard | Resume Editor |
|---|---|---|
| ![Landing](screenshots/landing.png) | ![Dashboard](screenshots/dashboard.png) | ![Editor](screenshots/editor.png) |

---

## Features

- **Dark & Premium UI** — Custom design with gold accents, Cormorant Garamond typography, and smooth hover effects
- **JWT Authentication** — Secure login and registration with email verification flow
- **Live Resume Preview** — Real-time preview updates as you type
- **PDF Export** — One-click PDF download directly from the editor
- **Resume Templates** — Free and premium templates with lock/unlock system
- **PayPal Integration** — Seamless premium subscription upgrade via PayPal
- **Protected Routes** — Dashboard and editor only accessible when authenticated
- **Fully Responsive** — Works across desktop and mobile devices
- **Dockerized** — Single command to run the entire stack

---

## Tech Stack

| Technology | Purpose |
|---|---|
| React 18 | UI Framework |
| Vite 5 | Build Tool & Dev Server |
| React Router DOM | Client-side Routing |
| Axios | HTTP Client |
| Tailwind CSS 3 | Utility-first Styling |
| react-to-print | PDF Export |
| Docker + Nginx | Production Deployment |

---

## Project Structure

```
src/
├── components/
│   └── ProtectedRoute.jsx     # Route guard for authenticated pages
├── context/
│   └── AuthContext.jsx        # Global auth state (login, register, logout)
├── pages/
│   ├── LandingPage.jsx        # Public landing page with hero, features, pricing
│   ├── Dashboard.jsx          # Resume management dashboard
│   ├── ResumeEditor.jsx       # Full resume editor with live preview
│   ├── TemplatesPage.jsx      # Template selection (free + premium)
│   └── PaymentPage.jsx        # PayPal payment & verification
├── utils/                     # Shared utilities
└── App.jsx                    # Routing configuration
```

---

## Getting Started

### Prerequisites

- Node.js 20+
- npm 9+
- Backend API running on `http://localhost:8080`

### Local Development

```bash
# Clone the repository
git clone https://github.com/osmanalnaser/resume-builder.git
cd resume-builder

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

### Environment

The frontend connects to the backend via:
```
http://localhost:8080/api
```

To change this, update `API_BASE` in the relevant page files.

---

## Docker

### Run with Docker Compose (recommended)

This project is designed to run as part of a full-stack Docker setup together with the backend and MongoDB.

```bash
# From the root directory (where docker-compose.yml lives)
docker-compose up --build
```

| Service | URL |
|---|---|
| Frontend | http://localhost |
| Backend | http://localhost:8080 |
| MongoDB | mongodb://localhost:27017 |

### Build Frontend Image Only

```bash
docker build -t resumecraft-frontend .
docker run -p 80:80 resumecraft-frontend
```

---

## Pages & Routes

| Route | Access | Description |
|---|---|---|
| `/` | Public | Landing page |
| `/templates` | Public (use requires login) | Browse resume templates |
| `/dashboard` | Protected | Manage resumes |
| `/resume/:id` | Protected | Edit specific resume |
| `/payment` | Protected | Upgrade to premium |
| `/payment/success` | Protected | Payment success handler |
| `/payment/cancel` | Protected | Payment cancel handler |

---

## Key Design Decisions

- **Inline styles over Tailwind** for component-level precision and dynamic theming
- **AuthContext** stores JWT in `localStorage` and sets Axios default headers automatically
- **react-to-print** used for PDF export — no backend dependency required
- **ProtectedRoute** component redirects unauthenticated users to `/`
- **Nginx** serves the built React app in production with SPA fallback (`try_files`)

---

## Available Scripts

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build locally
```

---

## Contributing

This is a student project built for a university portfolio. Feel free to fork and adapt.
