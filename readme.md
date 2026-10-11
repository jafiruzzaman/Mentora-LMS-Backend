# 🎓 Mentora LMS API

A production-oriented **Learning Management System REST API** built with **TypeScript, Express.js, PostgreSQL, and Drizzle ORM**.

Mentora provides the backend infrastructure for an online learning platform where instructors can create and manage courses, students can purchase and enroll in courses, access lessons, manage wishlists and carts, and leave course reviews.

The project follows a **modular layered architecture** with clear separation between routes, controllers, services, repositories, validation, database models, and middleware.

---

## ✨ Features

### 🔐 Authentication & Authorization

- User registration
- User login
- User logout
- JWT-based authentication
- Access and refresh token flow
- Password change
- Forgot password
- Reset password
- Email verification
- Resend verification email
- Role-based authorization
- Secure protected routes

### 📚 Course Management

- Create courses
- Update courses
- Delete courses
- Retrieve individual courses
- Browse available courses
- Search courses
- Filter courses by:
  - Category
  - Sub-category
  - Level
  - Minimum price
- Pagination support
- Course status management

### 🗂️ Categories & Sub-Categories

- Create categories
- Update categories
- Delete categories
- Retrieve categories
- Create sub-categories under categories
- Update sub-categories
- Delete sub-categories
- Retrieve sub-categories by category

### 📖 Course Modules

- Create modules inside courses
- Retrieve course modules
- Retrieve individual modules
- Update modules
- Delete modules
- Position-based module ordering

### 🎥 Lessons

- Create lessons inside modules
- Upload lesson videos
- Retrieve lessons by module
- Retrieve individual lessons
- Update lessons
- Delete lessons
- Multipart form-data upload support

### 🎓 Enrollment

- Enroll students into courses
- Retrieve student enrollments
- Retrieve individual enrollment
- Retrieve enrolled course information

### 🛒 Cart

- Add courses to cart
- Retrieve cart
- Remove individual cart items
- Clear entire cart

### ❤️ Wishlist

- Add courses to wishlist
- Retrieve wishlist
- Remove courses from wishlist

### 📦 Orders

- Create orders
- Retrieve user orders
- Retrieve individual order details
- Support multiple course items per order

### 💳 Payments

- Create checkout sessions
- Payment history
- Retrieve individual payment information
- Webhook endpoint for payment events

### ⭐ Course Reviews

- Add course reviews
- Retrieve reviews for a course
- Retrieve individual reviews
- Update reviews
- Delete reviews
- Course rating support

---

# 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| TypeScript | Primary programming language |
| Express.js | REST API framework |
| PostgreSQL | Relational database |
| Drizzle ORM | Database ORM/query builder |
| Zod | Request and environment validation |
| JWT | Authentication |
| Pino | Application logging |
| Multer | Multipart file uploads |
| Stripe | Payment processing |
| Object Storage | Lesson video storage |
| Bruno | API development and testing |
| OpenAPI 3 | API specification |

---

# 🏗️ Architecture

Mentora uses a modular layered architecture.

```text
Request
   │
   ▼
┌──────────────┐
│    Routes    │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│  Validation  │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│  Controller  │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│   Service    │
│ Business     │
│ Logic        │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ Repository   │
│ Data Access  │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ Drizzle ORM  │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ PostgreSQL   │
└──────────────┘
```

This separation keeps business logic independent from HTTP handling and database access, making the application easier to maintain, test, and extend.

---

# 📁 Project Structure

```text
src/
├── config/
│   ├── db.ts
│   └── env.ts
│
├── middleware/
│   ├── auth.middleware.ts
│   ├── error.middleware.ts
│   └── role.middleware.ts
│
├── modules/
│   ├── auth/
│   ├── cart/
│   ├── category/
│   ├── course/
│   ├── enrollment/
│   ├── lessons/
│   ├── modules/
│   ├── order/
│   ├── payment/
│   ├── review/
│   ├── sub-category/
│   ├── user/
│   └── wishlist/
│
├── routes/
├── utils/
├── app.ts
└── index.ts
```

A typical feature module follows a structure similar to:

```text
course/
├── course.controller.ts
├── course.interface.ts
├── course.repository.ts
├── course.routes.ts
├── course.service.ts
└── course.validation.ts
```

---

# 🌐 API Base URL

### Local Development

```text
http://localhost:8080/api/v1
```

---

# 🔌 API Endpoints

## Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | `/auth/sign-up` | Register a new user |
| POST | `/auth/sign-in` | Sign in |
| POST | `/auth/sign-out` | Sign out |
| POST | `/auth/refresh` | Refresh authentication token |
| POST | `/auth/change-password` | Change password |
| POST | `/auth/forgot-password` | Request password reset |
| POST | `/auth/reset-password` | Reset password |
| POST | `/auth/send-verification-email` | Send verification email |
| POST | `/auth/resend-email` | Resend verification email |
| POST | `/auth/verify-email` | Verify email |

