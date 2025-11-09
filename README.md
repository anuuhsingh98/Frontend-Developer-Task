# Employee Dashboard Project

A full-stack web application built with **React.js** for the frontend and **Node.js + Express** for the backend. It allows users to **signup/login**, manage a **to-do list**, and view a **dashboard** with their information.

---

## **Features**

### Frontend
- Responsive **React.js** UI
- User Authentication (Signup/Login)
- Employee Dashboard
  - Display **name, email, and date**
  - Add, view, and delete **to-do tasks**
  - Logout functionality
- Protected routes using **React Router**

### Backend
- **Node.js** + **Express** server
- **MongoDB** database using **Mongoose**
- REST API routes:
  - `/signup` - Create a new user
  - `/login` - Login and get JWT token
  - `/todos` - CRUD operations on tasks (protected routes)
- Passwords hashed using **bcrypt**
- JWT authentication

---

## **Folder Structure**

project-root/
│
├── frontend/ # React frontend
│ ├── src/
│ │ ├── screens/
│ │ │ ├── Auth.jsx
│ │ │ ├── Dashboard.jsx
│ │ │ └── Auth.css
│ │ │ └── Dashboard.css
│ │ └── App.js
│ │ └── index.js
│ └── package.json
│
├── server/ # Node.js backend
│ ├── models/
│ │ ├── User.js
│ │ └── Todo.js
│ ├── middleware/
│ │ └── auth.js
│ ├── index.js
│ └── package.json
│
└── README.md
---

## **Installation**

### 1. Clone the repository

```bash
git clone https://github.com/anuuhsingh98/Frontend-Developer-Task.git
cd Frontend-Developer-Task
--------

Backend setup
cd server
npm install

Start backend server:
node index.js

Frontend Setup
cd ../frontend
npm install
npm start

Usage

Open http://localhost:3000/
 in your browser.
Signup with name, email, password.
Login using your credentials.
Access the Dashboard:
Add tasks
Delete tasks
View name, email, and date
Logout

Technologies Used
Frontend: React.js, React Router, Axios, CSS
Backend: Node.js, Express.js
Database: MongoDB, Mongoose
Authentication: JWT, bcrypt
Other: CORS, concurrent frontend-backend setup

License
This project is licensed under the MIT License.

Author
Anurag Singh
GitHub: https://github.com/anuuhsingh98
