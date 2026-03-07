# Resume Builder — Backend API

<div align="center">

![Resume Builder](https://img.shields.io/badge/Resume_Builder-Frontend-C9A84C?style=for-the-badge)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.x-6DB33F?style=for-the-badge&logo=springboot)
![MongoDB](https://img.shields.io/badge/MongoDB-4.4-47A248?style=for-the-badge&logo=mongodb)
![Java](https://img.shields.io/badge/Java-21-ED8B00?style=for-the-badge&logo=openjdk)
![Docker](https://img.shields.io/badge/Docker-Containerized-2496ED?style=for-the-badge&logo=docker)
![JWT](https://img.shields.io/badge/JWT-Secured-000000?style=for-the-badge&logo=jsonwebtokens)

**A production-ready REST API for the Resume Builder resume builder.**  
Built with Spring Boot 3, secured with JWT, integrated with PayPal and Cloudinary.

[Frontend Repository](https://github.com/osmanalnaser/resume-builder) · [API Docs](#api-endpoints) · [Report Bug](#)

</div>

---

## Features

- **JWT Authentication** — Stateless authentication with access tokens and secure password hashing (BCrypt)
- **Email Verification** — Account activation via JavaMailSender with verification tokens
- **Resume CRUD** — Full create, read, update, delete operations for resumes with MongoDB
- **PayPal Integration** — Create payment orders and verify transactions for premium subscriptions
- **Cloudinary Upload** — Profile image upload via Cloudinary CDN
- **Global Exception Handling** — Consistent error responses with proper HTTP status codes
- **Spring Security** — Custom JWT filter, authentication entry point, and CORS configuration
- **Dockerized** — Production-ready Docker setup with MongoDB and frontend

---

## Tech Stack

| Technology | Purpose |
|---|---|
| Java 21 | Programming Language |
| Spring Boot 3 | Application Framework |
| Spring Security | Authentication & Authorization |
| Spring Data MongoDB | Database ORM |
| MongoDB 4.4 | NoSQL Database |
| JWT (jjwt 0.11.5) | Token-based Authentication |
| PayPal REST SDK | Payment Processing |
| Cloudinary | Image Storage & CDN |
| JavaMailSender | Email Verification |
| Lombok | Boilerplate Reduction |
| Docker | Containerization |

---

## Project Structure

```
src/main/java/in/osmanalnaser/resumebuilderapi/
├── config/
│   ├── CloudinaryConfig.java      # Cloudinary bean configuration
│   ├── MongoConfig.java           # MongoDB auditing configuration
│   └── SecurityConfig.java        # Spring Security + CORS + JWT filter
├── controller/
│   ├── AuthController.java        # Register, login, verify email, upload image
│   ├── ResumeController.java      # CRUD endpoints for resumes
│   ├── PaymentController.java     # PayPal create order + verify payment
│   └── EmailController.java       # Email-related endpoints
├── document/
│   ├── User.java                  # MongoDB User document
│   ├── Resume.java                # MongoDB Resume document
│   └── Payment.java               # MongoDB Payment document
├── dto/
│   ├── RegisterRequest.java       # Registration input DTO with validation
│   ├── LoginRequest.java          # Login input DTO
│   └── AuthResponse.java          # Auth response DTO (token + user data)
├── exception/
│   ├── GlobalExceptionHandler.java    # Centralized error handling
│   ├── ResourceExistsException.java   # 409 Conflict
│   └── InvalidCredentialsException.java # 401 Unauthorized
├── repository/
│   ├── UserRepository.java        # findByEmail, existsByEmail
│   ├── ResumeRepository.java      # findByUserId
│   └── PaymentRepository.java     # Payment queries
├── security/
│   ├── JwtAuthenticationFilter.java   # JWT validation on every request
│   └── JwtAuthenticationEntryPoint.java # 401 handler for unauthenticated requests
├── service/
│   ├── AuthService.java           # Register, login, email verification logic
│   ├── ResumeService.java         # Resume business logic
│   ├── PaymentService.java        # PayPal order creation & verification
│   ├── EmailService.java          # Email sending via JavaMailSender
│   └── FileUploadService.java     # Cloudinary image upload
└── util/
    ├── JwtUtil.java               # Token generation & validation
    └── AppConstants.java          # Shared constants (routes, plan types)
```

---

## Getting Started

### Prerequisites

- Java 21
- Maven 3.8+
- MongoDB running locally or MongoDB Atlas
- PayPal Sandbox account
- Cloudinary account
- Gmail account (for email verification)

### Environment Variables

Set these before running:

```bash
# Windows PowerShell
setx PAYPAL_CLIENT_ID "your_paypal_client_id"
setx PAYPAL_SECRET "your_paypal_secret"
setx CLOUD_NAME "your_cloudinary_name"
setx CLOUD_KEY "your_cloudinary_api_key"
setx CLOUD_SECRET "your_cloudinary_api_secret"
setx MAIL_USERNAME "your_gmail@gmail.com"
setx MAIL_PASSWORD "your_gmail_app_password"
```

### Local Development

```bash
# Clone the repository
git clone https://github.com/osmanalnaser/resumebuilderapi.git
cd resumebuilderapi

# Build and run
./mvnw spring-boot:run
```

API will be available at `http://localhost:8080`

### Build JAR

```bash
./mvnw package -DskipTests
```

---

## Docker

### Run with Docker Compose (recommended)

```bash
# From the root directory containing docker-compose.yml
docker-compose up --build
```

### docker-compose.yml

```yaml
version: '3.8'
services:
  mongodb:
    image: mongo:4.4
  backend:
    build: ./resumebuilderapi
    ports:
      - "8080:8080"
    environment:
      - SPRING_DATA_MONGODB_URI=mongodb://mongodb:27017/resumebuilder
      - JWT_SECRET=your_secret
      - PAYPAL_CLIENT_ID=${PAYPAL_CLIENT_ID}
      - PAYPAL_SECRET=${PAYPAL_SECRET}
      - CLOUD_NAME=${CLOUD_NAME}
      - CLOUD_KEY=${CLOUD_KEY}
      - CLOUD_SECRET=${CLOUD_SECRET}
      - MAIL_USERNAME=${MAIL_USERNAME}
      - MAIL_PASSWORD=${MAIL_PASSWORD}
  frontend:
    build: ./resume-builder
    ports:
      - "80:80"
```

---

## API Endpoints

### Auth

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/auth/register` | ✗ | Register new user |
| POST | `/api/auth/login` | ✗ | Login and receive JWT |
| GET | `/api/auth/verify-email?token=` | ✗ | Verify email address |
| POST | `/api/auth/upload-image` | ✗ | Upload profile image to Cloudinary |

### Resumes

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/resumes` | ✓ | Get all resumes for current user |
| POST | `/api/resumes` | ✓ | Create new resume |
| GET | `/api/resumes/:id` | ✓ | Get resume by ID |
| PUT | `/api/resumes/:id` | ✓ | Update resume |
| DELETE | `/api/resumes/:id` | ✓ | Delete resume |

### Payments

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/payment/create-order` | ✓ | Create PayPal order, returns approval URL |
| POST | `/api/payment/verify` | ✓ | Verify PayPal payment and upgrade to premium |

### Health

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/actuator/health` | ✗ | Application health check |

---

## Security Architecture

```
Request → JwtAuthenticationFilter
              ↓
         Extract Bearer Token
              ↓
         Validate with JwtUtil
              ↓
         Set SecurityContext
              ↓
         Controller Method
```

- Passwords hashed with **BCrypt**
- JWT signed with **HMAC-SHA256**
- Token expiry: **7 days** (604800000ms)
- CORS configured for `http://localhost:5173`
- Stateless sessions (`SessionCreationPolicy.STATELESS`)

---

## Error Responses

All errors return consistent JSON:

```json
{
  "errors": "Error message here"
}
```

| Status | Meaning |
|---|---|
| 400 | Validation failed |
| 401 | Invalid credentials or missing token |
| 409 | Resource already exists (duplicate email) |
| 500 | Internal server error |

---

## Register Request Example

```json
POST /api/auth/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword",
  "profileImageUrl": ""
}
```

## Login Response Example

```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9...",
  "name": "John Doe",
  "email": "john@example.com",
  "profileImageUrl": "",
  "subscriptionPlan": "free"
}
```

---

## Contributing

This is a student project built for a university portfolio. Feel free to fork and adapt.

---

## License

MIT License — see [LICENSE](LICENSE) for details.

---

<div align="center">
Built with Spring Boot 3 · Java 21 · MongoDB · Secured with JWT
</div>