---

## Categories

| Method | Endpoint | Description |
|---|---|---|
| POST | `/category` | Create category |
| GET | `/category` | Get all categories |
| GET | `/category/:categoryId` | Get category |
| PATCH | `/category/:categoryId` | Update category |
| DELETE | `/category/:categoryId` | Delete category |

---

## Sub-Categories

| Method | Endpoint | Description |
|---|---|---|
| POST | `/sub-category/category/:categoryId` | Create sub-category |
| GET | `/sub-category/category/:categoryId` | Get sub-categories by category |
| GET | `/sub-category/:subCategoryId` | Get sub-category |
| PATCH | `/sub-category/:subCategoryId` | Update sub-category |
| DELETE | `/sub-category/:subCategoryId` | Delete sub-category |

---

## Courses

| Method | Endpoint | Description |
|---|---|---|
| POST | `/course` | Create course |
| GET | `/course` | Get courses |
| GET | `/course/:courseId` | Get course |
| PATCH | `/course/:courseId` | Update course |
| DELETE | `/course/:courseId` | Delete course |

### Course Filters

```text
GET /course?search=react
GET /course?min_price=2500
GET /course?category_id=<uuid>
GET /course?sub_category_id=<uuid>
GET /course?level=INTERMEDIATE
GET /course?limit=10
```

Filters can be combined:

```text
GET /course?search=react&level=INTERMEDIATE&min_price=1000&limit=10
```

---

## Course Modules

| Method | Endpoint | Description |
|---|---|---|
| POST | `/modules/course/:courseId` | Create module |
| GET | `/modules/course/:courseId` | Get course modules |
| GET | `/modules/:moduleId` | Get module |
| PATCH | `/modules/:moduleId` | Update module |
| DELETE | `/modules/:moduleId` | Delete module |

---

## Lessons

| Method | Endpoint | Description |
|---|---|---|
| POST | `/lessons/modules/:moduleId` | Create lesson |
| GET | `/lessons/modules/:moduleId` | Get module lessons |
| GET | `/lessons/:lessonId` | Get lesson |
| PATCH | `/lessons/:lessonId` | Update lesson |
| DELETE | `/lessons/:lessonId` | Delete lesson |

Lesson creation and updates support:

```text
multipart/form-data
```

Example fields:

```text
title
description
duration
video
```

---

## Enrollment

| Method | Endpoint | Description |
|---|---|---|
| POST | `/enrollment/:courseId/enroll` | Enroll in course |
| GET | `/enrollment` | Get enrollments |
| GET | `/enrollment/:enrollmentId` | Get enrollment |
| GET | `/enrollment/course/:courseId` | Get enrolled course |

---

## Cart

| Method | Endpoint | Description |
|---|---|---|
| POST | `/cart/:courseId` | Add course to cart |
| GET | `/cart` | Get cart |
| DELETE | `/cart/:courseId` | Remove cart item |
| DELETE | `/cart/clear` | Clear cart |

---

## Wishlist

| Method | Endpoint | Description |
|---|---|---|
| POST | `/wishlist/:courseId` | Add course to wishlist |
| GET | `/wishlist` | Get wishlist |
| DELETE | `/wishlist/:courseId` | Remove course from wishlist |

---

## Orders

| Method | Endpoint | Description |
|---|---|---|
| POST | `/orders` | Create order |
| GET | `/orders` | Get orders |
| GET | `/orders/:orderId` | Get order |

Example request:

```json
{
  "order_items": [
    {
      "course_id": "d2ef00a3-3bba-4f58-823d-bf37df96e25f"
    }
  ]
}
```

---

## Payments

| Method | Endpoint | Description |
|---|---|---|
| POST | `/payments/checkout` | Create checkout session |
| POST | `/payments/webhook` | Handle payment webhook |
| GET | `/payments/my-payment` | Get payment history |
| GET | `/payments/:paymentId` | Get payment |

Example checkout request:

```json
{
  "order_id": "ce051fad-7868-42a8-a02c-baae43d8b943"
}
```

---

## Reviews

| Method | Endpoint | Description |
|---|---|---|
| POST | `/review/course/:courseId` | Add course review |
| GET | `/review/course/:courseId` | Get course reviews |
| GET | `/review/:reviewId` | Get review |
| PATCH | `/review/course/:courseId/:reviewId` | Update review |
| DELETE | `/review/course/:courseId/:reviewId` | Delete review |

Example:

