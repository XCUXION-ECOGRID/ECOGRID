# Solar Audit App - Backend

This is the backend structure for the **Solar Audit App**, a system that facilitates **energy audits, solar package simulations, cost analysis, carbon tracking, and optimization of solar installations**.

---

## 📂 Project Structure

### 🔧 **Configuration**
- `src/config/` - Configuration files for database, authentication, environment variables, and mailer.
  - `db.js` – Database connection (Mongoose).
  - `auth.js` – JWT & session handling.
  - `env.js` – Environment variable handling.
  - `mailer.js` – Mail service for notifications.

### 🎯 **Controllers**
- `src/controllers/` - Request handlers for various features.
  - `authController.js` – User authentication.
  - `auditController.js` – Handles energy audit process.
  - `solarPackageController.js` – Manages solar package simulations.
  - `costAnalysisController.js` – Performs cost analysis for solar installations.
  - `optimizationController.js` – Suggests the best solar setup based on needs.
  - `carbonTrackingController.js` – Handles carbon emission tracking.
  - `dashboardController.js` – User dashboard for reports and history.
  - `adminController.js` – Admin-related actions.
  - `bookingController.js` – Manages customer bookings for installations.

### 🗃️ **Models**
- `src/models/` - Database models (Mongoose schemas).
  - `User.js`
  - `Audit.js`
  - `SolarPackage.js`
  - `CostAnalysis.js`
  - `Optimization.js`
  - `CarbonEmission.js` – Stores carbon emission calculations.
  - `Booking.js`

### 🚀 **Routes**
- `src/routes/` - API routes.
  - `authRoutes.js`
  - `auditRoutes.js`
  - `solarPackageRoutes.js`
  - `costAnalysisRoutes.js`
  - `optimizationRoutes.js`
  - `carbonTrackingRoutes.js`
  - `dashboardRoutes.js`
  - `adminRoutes.js`
  - `bookingRoutes.js`

### 🛠 **Services**
- `src/services/` - Business logic and core functionalities.
  - `authService.js`
  - `auditService.js`
  - `solarPackageService.js`
  - `costAnalysisService.js`
  - `optimizationService.js`
  - `carbonTrackingService.js`
  - `dashboardService.js`
  - `adminService.js`
  - `bookingService.js`

### 🔒 **Middleware**
- `src/middleware/` - Middleware for authentication, validation, and error handling.
  - `authMiddleware.js`
  - `errorHandler.js`

### 🔹 **Utilities**
- `src/utils/` - Helper functions for various calculations and operations.
  - `calculations.js` – Power, energy, and efficiency calculations.
  - `emissionCalculator.js` – Carbon emission calculation logic.
  - `emailHelper.js` – Helper functions for sending emails.

### 📁 **Static Assets**
- `src/public/` - Static assets (images, videos, etc.).
  - `simulationVideos/` – Folder for simulation videos.
  - `solarImages/` – Solar panel images, icons, etc.

### 🎨 **Views**
- `src/views/` - HTML views (if rendering server-side templates).

### 🧪 **Testing**
- `src/tests/` - Test cases for services.
  - `auth.test.js`
  - `audit.test.js`
  - `solarPackage.test.js`
  - `carbonTracking.test.js`

### 🏗 **Main App Files**
- `app.js` - Main Express app entry point.
- `package.json` - Dependencies and scripts.
- `.env` - Environment variables (API keys, DB credentials).
- `README.md` - Project documentation.

---

## 🚀 Features

- **User Authentication**: Secure login and registration using JWT.
- **Energy Audits**: Process and manage solar energy audit requests.
- **Solar Package Simulation**: Simulate solar panel setups based on energy needs.
- **Cost Analysis**: Estimate costs for solar panel installations.
- **Optimization**: Suggests best solar setup for efficiency.
- **Carbon Tracking**: Monitor and calculate carbon footprint reduction.
- **Admin Dashboard**: Manage users, audits, and solar package reports.
- **Booking System**: Schedule solar panel installations.

---

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose ORM)
- **Authentication**: JWT
- **Testing**: Jest, Supertest

---

for the Controllers, I divide into the mobile and desktop

## 📌 Installation

```sh
git clone https://github.com/your-repo/solar-audit-app-backend.git
cd solar-audit-app-backend
npm install


