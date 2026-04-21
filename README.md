# Nursing Officer Training Platform 🏥

A comprehensive, full-stack web application designed to empower nursing students and professionals in their exam preparation. This platform provides practice tests, AI-driven feedback, and detailed performance analytics to ensure exam readiness.

## 🚀 Features

- **User Authentication**: Secure login and registration for students.
- **Interactive Practice Tests**: A wide range of nursing exams and practice tests.
- **AI-Powered Insights**: Leveraging OpenAI to provide personalized feedback and explanations for test results.
- **Student Dashboard**: A central hub to track progress, view recent activity, and access upcoming tests.
- **Advanced Analytics**: Visual performance tracking using Chart.js to identify strengths and areas for improvement.
- **Premium UI/UX**: A clean, professional interface built with modern web technologies.

## 🛠️ Tech Stack

### Frontend
- **Framework**: React.js (with Vite)
- **State Management**: React Context API
- **Routing**: React Router DOM
- **Charts**: Chart.js & React-Chartjs-2
- **Styling**: Vanilla CSS / Tailwind (Modern Responsive Design)
- **HTTP Client**: Axios

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (with Mongoose ODM)
- **Authentication**: JWT & Bcryptjs
- **AI Integration**: OpenAI API
- **Environment**: Dotenv

## 📂 Project Structure

```text
Nursing_website/
├── client/           # React frontend application
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Page-level components
│   │   ├── services/    # API service layers
│   │   └── context/     # Global state management
├── server/           # Node.js Express backend
│   ├── config/       # Configuration (Database, etc.)
│   ├── models/       # Mongoose schemas
│   ├── routes/       # API endpoints
│   ├── middleware/   # Custom Express middlewares
│   └── seed.js       # Database seeding script
└── README.md         # Project documentation
```

## ⚙️ Getting Started

### Prerequisites
- Node.js (v14+)
- MongoDB (Local or Atlas)
- OpenAI API Key (optional, for AI features)

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd Nursing_website
   ```

2. **Setup Backend:**
   ```bash
   cd server
   npm install
   ```
   Create a `.env` file in the `server` directory:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   OPENAI_API_KEY=your_openai_api_key_OR_google_gemini_key
   ```
   *(Note: The backend automatically intercepts and supports BOTH standard OpenAI API keys and Google Gemini API keys interchangeably.)*

3. **Setup Frontend:**
   ```bash
   cd ../client
   npm install
   ```

### Running the Application

1. **Start the Backend:**
   ```bash
   cd server
   npm run dev
   ```

2. **Start the Frontend:**
   ```bash
   cd client
   npm run dev
   ```

The application should now be running at `http://localhost:5173` (Frontend) and `http://localhost:5000` (Backend).

### 🛠️ Utilities

- `node process-icon.js` (in `client`): Removes padding from `public/logo-icon-backup.png` and creates a transparent, squared `public/logo-icon.png`.
- `node scripts/generate-favicon.js` (in `client`): Automatically generates all PWA and favicon sizes required for the application from the main `logo-icon.png`.

## 🏥 API Endpoints

- `POST /api/auth/register`: Register a new user.
- `POST /api/auth/login`: Login and receive a JWT.
- `GET /api/tests`: Retrieve available practice tests.
- `POST /api/tests/:id/submit`: Submit test answers and get AI feedback.
- `GET /api/analytics`: View user performance data.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the ISC License.
