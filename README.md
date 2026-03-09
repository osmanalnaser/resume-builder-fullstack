# Resume Builder — Fullstack

<div align="center">

![Resume Builder](https://img.shields.io/badge/Resume_Builder-Fullstack-C9A84C?style=for-the-badge)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.x-6DB33F?style=for-the-badge&logo=springboot)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)
![MongoDB](https://img.shields.io/badge/MongoDB-4.4-47A248?style=for-the-badge&logo=mongodb)
![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?style=for-the-badge&logo=docker)
![JWT](https://img.shields.io/badge/JWT-Secured-000000?style=for-the-badge&logo=jsonwebtokens)
![PayPal](https://img.shields.io/badge/PayPal-Integrated-003087?style=for-the-badge&logo=paypal)

**A full-stack resume builder application with JWT authentication, PayPal payments, and live PDF export.**  
Built with Spring Boot 3 + React 18, fully containerized with Docker.

[Live Demo](https://resume-builder-fullstack.vercel.app) · [Report Bug](https://github.com/osmanalnaser/resume-builder-fullstack/issues) · [Backend Docs](https://github.com/osmanalnaser/resumebuilderapi/blob/main/README.md) · [Frontend Docs](https://github.com/osmanalnaser/resume-builder/blob/main/README.md)

</div>

---

## Screenshots


| Landing Page | Dashboard | Resume Editor |
|---|---|---|
| ![Landing](screenshots/landing.png) | ![Dashboard](screenshots/dashboard.png) | ![Editor](screenshots/editor.png) |

| Templates | Payment | Mobile |
|---|---|---|
| ![Templates](screenshots/templates.png) | ![Payment](screenshots/payment.png) 

---

## Overview

Resume Builder is a full-stack web application that allows users to create, edit, and export professional resumes. The application features a premium dark UI, real-time live preview, multiple resume templates, and a PayPal-powered subscription system for premium features.

---

## Features

**Authentication & Security**
- JWT-based stateless authentication
- BCrypt password hashing
- Email verification on registration
- Protected routes (frontend + backend)

**Resume Management**
- Create, edit, update, delete resumes
- Real-time live preview as you type
- Sections: Personal Info, Experience, Education, Skills, Languages, Certifications
- One-click PDF export via react-to-print

**Templates**
- 1 free template available to all users
- 2 premium templates locked behind subscription
- Template selection page with visual previews

**Payments**
- PayPal Sandbox integration
- Create order → redirect to PayPal → verify payment
- Automatic premium plan upgrade on successful payment

**Infrastructure**
- Fully containerized with Docker Compose
- MongoDB for data persistence
- Cloudinary for profile image storage
- Nginx for production frontend serving

---

## Tech Stack

### Backend
| Technology | Version | Purpose |
|---|---|---|
| Java | 21 | Programming Language |
| Spring Boot | 3.x | Application Framework |
| Spring Security | 6.x | Authentication & Authorization |
| Spring Data MongoDB | 4.x | Database ORM |
| MongoDB | 4.4 | NoSQL Database |
| JWT (jjwt) | 0.11.5 | Token Authentication |
| PayPal REST SDK | 1.14.0 | Payment Processing |
| Cloudinary | 1.34.0 | Image Storage |
| SendGrid | - | Email Verification |
| Lombok | - | Boilerplate Reduction |

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| React | 18 | UI Framework |
| Vite | 5 | Build Tool |
| React Router DOM | 6 | Client Routing |
| Axios | - | HTTP Client |
| Tailwind CSS | 3 | Styling |
| react-to-print | - | PDF Export |

### Infrastructure
| Technology | Purpose |
|---|---|
| Docker | Containerization |
| Docker Compose | Multi-container orchestration |
| Nginx | Frontend production server |

---

## Project Structure

```
resume-builder-fullstack/
├── backend/                        # Spring Boot API
│   ├── src/
│   │   └── main/java/in/osmanalnaser/resumebuilderapi/
│   │       ├── config/             # Security, MongoDB, Cloudinary config
│   │       ├── controller/         # REST controllers
│   │       ├── document/           # MongoDB documents (User, Resume, Payment)
│   │       ├── dto/                # Request/Response DTOs
│   │       ├── exception/          # Global exception handling
│   │       ├── repository/         # MongoDB repositories
│   │       ├── security/           # JWT filter & entry point
│   │       ├── service/            # Business logic
│   │       └── util/               # JWT util & constants
│   ├── Dockerfile
│   └── README.md
├── frontend/                       # React + Vite App
│   ├── src/
│   │   ├── components/             # ProtectedRoute
│   │   ├── context/                # AuthContext
│   │   ├── pages/                  # LandingPage, Dashboard, ResumeEditor, etc.
│   │   └── utils/
│   ├── Dockerfile
│   ├── nginx.conf
│   └── README.md
├── screenshots/                    # App screenshots for README
├── docker-compose.yml              # Full stack orchestration
└── README.md                       # This file
```

---

## Quick Start with Docker

### Prerequisites
- Docker Desktop installed and running
- PayPal Sandbox account
- Cloudinary account
- Gmail account (for email verification)

### 1. Clone the repository
```bash
git clone https://github.com/osmanalnaser/resume-builder-fullstack.git
cd resume-builder-fullstack
```

### 2. Create `.env` file
```env
PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_SECRET=your_paypal_secret
CLOUD_NAME=your_cloudinary_name
CLOUD_KEY=your_cloudinary_api_key
CLOUD_SECRET=your_cloudinary_api_secret
SENDGRID_API_KEY=your_sendgrid_api_key
```

### 3. Start everything
```bash
docker-compose up --build
```

| Service | URL |
|---|---|
| Frontend | http://localhost |
| Backend API | http://localhost:8080 |
| Health Check | http://localhost:8080/actuator/health |
| MongoDB | mongodb://localhost:27017 |

---

## API Endpoints

### Auth
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/auth/register` | ✗ | Register new user |
| POST | `/api/auth/login` | ✗ | Login and receive JWT |
| GET | `/api/auth/verify-email?token=` | ✗ | Verify email |
| POST | `/api/auth/upload-image` | ✗ | Upload profile image |

### Resumes
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/resumes` | ✓ | Get all resumes |
| POST | `/api/resumes` | ✓ | Create resume |
| GET | `/api/resumes/:id` | ✓ | Get resume by ID |
| PUT | `/api/resumes/:id` | ✓ | Update resume |
| DELETE | `/api/resumes/:id` | ✓ | Delete resume |

### Payments
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/payment/create-order` | ✓ | Create PayPal order |
| POST | `/api/payment/verify` | ✓ | Verify and activate premium |

---

## Architecture

```
┌─────────────────────────────────────────────┐
│                Docker Compose                │
│                                             │
│  ┌──────────┐    ┌──────────┐    ┌───────┐  │
│  │ Frontend │    │ Backend  │    │ Mongo │  │
│  │  :80     │───▶│  :8080   │───▶│ :27017│  │
│  │  Nginx   │    │Spring Bot│    │       │  │
│  └──────────┘    └──────────┘    └───────┘  │
│                       │                     │
│              ┌────────┴────────┐            │
│              │                 │            │
│         ┌────────┐      ┌──────────┐        │
│         │PayPal  │      │Cloudinary│        │
│         │Sandbox │      │   CDN    │        │
│         └────────┘      └──────────┘        │
└─────────────────────────────────────────────┘
```

---

## Development Setup (without Docker)

### Backend
```bash
cd backend
./mvnw spring-boot:run
# Runs on http://localhost:8080
```

### Frontend
```bash
cd frontend
npm install
npm run dev
# Runs on http://localhost:5173
```

---

## License

MIT License — see [LICENSE](LICENSE) for details.

---

<div align="center">
Built with Spring Boot 3 · React 18 · MongoDB · Docker
</div>

---

## Support

If you like this project, consider giving it a ⭐ on GitHub!