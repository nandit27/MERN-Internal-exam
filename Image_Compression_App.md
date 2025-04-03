# MERN Stack Internal Practical Exam - Image Compression & Analytics App

## 🧩 Problem Statement
Create an **Image Compression & Analytics App** using the MERN stack. Users should be able to upload images, compress them, and download the optimized versions. The system should track logs and provide analytics such as number of compressions, total size saved, and user activity.

---
## 🛠️ Tech Stack
**Frontend:** React (Vite) + Axios + Chart.js (for analytics) + Tailwind CSS  
**Backend:** Node.js + Express  
**Database:** MongoDB + Mongoose  
**File Upload:** Multer  
**Image Processing:** Sharp  
**Logging & Analytics:** Winston (for logs), MongoDB Aggregations (for analytics)  

---
## 📦 Folder Structure
```
project-root/
├── client/                     # React Frontend
│   ├── public
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   |── index.css
│   │   └── index.html
│   ├── package.json
│   └── vite.config.js
│
├── server/                     # Express Backend
│   ├── config/
│   │   ├── database.js
│   │   ├── logger.js
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── uploads/
│   ├── .env.example
│   ├── app.js
│   └── package.json
│
├── README.md
└── .gitignore
```

---
## 📝 Tasks to Complete
### **Backend Tasks:**
- [ ] Set up Express server and connect to MongoDB
- [ ] Implement image upload using Multer
- [ ] Use Sharp for image compression
- [ ] Store original and compressed image details in MongoDB
- [ ] Implement logging with Winston (track uploads, errors, and downloads)
- [ ] Build REST API endpoints:
  - [ ] `POST /api/images` (Upload & Compress Image)
  - [ ] `GET /api/images` (Fetch uploaded images)
  - [ ] `GET /api/images/:id/download` (Download compressed image)
  - [ ] `GET /api/analytics` (Fetch compression statistics)

### **Frontend Tasks:**
- [ ] Create a UI to upload images
- [ ] Display original & compressed images with details
- [ ] Implement a **chart-based analytics dashboard** (size reduction %, total compressions, etc.)
- [ ] Add download button for compressed images
- [ ] Show logs of user activity (uploads, downloads, errors)

### **Bonus Features:**
- [ ] Allow users to set compression quality level
- [ ] Implement authentication with JWT
- [ ] Deploy using **Render/Heroku + Netlify**

---
## 🔧 Setup Instructions
### **Clone the repository**
```bash
git clone https://github.com/your-repo/MERN-Image-Compression.git
```
### **Install dependencies**
#### **Backend:**
```bash
cd server
npm install
```
#### **Frontend:**
```bash
cd client
npm install
```
### **Configure environment**
Copy `.env.example` to `.env` inside `/server` and fill in your credentials.

### **Run the application**
#### **Backend:**
```bash
cd server
npm run dev
```
#### **Frontend:**
```bash
cd client
npm run dev
```

---
## 📌 API Endpoints
| Method | Endpoint | Description |
|--------|---------|-------------|
| POST | `/api/images` | Upload & Compress Image |
| GET | `/api/images` | Fetch uploaded images |
| GET | `/api/images/:id/download` | Download compressed image |
| GET | `/api/analytics` | Fetch compression statistics |

---
## 🔗 Deployment (Optional)
If deployed, include the app URL here:  
**Live App:** [Your Deployed URL]
