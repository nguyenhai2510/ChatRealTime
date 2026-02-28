# 💬 Real-time Chat Application

A fullstack real-time chat application built with modern web technologies.

This project is developed as a personal learning project to practice:
- Backend architecture
- Authentication with JWT
- MongoDB database design
- Real-time communication
- State management in React

---

## 🚀 Tech Stack

### 🔹 Backend
- Node.js
- Express
- MongoDB + Mongoose
- JWT (Access & Refresh Token)
- bcrypt (Password hashing)
- cookie-parser
- CORS

### 🔹 Frontend
- React (Vite)
- Zustand (State Management)
- Axios (with interceptors)

---

## 📁 Project Structure
chat-app/
├── backend/
│ ├── src/
│ │ ├── controllers/
│ │ ├── models/
│ │ ├── routes/
│ │ ├── middlewares/
│ │ └── server.js
│ └── .env
│
├── frontend/
│ ├── src/
│ └── vite.config.js
│
└── README.md


---

## 🔐 Features (Current)

- ✅ User registration
- ✅ Password hashing with bcrypt
- ✅ MongoDB integration
- 🔄 Login with JWT (in progress)
- 🔄 Refresh token flow
- 🔄 Real-time chat (coming soon)

---

## ⚙️ Installation

### 1️⃣ Clone the repository
git clone 

---

### 2️⃣ Setup Backend
lib: express cors mongoose  dotenv
cd backend
npm install
Create `.env` file inside backend:
  PORT=5001
  MONGO_URI=your_mongodb_connection_string
  ACCESS_SECRET=your_access_secret
  REFRESH_SECRET=your_refresh_secret

Run backend:
  npm run dev

---

### 3️⃣ Setup Frontend
cd frontend
npm install
npm run dev

-------------------------------------------------------------------------------------------------------------------------


---

## 🧠 Learning Goals

This project helps me practice:

- REST API design
- Authentication flow (Access + Refresh Token)
- Database schema design
- Error handling in Express
- Clean project architecture

---

## 📌 Roadmap

- [ ] Login API with JWT
- [ ] Protected routes middleware
- [ ] Refresh token mechanism
- [ ] Real-time messaging with Socket.io
- [ ] Friend system
- [ ] Conversation & Message models
- [ ] Online/offline status
- [ ] Group chat

---

## 👨‍💻 Author

Developed by Dev buồn nhất thế giới

---

## 📄 License

This project is for learning purposes.