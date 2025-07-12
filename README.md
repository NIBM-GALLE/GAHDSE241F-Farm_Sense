# 🌾 FarmSense - Smart Crop Disease Prediction & Monitoring System

FarmSense is a full-stack web application designed to assist farmers with early detection of crop diseases through image-based prediction. It provides real-time communication and task coordination between farmers, sub-center admins, visit agents, and researchers — all aimed at improving agricultural productivity in Sri Lanka.

> 🔔 **Note:** This repository includes only the **client (React.js)** and **server (Node.js + Express.js)**.  
> The **Flask ML prediction server** must be set up separately using this repo:  
> 👉 [Plant Disease Recognition System](https://github.com/Soap171/Plant-Disease-Recognition-System)

---

## 🚀 Features

- 🌿 Image-based crop disease detection using ML model
- 🔒 Role-based access system (Super Admin, Sub-Center Admin, Visit Agent, Researcher, Farmer)
- 📷 Image upload & case submission by farmers
- 📩 Task assignment & escalation by sub-center admins
- 🧪 Expert diagnosis and recommendations by researchers
- 📨 Real-time chat and notifications
- 📊 Central dashboard for analytics and reports

---

## 🛠️ Tech Stack

**Frontend**

- React.js (Vite)
- Zustand (State Management)
- Tailwind CSS & Shadcn UI
- React Router

**Backend**

- Node.js + Express.js
- MongoDB Atlas (NoSQL database)
- JWT Authentication
- Mailtrap API for Email Notifications

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/farmsense.git
cd farmsense
```

---

### 2️⃣ Backend Setup

```bash
cd server
npm install
```

#### ✅ Create a `.env` file in the `/server` directory with the following:

```env
PORT=5050
MONGO_URI=mongodb+srv://...
ACCESS_TOKEN_SECRET=...
REFRESH_TOKEN_SECRET=...
MAILTRAP_ENDPOINT=send.api.mailtrap.io
CLIENT_URL=http://localhost:5173
```

#### ⚠️ Initial Setup Requirement

Before starting the server, you **must manually create a Super Admin** in your MongoDB database using the `admin.model.js` schema.

> This Super Admin account is required to:
>
> - Create Sub Centers & Sub-Center Admins
> - Add Research Divisions & Research Admins

Then, start the backend server:

```bash
npm start
```

---

### 3️⃣ ML Prediction Server (Flask)

Set up the machine learning server using the following repository:

🔗 **Repo:** [https://github.com/Soap171/Plant-Disease-Recognition-System](https://github.com/Soap171/Plant-Disease-Recognition-System)

---

### 4️⃣ Frontend Setup

```bash
cd ../client
npm install
```

#### ✅ Create a `.env` file in the `/client` directory:

```env
VITE_API_URL=http://localhost:5050
```

Then, start the frontend:

```bash
npm run dev
```

---

## 🔁 Application Flow

1. **Super Admin** creates Sub Centers and Research Divisions
2. **Farmers** register and submit plant disease cases with images
3. **Flask ML server** processes the image and returns predictions
4. **Sub-Center Admins** assign Visit Agents or escalate to Researchers
5. **Researchers** analyze and submit diagnosis & recommendations

---

## 👨‍💻 Authors

- GAHDSE241F-007 W.M.S.P. Jayathunga
- GAHDSE241F-008 M. Malshi Himangana
- GAHDSE241F-025 Sawindu Samuditha

---
