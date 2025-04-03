# MERN Stack Internal Practical Exam – QR Code Generation & Scanning System

## 🧩 Problem Statement
Create a **QR Code Generation & Scanning System** using the **MERN stack**. Users should be able to:
- Generate a **QR code** for a given URL or text.
- Scan a **QR code** using their device's camera.
- View a **history of scanned QR codes**.
- **Authenticate users** via signup/login (JWT-based).
- **Download** generated QR codes as images.
- **Copy QR Code URL** to clipboard.
- **Share QR Code** via email.
- **Filter QR Codes** by date range.
- **Paginate the QR code history**.

---

## 🛠️ Tech Stack
**Frontend:** React (Vite) + Axios + react-qr-reader  
**Backend:** Node.js + Express + JWT Authentication  
**Database:** MongoDB + Mongoose  
**QR Code Generation:** `qrcode` library  
**QR Code Scanning:** `react-qr-reader`  
**Email Sharing:** Nodemailer  

---

## 📦 Folder Structure
```
project-root/
├── client/                     # React Frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── index.css
│   │   └── index.html
│   ├── package.json
│   └── vite.config.js
│
├── server/                     # Express Backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   ├── .env.example
│   ├── app.js
│   ├── package.json
│   └── uploads/
│
├── README.md
└── .gitignore
```

---

## 📝 Tasks to Complete

### 1️⃣ Backend Setup
✅ Set up an **Express server** and connect to **MongoDB**.  
✅ Create a **User Authentication System** with JWT (Signup/Login).  
✅ Create a **QR Code Schema** in MongoDB with fields:
   - **text** (URL or text input)  
   - **userId** (reference to user)  
   - **generatedAt** (timestamp)  
✅ Build REST API Endpoints:
   - `POST /api/auth/signup` → User Signup
   - `POST /api/auth/login` → User Login
   - `POST /api/qrcodes` → Generate a new QR code
   - `GET /api/qrcodes` → Get all generated QR codes (with pagination & filters)
   - `DELETE /api/qrcodes/:id` → Delete a specific QR code
   - `POST /api/qrcodes/share` → Share QR code via email  

### 2️⃣ Frontend Implementation
✅ Create a React form to input text and generate a QR code.  
✅ Use the `qrcode` library to generate QR codes dynamically.  
✅ Display generated QR codes in a **grid layout**.  
✅ Implement **QR Code Scanning** using `react-qr-reader`.  
✅ Show a **history of scanned QR codes** with timestamps.  
✅ Implement **user authentication (Login/Signup with JWT)**.  
✅ **Download QR Code** as an image.  
✅ **Copy QR Code URL** to clipboard.  
✅ **Filter QR Codes** by **date range**.  
✅ **Paginate QR Code History**.  
✅ **Share QR Code via Email**.  

---

## 🔧 Setup Instructions

### **Clone the Repository**
```bash
git clone https://github.com/YourUsername/MERN-QR-Code-System.git
```

### **Install Dependencies**
**Backend:**
```bash
cd server
npm install
```
**Frontend:**
```bash
cd client
npm install
```

### **Configure Environment**
Copy `.env.example` to `.env` inside `/server` and fill in your credentials.

### **Run the Application**
**Backend:**
```bash
cd server
npm run dev
```
**Frontend:**
```bash
cd client
npm run dev
```

---

## 📎 Deployment (Optional)
If deployed, include the live app URL here:  
🔗 **Live App:** _[Your Deployed App URL]_
