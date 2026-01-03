# 🚀 Dayflow HR Management System

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5.4.19-646CFF?logo=vite)

**A modern, comprehensive Human Resources Management System built with React and TypeScript**

[Features](#-features) • [Tech Stack](#-tech-stack) • [Getting Started](#-getting-started) • [Project Structure](#-project-structure) • [Screenshots](#-screenshots)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Available Scripts](#-available-scripts)
- [Key Features in Detail](#-key-features-in-detail)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 Overview

**Dayflow HR** is a full-featured Human Resources Management System designed to streamline HR operations for modern organizations. Built with cutting-edge web technologies, it provides an intuitive interface for managing employees, tracking attendance, handling leave requests, processing payroll, and generating comprehensive reports.

Whether you're a small startup or a growing enterprise, Dayflow HR offers the tools you need to manage your workforce efficiently and effectively.

---

## ✨ Features

### 👥 **Employee Management**
- Complete employee profiles with document management
- Role-based access control (Admin & Employee)
- Employee directory with search and filtering
- Profile management and updates

### ⏰ **Attendance Tracking**
- Real-time check-in/check-out functionality
- Detailed attendance reports and analytics
- Attendance history tracking
- Visual attendance calendar

### 📅 **Leave Management**
- Streamlined leave request system
- Leave approval workflow for administrators
- Leave balance tracking
- Leave history and analytics

### 💰 **Payroll Management**
- Transparent salary and payment tracking
- Payslip generation and viewing
- Payroll history and reports
- Salary breakdown visualization

### 📊 **Dashboard & Analytics**
- Comprehensive dashboard with key metrics
- Quick actions for common tasks
- Recent activity tracking
- Visual charts and statistics

### 🔐 **Security & Authentication**
- Secure user authentication
- Role-based permissions
- Protected routes
- Session management

---

## 🛠 Tech Stack

### **Frontend Framework**
- **React 18.3.1** - Modern UI library
- **TypeScript 5.8.3** - Type-safe development
- **Vite 5.4.19** - Lightning-fast build tool

### **UI & Styling**
- **Tailwind CSS 3.4.17** - Utility-first CSS framework
- **shadcn/ui** - Beautiful, accessible component library
- **Radix UI** - Unstyled, accessible component primitives
- **Framer Motion 12.23.26** - Smooth animations
- **Lucide React** - Modern icon library

### **State Management & Data Fetching**
- **TanStack Query (React Query) 5.83.0** - Powerful data synchronization
- **React Router DOM 6.30.1** - Client-side routing
- **React Hook Form 7.61.1** - Performant form management
- **Zod 3.25.76** - Schema validation

### **Charts & Visualization**
- **Recharts 2.15.4** - Composable charting library

### **Development Tools**
- **ESLint 9.32.0** - Code linting
- **TypeScript ESLint** - TypeScript-specific linting rules
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (v18.0.0 or higher) - [Download Node.js](https://nodejs.org/)
- **npm** (v9.0.0 or higher) - Comes with Node.js
- **Git** - [Download Git](https://git-scm.com/)

> 💡 **Tip**: You can verify your installations by running:
> ```bash
> node --version
> npm --version
> git --version
> ```

---

## 🚀 Getting Started

### **1. Clone the Repository**

```bash
git clone https://github.com/yourusername/dayflow-hr.git
cd dayflow-hr
```

### **2. Install Dependencies**

```bash
npm install
```

This will install all required dependencies listed in `package.json`.

### **3. Start the Development Server**

```bash
npm run dev
```

The application will start on `http://localhost:5173` (or the next available port).

### **4. Build for Production**

```bash
npm run build
```

This creates an optimized production build in the `dist` directory.

### **5. Preview Production Build**

```bash
npm run preview
```

---

## 📁 Project Structure

```
dayflow-hr/
├── public/                 # Static assets
│   ├── favicon.ico
│   ├── placeholder.svg
│   └── robots.txt
├── src/
│   ├── components/         # React components
│   │   ├── dashboard/     # Dashboard-specific components
│   │   ├── layout/        # Layout components (Sidebar, DashboardLayout)
│   │   └── ui/            # Reusable UI components (shadcn/ui)
│   ├── contexts/          # React contexts (AuthContext)
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility functions
│   ├── pages/             # Page components
│   │   ├── Auth.tsx
│   │   ├── Dashboard.tsx
│   │   ├── Attendance.tsx
│   │   ├── Leave.tsx
│   │   ├── Payroll.tsx
│   │   ├── Employees.tsx
│   │   └── ...
│   ├── types/             # TypeScript type definitions
│   ├── App.tsx            # Main App component
│   ├── main.tsx           # Application entry point
│   └── index.css          # Global styles
├── .eslintrc.js           # ESLint configuration
├── index.html             # HTML template
├── package.json           # Project dependencies
├── postcss.config.js      # PostCSS configuration
├── tailwind.config.ts     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
└── vite.config.ts         # Vite configuration
```

---

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm run build:dev` | Build in development mode |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint to check code quality |

---

## 🔍 Key Features in Detail

### **Dashboard**
- Overview of key HR metrics
- Quick action buttons for common tasks
- Recent activity feed
- Visual statistics and charts

### **Employee Management**
- Add, edit, and view employee profiles
- Search and filter employees
- Manage employee documents
- Role assignment (Admin/Employee)

### **Attendance System**
- Check-in/check-out functionality
- View attendance history
- Generate attendance reports
- Calendar view of attendance

### **Leave Management**
- Submit leave requests (Employees)
- Approve/reject leave requests (Admins)
- Track leave balances
- View leave calendar

### **Payroll**
- View salary details
- Download payslips
- Track payment history
- Salary breakdown visualization

---

## 🤝 Contributing

Contributions are welcome! If you'd like to contribute to Dayflow HR:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add some amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

Please ensure your code follows the existing style and passes all linting checks.

---

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful component library
- [Radix UI](https://www.radix-ui.com/) for accessible primitives
- [Vite](https://vitejs.dev/) for the amazing build tool
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework

---

<div align="center">

**Made using React, TypeScript, and modern web technologies**

⭐ **Star this repo if you find it helpful!**

[Report Bug](https://github.com/yourusername/dayflow-hr/issues) • [Request Feature](https://github.com/yourusername/dayflow-hr/issues)

</div>
