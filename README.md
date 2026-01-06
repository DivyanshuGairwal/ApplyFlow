ApplyFlow

Job Application Tracker (Frontend)

🔗 Live Demo: https://apply-flow-58ee.vercel.app

ApplyFlow is a lightweight, frontend-focused job application tracker designed to help candidates keep track of job applications and their progress across different hiring stages in a simple and structured way.

This project focuses on clean UI, practical workflows, and production-ready deployment rather than unnecessary complexity.

Features

Add, edit, and delete job applications

Track application status: Applied, Interview, Offer, Rejected

Search and filter applications by company name or status

Dashboard-style overview of application progress

Persistent data storage using browser localStorage

Fast, responsive UI built with React and Vite

Deployed on Vercel

Tech Stack

Frontend: React, JavaScript (ES6+)

Build Tool: Vite

Styling: CSS (component-based)

State Management: React Hooks

Data Persistence: Browser localStorage

Deployment: Vercel

Version Control: Git & GitHub

Project Structure
src/
 ├── components/    # Reusable UI components
 ├── assets/        # Static assets
 ├── styles/        # Global and component styles
 ├── App.jsx        # Main application logic
 └── main.jsx       # Application entry point

Purpose

The goal of this project was to build a realistic frontend application that mirrors an actual job-search workflow. It was developed to:

Practice CRUD-based application logic in React

Improve component structuring and state management

Understand client-side data persistence without a backend

Gain experience deploying a production-ready frontend application

The codebase is structured in a way that allows future backend integration if needed.

Running Locally
git clone https://github.com/DivyanshuGairwal/ApplyFlow.git
cd ApplyFlow
npm install
npm run dev


The application will be available at:
http://localhost:5173

Author

Divyanshu Gairwal
GitHub: https://github.com/DivyanshuGairwal

Notes

ApplyFlow is intentionally kept simple and frontend-focused.
The emphasis is on clarity, usability, and clean implementation rather than overengineering.
