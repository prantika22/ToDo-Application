# Todoify - Full-Stack To-Do Application

A professional, modular To-Do application built with React (Frontend), Node.js/Express (Backend), and PostgreSQL (Database).

## Features

- **Modern UI**: Dark-themed, glassmorphism UI built with Vanilla CSS and React.
- **Modular Backend**: Clean separation of concerns with dedicated controllers and routes.
- **Robust Data Management**: PostgreSQL integration using Knex.js for migrations and queries.
- **Full CRUD**: Create, Read, Update (toggle status), and Delete tasks.

## Technology Stack

- **Frontend**: React, Vite, Axios, Lucide-React
- **Backend**: Node.js, Express, Knex.js, PostgreSQL
- **Dev Tools**: Dotenv, Nodemon

## Database Configuration

The application is configured to connect to a PostgreSQL database with the following details:

- **Host**: `192.168.20.117`
- **Port**: `5432`
- **Username**: `aipoc`
- **Database**: `todo_app1`

## Getting Started

### 1. Backend Setup
Navigate to the `server` directory and install dependencies:
```bash
cd server
npm install
```

Configure your environment variables in `server/.env` (already created):
```env
PORT=5000
DB_HOST=192.168.20.117
DB_PORT=5432
DB_USER=aipoc
DB_PASSWORD=aipoc@123
DB_NAME=todo_app1
```

Run migrations:
```bash
npx knex migrate:latest
```

Start the server:
```bash
npm run dev
```

### 2. Frontend Setup
Navigate to the `client` directory and install dependencies:
```bash
cd client
npm install
```

Start the React application:
```bash
npm run dev -- --port 3000
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Project Structure

```text
├── client/          # React application (Vite)
│   ├── src/
│   │   ├── services/ # API integration
│   │   ├── App.jsx   # Main UI logic
│   │   └── index.css # Global styles
├── server/          # Node.js/Express API
│   ├── controllers/ # Request handlers
│   ├── routes/      # API route definitions
│   ├── db/          # Database config & migrations
│   └── index.js     # Entry point
└── README.md
```
