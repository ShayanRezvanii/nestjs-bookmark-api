# 📚 NestJS Bookmark API

A secure and scalable REST API for managing bookmarks, built with [NestJS](https://nestjs.com/).

---

## ✨ Features

- 🔐 **JWT Authentication**
- 🔁 **Refresh Token Support**
- 🎭 **Role-based Access Control (RBAC)**
- 📄 **Swagger API Documentation**
- 🧪 **Validation with class-validator**
- 🗄 **SQLite with TypeORM**

---

## 🚀 Getting Started

### 📦 Installation

```bash
git clone https://github.com/your-username/nestjs-bookmark-api.git
cd nestjs-bookmark-api
npm install
```

### ▶️ Run the app

```bash
npm run start:dev
```

App will start at: `http://localhost:3000`

---

## 🔐 Authentication Routes

| Method | Endpoint        | Description              |
| ------ | --------------- | ------------------------ |
| POST   | `/auth/signup`  | Register a new user      |
| POST   | `/auth/login`   | Login and get JWT tokens |
| POST   | `/auth/refresh` | Refresh access token     |
| POST   | `/auth/logout`  | Logout user              |
| GET    | `/auth/me`      | Get user profile         |

---

## 📌 Bookmark Routes

| Method | Endpoint        | Access     | Description             |
| ------ | --------------- | ---------- | ----------------------- |
| GET    | `/bookmarks`    | Admin only | View all bookmarks      |
| GET    | `/bookmarks/me` | User only  | View personal bookmarks |
| POST   | `/bookmarks`    | Auth only  | Create a new bookmark   |

---

## 📘 Swagger Documentation

> After starting the app, visit:

```
http://localhost:3000/api
```

Authorize with your JWT token using the Authorize 🔓 button.

---

## ⚙️ Tech Stack

- [NestJS](https://nestjs.com/)
- [TypeORM](https://typeorm.io/)
- [SQLite](https://www.sqlite.org/index.html)
- [Swagger](https://swagger.io/)
- [JWT](https://jwt.io/)
- [bcrypt](https://github.com/kelektiv/node.bcrypt.js)
- [class-validator](https://github.com/typestack/class-validator)

---

## 🧪 Environment Setup

`.env` example:

```env
PORT=3000
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=refresh-secret
```

---

## 👨‍💻 Author

Made with ❤️ by [Your Name]