```json
{
  "message": "Excellent course with practical explanations.",
  "rating": "4.8"
}
```

---

# 🔐 Authentication

Protected endpoints use bearer authentication.

```http
Authorization: Bearer <access_token>
```

The API uses an access/refresh-token authentication flow for maintaining user sessions securely.

---

# 👥 Roles

Mentora supports role-based access control.

```text
ADMIN
INSTRUCTOR
STUDENT
```

Different API operations can be restricted based on authentication state and user role.

---

# 💳 Purchase Flow

The high-level course purchase flow is:

```text
Student
   │
   ▼
Add Course to Cart
   │
   ▼
Create Order
   │
   ▼
Create Checkout Session
   │
   ▼
Stripe Checkout
   │
   ▼
Payment Webhook
   │
   ├──── Payment Failed
   │
   └──── Payment Successful
              │
              ▼
        Confirm Purchase
              │
              ▼
        Course Enrollment
              │
              ▼
        Student Access
```

---

# 🎓 Course Structure

Courses follow a hierarchical structure:

```text
Category
   │
   └── Sub Category
          │
          └── Course
                 │
                 ├── Module 1
                 │     ├── Lesson 1
                 │     ├── Lesson 2
                 │     └── Lesson 3
                 │
                 └── Module 2
                       ├── Lesson 1
                       └── Lesson 2
```

---

# ⚙️ Getting Started

## 1. Clone the repository

```bash
git clone <your-repository-url>
cd <your-project-directory>
```

## 2. Install dependencies

Using Bun:

```bash
bun install
```

## 3. Configure environment variables

Create a `.env` file in the project root.

```env
NODE_ENV=development
PORT=8080

DATABASE_URL=

ACCESS_TOKEN_SECRET=
REFRESH_TOKEN_SECRET=

# Email
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=

# Stripe
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

# Object storage
STORAGE_ENDPOINT=
STORAGE_ACCESS_KEY=
STORAGE_SECRET_KEY=
STORAGE_BUCKET=
```

> Environment variable names may differ depending on your local configuration. Never commit `.env` or production secrets to Git.

## 4. Run database migrations

Use the migration command configured in the project.

For a Drizzle-based setup this may look similar to:

```bash
bunx drizzle-kit generate
bunx drizzle-kit migrate
```

## 5. Start development server

```bash
bun run dev
```

The API should then be available at:

```text
http://localhost:8080/api/v1
```

---

# 📑 API Documentation

The API specification follows **OpenAPI 3.0**.

API requests are developed and maintained using **Bruno**, with the collection capable of being exported as an OpenAPI specification.

The API documentation covers:

- Authentication
- Categories
- Sub-categories
- Courses
- Modules
- Lessons
- Enrollment
- Cart
- Wishlist
- Orders
- Payments
- Reviews

---

# 🧪 API Testing

The API can be tested using Bruno or another OpenAPI-compatible API client.

Example health/API request:

```bash
curl http://localhost:8080/api/v1/course
```

Authenticated request:

```bash
curl \
  -H "Authorization: Bearer <access_token>" \
  http://localhost:8080/api/v1/enrollment
```

---

# 🛡️ Security

The backend incorporates several security practices, including:

- JWT authentication
- Access and refresh token separation
- Password hashing
- Request validation
- Role-based authorization
- Email verification
- Password reset tokens
- Protected routes
- Centralized error handling
- Environment-based secret management
- Payment webhook verification

Sensitive values such as database credentials, JWT secrets, API keys, payment secrets, and SMTP credentials must never be committed to the repository.

---

# 🚀 Development Goals

Mentora is being developed as a production-oriented backend rather than a simple CRUD demonstration.

The architecture is designed to support future functionality such as:

```text
Course Progress Tracking
        │
        ├── Lesson Progress
        ├── Module Progress
        └── Course Completion

Instructor Dashboard
        │
        ├── Course Analytics
        ├── Student Analytics
        └── Revenue Analytics

Student Dashboard
        │
        ├── Purchased Courses
        ├── Learning Progress
        └── Certificates
```

---

# 🤝 Contributing

Contributions, issues, and feature suggestions are welcome.

To contribute:

```bash
git checkout -b feature/your-feature
```

After making your changes:

```bash
git add .
git commit -m "feat: add your feature"
git push origin feature/your-feature
```

Then open a pull request.

---

# 📄 License

This project is licensed under the **Apache License 2.0**.

---

# 👨‍💻 Author

**Mohammad Jafiruzzaman**

Computer Science & Engineering student and backend/full-stack developer focused on building scalable, maintainable, and production-oriented web applications.

---

> **Mentora LMS API** — A modular backend for course creation, learning, enrollment, purchasing, payments, and student engagement.