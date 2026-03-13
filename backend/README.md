# SimSoft Technologies - Backend API

This is the fully functioning REST API backend for the SimSoft Technologies web platform. It is built in Node.js, Express, and MongoDB.

## Prerequisites
- Node.js >= 18
- MongoDB (running locally or a network cluster URI)

## Installation & Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment:**
   Copy the example environment file and update your keys/URIs.
   ```bash
   cp .env.example .env
   ```

3. **Seed the database:**
   This command creates the default Admin user credentials.
   ```bash
   npm run seed
   # Default email: admin@simsoft.tn
   # Default password: Admin@2025
   ```

4. **Start the server:**
   ```bash
   npm run dev
   # Server will start on http://localhost:5000
   ```

## Authentication & JWT

Most write routes require a JWT token. Send the Token obtained from `/api/auth/login` as an Authorization header.

**Format:**
```
Authorization: Bearer <your_jwt_token_here>
```

## API Endpoints

### Authentication (Public)

- **POST `/api/auth/login`**
  - **Body:** `{ "email": "admin@simsoft.tn", "password": "..." }`
  - **Returns:** JWT Token and user info

### Articles

- **GET `/api/articles`** (Public)
  - **Query optional:** `?page=1&limit=10`
  - **Returns:** List of published articles with pagination data.

- **GET `/api/articles/:slug`** (Public)
  - **Returns:** Full article data by slug.

- **POST `/api/articles`** (Admin)
  - **Body example:** `{ "title": "New", "content": "..." }`
  - **Returns:** Created article instance. (Slug auto-generated from title).

- **PUT `/api/articles/:id`** (Admin)
  - **Body:** Fields to update.
  - **Returns:** Updated article.

- **PATCH `/api/articles/:id/publish`** (Admin)
  - Toggle published state.

- **DELETE `/api/articles/:id`** (Admin)
  - Deletes the article.

### Contact Information

- **POST `/api/contact`** (Public)
  - **Body example:** `{ "name": "John", "email": "j@doe.com", "message": "Hi" }`

- **GET `/api/contact`** (Admin)
  - **Returns:** List of all submitted contact forms.
