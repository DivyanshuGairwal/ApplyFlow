# ApplyFlow – Job Application Tracker
   
ApplyFlow is a simple full-stack job application tracker built to help students and job seekers organize and track their job applications across different hiring stages.

The project focuses on practical CRUD workflows, clean UI, and understanding how a React frontend communicates with a basic backend API.


Live Demo (Frontend): https://apply-flow-58ee.vercel.app
  
--- 
              
## Features
  
### Frontend (React + Vite)
- Dashboard overview showing application statistics (Total, Applied, Interview, Offer, Rejected)
- Add, edit, and delete job applications           
- Status-based tracking to reflect hiring stages
- Search and filter applications by company or status  
- Dark mode with persisted theme preference
- Responsive layout for desktop and mobile
 
### Backend (Node.js + Express)        
- REST-style CRUD APIs for managing job applications
- CORS-enabled API for frontend communication  
- In-memory data storage for demonstration purposes (data resets on server restart)

---

## Tech Stack

Frontend:
- React
- JavaScript (ES6+)
- Vite
- CSS (component-based styling)
- Fetch API

Backend:
- Node.js
- Express.js
- CORS

State Management:
- React Hooks (useState, useEffect)

Deployment:
- Frontend: Vercel
- Backend: Local development (not deployed)

---

## Project Structure

ApplyFlow/
├── backend/
│   ├── package.json
│   └── server.js
├── src/
│   ├── components/
│   │   ├── AddJobForm.jsx
│   │   ├── DashboardStats.jsx
│   │   ├── Header.jsx
│   │   ├── JobCard.jsx
│   │   ├── JobFilter.jsx
│   │   └── ThemeToggle.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
└── vite.config.js

---

## Getting Started (Local Setup)

### Prerequisites
- Node.js installed on your system

### Running the Backend
The backend runs on port 5000.

cd backend  
npm install  
node server.js  

### Running the Frontend
Open a new terminal in the root project directory.

npm install  
npm run dev  

The frontend will be available at:  
http://localhost:5173

---

## API Endpoints

Base URL: http://localhost:5000/api/jobs

GET /  
Fetch all job applications

POST /  
Create a new job application  
Body: { company, role, status, notes }

PUT /:id  
Update an existing job  
Body: { company, role, status, notes }

DELETE /:id  
Delete a job application

---

## Purpose

This project was built to:
- Practice full CRUD workflows in a real-world application
- Understand frontend–backend interaction using REST APIs
- Improve component design and state management in React
- Gain experience deploying a production-ready frontend

The backend is intentionally kept lightweight to focus on fundamentals rather than overengineering.

---

## Future Improvements

- Persist data using a database (MongoDB or PostgreSQL)
- User authentication (login/signup)
- Deploy backend to a cloud platform (Render or Railway)
- Advanced analytics and reporting

---

## Author

Divyanshu Gairwal  
GitHub: https://github.com/DivyanshuGairwal
