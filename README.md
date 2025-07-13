#  Clinic Appointment Calendar

A full-featured **Appointment Management Web App** built using **React**, supporting:

*  Calendar view with **appointment scheduling**
*  Filtering by doctor and patient
*  **Dark/light theme toggle**
*  Staff-only **Login system**
*  Data stored in `localStorage`

---

## 🚀 Features

* 🗓 **Monthly and Daily Calendar View** (React Big Calendar)
*  Add new appointments via modal form
*  Edit or delete appointments
*  Filter by **doctor** and **patient** on All Appointments page
*  Dark mode toggle using Context API
*  Simple login (hardcoded for demo)
*  Redirects unauthenticated users

---

## 🛠 Tech Stack

* **Frontend**: React, Tailwind CSS, React Big Calendar, Moment.js
* **State Management**: React useState & Context API
* **Authentication**: Simple email/password check stored in `localStorage`

---

## 📂 Project Structure

```
📁 src
├── 📁 components
│   ├── Navbar.jsx
│   ├── AppointmentForm.jsx
│   ├── Filter.jsx
├── 📁 pages
│   ├── Appointment.jsx
│   ├── AllAppointments.jsx
│   ├── Login.jsx
├── 📁 context
│   └── ThemeContext.jsx
├── 📁 data
│   └── doctorsPatients.json
├── App.jsx
├── main.jsx
└── index.css
```

---

## 🔐 Login Credentials

> Email: `staff@clinic.com`
> Password: `123456`

---

## 🖼 Screens

*  Calendar (Monthly on desktop, Daily on mobile)
*  All Appointments page with editable & filterable table
*  Login screen (no signup)
*  Theme toggle via Context API

---

## 🧪 Setup & Run Locally

```bash
# Clone the repo
https://github.com/Abhishekkvpnld/Appointment-Calendar.git

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---
