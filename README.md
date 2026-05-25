# React + FastAPI Authentication System

A modern full stack authentication system built using **React.js** and **FastAPI** featuring secure login/signup functionality, JWT authentication, password validation, loading states, toast notifications, and a modern glassmorphism UI.

---

# Features

## Frontend Features

- Modern glassmorphism UI
- Responsive authentication forms
- Login & Signup pages
- Show / Hide password
- Password strength checker
- Password requirement validation
- Remember Me functionality
- Loading states
- Toast notifications
- Form reset after submission
- Protected routing structure ready

---

## Backend Features

- FastAPI
- SQLAlchemy
- PostgreSQL
- Passlib
- Python-JOSE
- Uvicorn

---

# Tech Stack

## Frontend

- React.js
- React Router DOM
- Axios
- React Toastify
- CSS3

---

## Backend

- FastAPI
- SQLAlchemy
- PostgreSQL
- Passlib
- Python-JOSE
- Uvicorn

---

# Project Structure

```bash
Form/
│
├── backend/
│   └── bff/
│       ├── app/
│       ├── clients/
│       ├── core/
│       ├── database/
│       ├── models/
│       ├── routers/
│       ├── schemas/
│       ├── services/
│       ├── main.py
│       └── requirements.txt
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── styles/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
└── README.md
```

---

# Authentication Flow

```text
React Frontend
      ↓
Axios API Request
      ↓
FastAPI Backend
      ↓
Password Hash Verification
      ↓
JWT Token Generation
      ↓
Token Stored in LocalStorage
```

---

# Installation

## 1. Clone Repository

```bash
git clone https://github.com/priyanshutamta15oct-stack/react-fastapi-auth-system.git
```

---

## 2. Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

## 3. Backend Setup

```bash
cd backend/bff
```

Create virtual environment:

```bash
python -m venv venv
```

Activate venv:

### Windows

```bash
.\venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Run server:

```bash
uvicorn main:app --reload
```

Backend runs on:

```bash
http://127.0.0.1:8000
```

---

# API Endpoints

## Signup

```http
POST /auth/signup
```

---

## Login

```http
POST /auth/login
```

---

# Password Validation Rules

- Minimum 8 characters
- Must contain a number
- Must contain a special character

---

# UI Features

- Blur glassmorphism card
- Animated hover effects
- Modern input styling
- Interactive password visibility toggle
- Real-time validation feedback

---

# Future Improvements

- Dashboard page
- User profile system
- Logout functionality
- Refresh tokens
- PostgreSQL integration
- Docker support
- Deployment on Render/Vercel
- OAuth authentication
- Email verification

---

# Concepts Implemented

## Frontend Concepts

- React Hooks
- Controlled Components
- State Management
- Conditional Rendering
- Form Handling
- API Integration

---

## Backend Concepts

- JWT Authentication
- Password Hashing
- Dependency Injection
- SQLAlchemy ORM
- SQLite Persistence

---

# Author

**Priyansh Tamta**

Python FastAPI Developer | Agentic AI developer
