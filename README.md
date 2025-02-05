# Internship Portal (MERN Stack)

## 📌 Overview
This is a **full-stack Internship Portal** built using the **MERN stack (MongoDB, Express, React, Node.js)**. It allows users to **register, apply for internships, and manage profiles**, while **admins can post internship opportunities and manage interns**.

## 🔥 Features
- User Authentication (Login/Signup)
- Internship Listings (Admin can add internships)
- Internship Application Form (Users can apply for internships)
- Admin Dashboard (Manage internships & interns)
- Responsive UI with Tailwind CSS
- Secure API with JWT Authentication
- Backend with Express.js and MongoDB

## 🛠️ Tech Stack
- **Frontend:** React.js, Vite, Tailwind CSS
- **Backend:** Node.js, Express.js, MongoDB
- **Authentication:** JWT (JSON Web Token)
- **Database:** MongoDB (Mongoose ODM)

## 🚀 Installation & Setup
### 1️⃣ Clone the Repository
```sh
git clone https://github.com/yourusername/internship-portal.git
cd internship-portal
```

### 2️⃣ Install Dependencies
#### Backend Setup:
```sh
cd backend
npm install
```

#### Frontend Setup:
```sh
cd ../frontend
npm install
```

### 3️⃣ Set Up Environment Variables
Create a `.env` file in the backend directory and add:
```sh
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 4️⃣ Run the Application
#### Start the Backend Server:
```sh
cd backend
npm run dev
```

#### Start the Frontend:
```sh
cd frontend
npm run dev
```

## 📌 API Endpoints
### User Routes
- `POST /api/v1/user/register` → Register a new user
- `POST /api/v1/user/login` → Login user
- `GET /api/v1/user/logout` → Logout user

### Internship Routes
- `POST /api/v1/internships` → Admin adds internship
- `GET /api/v1/internships` → Get all internships
- `POST /api/v1/internships/apply` → User applies for internship

## 🔐 Authentication & Authorization
- **Users** can register, login, view internships, and apply.
- **Admins** can create internships and manage applicants.
- **JWT Tokens** are used for secure authentication.

## 🎨 UI/UX
- Fully responsive using **Tailwind CSS**
- Clean and modern design for **better user experience**

## 🛠️ Future Enhancements
- Internship certificate generation for selected candidates
- Email notifications for applications
- Enhanced admin dashboard with analytics

## 📝 License
This project is licensed under the [MIT License](LICENSE).

---
### 👨‍💻 Developed by Priyanshu Kumar Pandey 🚀
