#Firebase AUTH + Todo App (React)
A full-stack React application with **Firebase Authentication** and **Firebase Realtime Database** that allows users to **sign up, log in, and manage personal todo lists** in real time.
## Features
User Authentication (Sign Up / Login / Logout)
Firebase Realtime Database integration
Add, edit, mark complete, and delete todos
User-specific data (each user sees only their own todos)
Clean and responsive UI
Real-time updates
## Tech Stack

Frontend : React (Hooks)
Backend : Firebase Authentication
Database : Firebase Realtime Database
Styling : CSS
Routing Logic : Auth-based conditional rendering
 Setup Steps

### 1️⃣ Clone the Repository
```bash
git clone 
cd 
2️⃣ Install Dependencies
bash
Copy code
npm install
3️⃣ Create Firebase Project
Go to https://console.firebase.google.com

Create a new project

Enable:

Authentication → Email/Password

Realtime Database
4️⃣ Configure Firebase
Create a file:

css
Copy code
src/Components/LoginSignup/Firebase.js
Add your Firebase config:

js
Copy code
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  databaseURL: "YOUR_DATABASE_URL",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
  }

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getDatabase(app);
5️⃣ Run the App
bash
cd Loginsignup
npm start

npm run dev

The app will run on:
http://localhost:5176

🧠 Approach & Design Explanation
Authentication Handling

Firebase Authentication manages login and signup

onAuthStateChanged is used to track user session

UI switches automatically between Login and Todo screen

Database Structure
users
 └── userId
      ├── firstName
      ├── lastName
      ├── email
      └── todos
           └── todoId
                ├── task
                └── isdone
Todo Logic
Todos are stored under the logged-in user's UID

CRUD operations handled using Firebase Realtime Database

Real-time updates using onValue()

UI Rendering

Conditional rendering based on auth state

Responsive card-based layout

Clean UX with edit, save, cancel actions


