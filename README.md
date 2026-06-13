# Taskflow — Personal Task Manager

## About this project

This is my submission for the Associate Software Engineer assignment at Studio Graphene. I chose **Exercise 1: Personal Task Manager** because it let me focus on getting the full-stack fundamentals right — clean REST APIs, proper state management on the frontend, and a UI that's actually pleasant to use.

The app lets a single user create, view, edit, complete, and delete tasks. Each task can have a title, an optional description, a due date, and a priority level (low, medium, high). Tasks can be filtered by status, searched by title, and the app highlights overdue tasks and high-priority items so nothing important slips through.

## Live Demo

- **Frontend:** https://task-manager-1-git-main-richarani-tarases-projects.vercel.app
- **Backend API:** https://task-manager-xitl.onrender.com
> **Note:** The backend is hosted on Render's free tier, which spins down after periods of inactivity. The first request may take 30-50 seconds to respond while it wakes up.

## Tech Stack

**Frontend**
- React (Vite) — fast dev server and build tooling
- Tailwind CSS — utility-first styling, let me iterate on the UI quickly without writing separate CSS files
- Fetch API — for all communication with the backend

**Backend**
- Node.js with Express — lightweight and simple to set up for a small REST API
- UUID — for generating unique task IDs
- JSON file storage (`tasks.json`) — kept things simple per the brief, no database setup needed
- CORS — to allow the frontend (running on a different port/domain) to talk to the backend

## How to Run Locally

You'll need Node.js installed (v18 or later recommended).

### 1. Clone the repository
```bash
git clone https://github.com/Richarani-tarase/Task-Manager
cd Task-Manager
```

### 2. Start the backend
```bash
cd server
npm install
node index.js
```
The server will run on `http://localhost:3001`

### 3. Start the frontend (in a new terminal)
```bash
cd client
npm install
npm run dev
```
The app will run on `http://localhost:5173`

Make sure both the backend and frontend are running at the same time for the app to work.

## API Documentation

Base URL: `http://localhost:3001/api/tasks` (or your deployed backend URL)

| Method | Endpoint | Request Body | Response |
|--------|----------|---------------|----------|
| GET | `/api/tasks` | — | Array of all tasks, sorted newest first |
| POST | `/api/tasks` | `{ title, description, dueDate, priority }` | The newly created task object |
| PATCH | `/api/tasks/:id` | Any subset of `{ title, description, dueDate, priority, completed }` | The updated task object |
| DELETE | `/api/tasks/:id` | — | `{ message: "Task deleted successfully" }` |

### Task object shape
```json
{
  "id": "uuid-string",
  "title": "Finish assignment",
  "description": "Submit before deadline",
  "dueDate": "2026-06-17",
  "priority": "high",
  "completed": false,
  "createdAt": "2026-06-12T10:30:00.000Z"
}
```

## Project Structure

```
taskflow/

├── client/                  # React frontend

│   ├── src/

│   │   ├── components/

│   │   │   ├── TaskForm.jsx       # Add/edit task form with priority selector

│   │   │   ├── TaskItem.jsx       # Single task card with edit/delete/toggle

│   │   │   ├── TaskList.jsx       # Renders the list, handles empty state

│   │   │   ├── TaskStats.jsx      # Active/completed/high-priority counts

│   │   │   ├── FilterBar.jsx      # All / Active / Done / High priority tabs

│   │   │   └── SearchBar.jsx      # Search tasks by title or description

│   │   ├── hooks/

│   │   │   └── useTasks.js        # All API calls and task state live here

│   │   ├── utils.js                # Date formatting and overdue checking

│   │   ├── App.jsx                 # Main layout, holds filter/search state

│   │   └── main.jsx

│   └── package.json

│

├── server/                  # Express backend

│   ├── routes/

│   │   └── tasks.js          # All task CRUD routes

│   ├── data/

│   │   └── tasks.json        # Persisted task data

│   ├── index.js              # Server entry point

│   └── package.json

│

└── README.md


```
## Features Implemented

- ✅ Add a task with title (required), description, due date, and priority
- ✅ View all tasks, sorted by creation date (newest first)
- ✅ Toggle complete/incomplete
- ✅ Edit title, description, due date, and priority inline
- ✅ Delete with a confirmation prompt
- ✅ Filter by All / Active / Completed / High Priority
- ✅ Active vs completed task counts
- ✅ Overdue tasks are visually highlighted
- ✅ High-priority incomplete tasks get an extra visual flag
- ✅ Empty state when no tasks match
- ✅ Search tasks by title/description
- ✅ Tasks persist across server restarts (JSON file)

## What I'd Improve With More Time

- **Drag-and-drop reordering** — didn't implement this since it wasn't core to the brief, but would be a nice addition using a library like `dnd-kit`
- **Better date validation** — currently the due date field doesn't stop a user from picking a date far in the past; I'd add a small warning for that
- **Pagination** — not needed for a personal task list, but if task count grew large, the list could get long without it
- **Accessibility pass** — keyboard navigation for the priority buttons and checkboxes could be improved with better focus states

## A note on AI usage

I used Claude while building this — for scaffolding components, debugging a few issues, and refining the UI design. I understood and reviewed all the code before including it, and I'm happy to walk through any part of it.