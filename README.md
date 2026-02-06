# ELDA Test

A full-stack monorepo application for managing employees and their roles in a calendar scheduling system. Built with a Node.js/Express backend and a React frontend.
Project only started recently

## 🎯 Project Overview

This is a technical test project that demonstrates a full-stack implementation with:

- **Backend**: Node REST API
- **Frontend**: React app
- **Database**: SQLite 
- **Code Quality**: ESLint and Prettier

## 📦 Prerequisites

- Node >= 24

## 📥 Installation

### 2. Initialize the Project

Run init script to install dependencies, set up environment files and init database with seed:

```bash
npm run init
```

## Launch app

### Fullstack Dev Mode 

Start both the backend server and frontend development server in parallel:

```bash
npm run dev
```

### Individual Services

**Backend only:**
```bash
npm run dev:server
```

**Frontend only:**
```bash
npm run dev:client
```

### Production Mode

**Build the project:**
```bash
npm run build
```

**Start the backend server:**
```bash
npm start
```

## 🔧 Development

### Code Quality

**Lint the code:**
```bash
# Backend
npm run lint --prefix backend

# Frontend
npm run lint --prefix frontend
```

**Auto-fix lint issues:**
```bash
# Backend
npm run lint:fix --prefix backend

# Frontend
npm run lint --prefix frontend -- --fix
```

### Running Database Seeds

Initialize or reset the database with seed data:

```bash
npm run init --prefix backend
```

## 🏗️ Building

Build both the backend and frontend for production:

```bash
npm run build
```

## 📝 Environment Configuration

The project uses environment files for configuration:
- **Backend**: `backend/.env` (copied from `backend/.env.dev`)
- **Frontend**: `frontend/.env` (copied from `frontend/.env.dev`)

## 🐛 Issues & Support

For bug reports and feature requests, please visit: https://github.com/gsebdev/elda_test/issues
