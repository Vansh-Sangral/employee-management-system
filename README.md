# Employee Management System

## Project Overview

Employee Management System is a full-stack web application developed to manage employee records efficiently. The application allows users to create, view, update, and delete employee information while providing dashboard statistics for employee management.

The system includes employee search, filtering, dashboard analytics, and complete CRUD operations with a responsive user interface.

---

## Tech Stack

### Frontend

* React.js
* React Router DOM
* Axios
* React Hook Form
* Tailwind CSS

### Backend

* Node.js
* Express.js

### Database
## Database

The application uses MongoDB Atlas as the primary database for storing employee records. All employee data is persisted and remains available after server restarts.
* MongoDB Atlas
* Mongoose

### Deployment

* Frontend: Vercel
* Backend: Render
* Database: MongoDB Atlas

---

## Features

### Dashboard

* Total Employees Count
* Active Employees Count
* Inactive Employees Count

### Employee Management

* Add Employee
* View Employee Details
* Edit Employee
* Delete Employee

### Search & Filters

* Search Employee by Name
* Filter by Department
* Filter by Status

### Validation & Error Handling

* Form Validation
* API Error Handling
* Proper HTTP Status Codes

### User Experience

* Responsive Design
* Reusable Components
* Clean UI

---

## Folder Structure

employee-management-system/

client/
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── constants/
│   ├── utils/
│   ├── routes/
│   └── App.jsx

server/
├── config/
├── controllers/
├── models/
├── routes/
├── middleware/
├── utils/
└── server.js

README.md

---

## Setup Instructions

### Clone Repository

```bash
git clone <repository-url>
cd employee-management-system
```

### Backend Setup

```bash
cd server
npm install
```

Create a `.env` file inside the server folder:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
```

Start Backend Server

```bash
npm run dev
```

### Frontend Setup

```bash
cd client
npm install
npm start
```

Frontend runs on:

```text
http://localhost:3000
```

Backend runs on:

```text
http://localhost:5000
```

---

## API Documentation

### Get Dashboard Statistics

```http
GET /api/employees/dashboard
```

Response

```json
{
  "totalEmployees": 50,
  "activeEmployees": 42,
  "inactiveEmployees": 8
}
```

---

### Get All Employees

```http
GET /api/employees
```

Query Parameters

```http
?search=john
?department=IT
?status=Active
```

Example

```http
GET /api/employees?search=john&department=IT&status=Active
```

---

### Get Employee By ID

```http
GET /api/employees/:id
```

---

### Create Employee

```http
POST /api/employees
```

Request Body

```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "mobileNumber": "9876543210",
  "department": "IT",
  "designation": "Software Engineer",
  "joiningDate": "2025-01-01",
  "status": "Active"
}
```

---

### Update Employee

```http
PUT /api/employees/:id
```

---

### Delete Employee

```http
DELETE /api/employees/:id
```

---

## Development Flow

1. Requirement Analysis
2. Database Schema Design
3. Backend API Development
4. API Testing
5. Frontend Development
6. API Integration
7. Validation & Error Handling
8. Responsive UI Development
9. Deployment
10. Documentation

---

## Application Flow

1. User opens the application.
2. Dashboard displays employee statistics.
3. User navigates to Employee Listing.
4. User can search employees by name.
5. User can filter employees by department and status.
6. User can add a new employee.
7. User can edit employee information.
8. User can delete employee records.
9. Dashboard statistics update automatically based on employee data.

---

## Assumptions

* Employee email addresses are unique.
* Status can only be Active or Inactive.
* Only valid employee records are stored in the database.
* Authentication and authorization are not included as they are outside the scope of the assignment.
* Dashboard statistics are calculated dynamically from employee records.

---

## Future Enhancements

* Authentication & Authorization
* Role-Based Access Control
* Pagination
* Export to Excel/PDF
* Employee Profile Picture Upload
* Audit Logs
* Advanced Search & Sorting
* Unit & Integration Testing

---

## Author

Developed as part of a Full Stack Developer Assessment.
