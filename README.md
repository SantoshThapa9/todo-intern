# Todo List Application - MERN Stack

A full-stack todo list application built with Node.js/Express backend and Next.js frontend for the MERN/Nest/Node.js Intern Assessment.

## 🚀 Features

### Backend (Node.js/Express)

- **RESTful API** with CRUD operations for tasks
- **In-memory data storage** for simplicity
- **Input validation** and error handling
- **CORS enabled** for frontend integration
- **Health check endpoint** for monitoring

### Frontend (Next.js/React)

- **Modern UI** with Tailwind CSS
- **Responsive design** for mobile and desktop
- **Real-time task management** with API integration
- **Interactive features**: add, toggle, and delete tasks
- **Loading states** and error handling
- **Beautiful animations** and hover effects

## 📋 API Endpoints

| Method   | Endpoint     | Description            | Request Body                                  |
| -------- | ------------ | ---------------------- | --------------------------------------------- |
| `GET`    | `/tasks`     | Get all tasks          | -                                             |
| `POST`   | `/tasks`     | Create new task        | `{ "title": "string", "completed": boolean }` |
| `PUT`    | `/tasks/:id` | Update task completion | `{ "completed": boolean }`                    |
| `DELETE` | `/tasks/:id` | Delete task by ID      | -                                             |
| `GET`    | `/health`    | Health check           | -                                             |

## 🛠️ Tech Stack

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **CORS** - Cross-origin resource sharing
- **Nodemon** - Development server with auto-reload

### Frontend

- **Next.js 15** - React framework
- **React 19** - UI library
- **Tailwind CSS** - Utility-first CSS framework
- **ESLint** - Code linting

## 📦 Installation & Setup

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager

### Backend Setup

1. **Navigate to backend directory:**

   ```bash
   cd backend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the development server:**

   ```bash
   npm start
   ```

   Or run with nodemon for auto-reload:

   ```bash
   npx nodemon server.js
   ```

4. **Verify backend is running:**
   - Server will start at `http://localhost:5000`
   - Health check: `http://localhost:5000/health`

### Frontend Setup

1. **Navigate to frontend directory:**

   ```bash
   cd frontend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the development server:**

   ```bash
   npm run dev
   ```

4. **Open the application:**
   - Frontend will be available at `http://localhost:3000`

## 🧪 Testing the Application

### Backend API Testing

You can test the API endpoints using tools like Postman, curl, or your browser:

1. **Get all tasks:**

   ```bash
   curl http://localhost:5000/tasks
   ```

2. **Create a new task:**

   ```bash
   curl -X POST http://localhost:5000/tasks \
     -H "Content-Type: application/json" \
     -d '{"title": "Complete assignment", "completed": false}'
   ```

3. **Update task completion:**

   ```bash
   curl -X PUT http://localhost:5000/tasks/1 \
     -H "Content-Type: application/json" \
     -d '{"completed": true}'
   ```

4. **Delete a task:**
   ```bash
   curl -X DELETE http://localhost:5000/tasks/1
   ```

### Frontend Testing

1. **Add a new task:**

   - Type a task title in the input field
   - Click "Add" button
   - Verify the task appears in the list

2. **Toggle task completion:**

   - Click the circular checkbox next to any task
   - Verify the task gets a strike-through effect
   - Click again to uncheck

3. **Delete a task:**

   - Click the trash icon next to any task
   - Confirm deletion in the popup
   - Verify the task is removed from the list

4. **Test responsive design:**
   - Resize browser window or use browser dev tools
   - Verify the UI adapts to different screen sizes

## 📁 Project Structure

```
todo-internshala/
├── backend/
│   ├── package.json
│   ├── package-lock.json
│   └── server.js          # Express server with API endpoints
├── frontend/
│       ├── package.json
│       ├── next.config.mjs
│       ├── tailwind.config.js
│       └── src/
│           └── app/
│               ├── layout.js      # Root layout
│               ├── page.js        # Main todo app component
│               └── globals.css    # Global styles
└── README.md
```

## 🔧 Development Scripts

### Backend Scripts

- `npm start` - Start the server
- `npx nodemon server.js` - Start with auto-reload

### Frontend Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🎯 Key Features Implemented

### ✅ Backend Requirements

- [x] GET /tasks endpoint
- [x] POST /tasks endpoint with title and completed fields
- [x] PUT /tasks/:id endpoint for updating completion status
- [x] DELETE /tasks/:id endpoint
- [x] In-memory data storage
- [x] Input validation (title required, completed boolean)

### ✅ Frontend Requirements

- [x] Task list display
- [x] Add new task form
- [x] Toggle completion functionality
- [x] Delete task functionality
- [x] Responsive design with Tailwind CSS
- [x] Strike-through effect for completed tasks
- [x] Full API integration

### ✅ Additional Features

- [x] Loading states and error handling
- [x] Confirmation dialogs for deletions
- [x] Beautiful UI with gradients and shadows
- [x] Health check endpoint
- [x] Comprehensive error handling
- [x] Mobile-responsive design

## 🚨 Troubleshooting

### Common Issues

1. **Backend not starting:**

   - Ensure port 5000 is not in use
   - Check if all dependencies are installed
   - Verify Node.js version (v18+)

2. **Frontend not connecting to backend:**

   - Ensure backend is running on port 5000
   - Check CORS configuration
   - Verify API endpoints are accessible

3. **CORS errors:**
   - Backend has CORS enabled for all origins
   - If issues persist, check browser console for specific errors

## 📝 Notes

- This is a development setup with in-memory storage
- Data will be lost when the server restarts
- For production, consider adding a database (MongoDB, PostgreSQL)
- The frontend is configured to connect to `localhost:5000` for the backend

## 👨‍💻 Author

**Santosh Thapa**

- Portfolio: [santoshthapa.xyz](https://www.santoshthapa.xyz)
- Built for MERN/Nest/Node.js Intern Assessment

---

**Happy coding! 🎉**
