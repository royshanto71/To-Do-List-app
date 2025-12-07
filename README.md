# TaskFlow - Modern To-Do List Application

A full-stack task management application built with the MERN stack (MongoDB replaced with Neon PostgreSQL), featuring secure JWT authentication, comprehensive CRUD operations, and a modern responsive UI.

![TaskFlow Banner](https://via.placeholder.com/1200x400/1a1a2e/6366f1?text=TaskFlow+-+Modern+Task+Management)

## ✨ Features

### Authentication
- 🔐 Secure user registration and login
- 🔑 JWT-based authentication with token refresh
- 👤 User profile management
- 🚪 Protected routes

### Task Management
- ✅ Create, read, update, and delete tasks
- 🎯 Priority levels (High, Medium, Low) with visual indicators
- 📅 Due dates with overdue detection
- ✔️ Mark tasks as complete/incomplete
- 🔍 Filter by priority, status, and due date
- 📊 Sort by date, priority, or title

### Dashboard
- 📈 Task statistics (total, completed, pending, overdue)
- 🥧 Priority distribution chart
- ⏰ Upcoming deadlines widget
- 📱 Mobile-responsive design

### UI/UX
- 🌙 Beautiful dark theme with glassmorphism effects
- ✨ Smooth animations and transitions
- 📱 Mobile-first responsive design
- 🎨 Modern, professional aesthetics

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **React Router v6** - Client-side routing
- **Context API** - State management
- **Axios** - HTTP client
- **Lucide React** - Icons
- **date-fns** - Date utilities

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **Prisma** - ORM
- **PostgreSQL (Neon)** - Database
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **express-validator** - Input validation

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Neon PostgreSQL account (or any PostgreSQL database)

### Installation

1. **Clone the repository**
   ```bash
   cd "e:/Vibe Projects/To-Do List app"
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   ```

3. **Configure Environment Variables**
   
   Edit `backend/.env` and update the database connection:
   ```env
   DATABASE_URL="postgresql://username:password@host/database?sslmode=require"
   JWT_SECRET="your-secure-secret-key"
   ```

4. **Initialize Database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Setup Frontend**
   ```bash
   cd ../frontend
   npm install
   ```

### Running the Application

1. **Start Backend Server** (Terminal 1)
   ```bash
   cd backend
   npm run dev
   ```
   Server runs at: http://localhost:5000

2. **Start Frontend Dev Server** (Terminal 2)
   ```bash
   cd frontend
   npm run dev
   ```
   App runs at: http://localhost:5173

## 📁 Project Structure

```
To-Do List app/
├── backend/
│   ├── prisma/
│   │   └── schema.prisma      # Database schema
│   ├── src/
│   │   ├── config/            # Database configuration
│   │   ├── controllers/       # Request handlers
│   │   ├── middleware/        # Auth, validation, error handling
│   │   ├── routes/            # API routes
│   │   ├── services/          # Business logic
│   │   └── server.js          # Express app entry
│   └── package.json
│
├── frontend/
│   ├── public/                # Static assets
│   ├── src/
│   │   ├── components/        # React components
│   │   │   ├── auth/          # Login, Register forms
│   │   │   ├── common/        # Button, Input, Modal, Loader
│   │   │   ├── dashboard/     # Dashboard widgets
│   │   │   ├── layout/        # Header, Layout
│   │   │   └── tasks/         # Task components
│   │   ├── context/           # Auth and Task context
│   │   ├── hooks/             # Custom hooks
│   │   ├── pages/             # Page components
│   │   ├── services/          # API service
│   │   ├── styles/            # CSS files
│   │   ├── utils/             # Helper functions
│   │   ├── App.jsx            # Main app component
│   │   └── main.jsx           # Entry point
│   ├── index.html
│   └── package.json
│
└── README.md
```

## 🔌 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/me` | Get current user |
| PUT | `/api/auth/profile` | Update profile |
| PUT | `/api/auth/password` | Change password |
| POST | `/api/auth/logout` | Logout |

### Tasks
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | Get all tasks (with filters) |
| GET | `/api/tasks/:id` | Get single task |
| POST | `/api/tasks` | Create task |
| PUT | `/api/tasks/:id` | Update task |
| DELETE | `/api/tasks/:id` | Delete task |
| PATCH | `/api/tasks/:id/toggle` | Toggle completion |
| GET | `/api/tasks/stats` | Get task statistics |
| GET | `/api/tasks/upcoming` | Get upcoming deadlines |

### Query Parameters for GET /api/tasks
- `priority` - Filter by priority (LOW, MEDIUM, HIGH)
- `completed` - Filter by status (true, false)
- `sortBy` - Sort field (createdAt, dueDate, priority)
- `sortOrder` - Sort direction (asc, desc)
- `page` - Page number
- `limit` - Items per page

## 📝 License

MIT License - feel free to use this project for learning or personal use.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

Built with ❤️ using React, Node.js, and Neon PostgreSQL
