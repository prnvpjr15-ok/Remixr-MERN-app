Remixr 🍳

Remixr is a smart MERN-based kitchen assistant designed to fight food waste. It uses algorithmic logic to generate creative recipes from your leftover ingredients, complete with dietary filters, meal planning, and community sharing features.

✨ Features

AI Recipe Generation: Turn random ingredients into structured, professional recipes.

Smart Input: OCR receipt scanning to auto-fill your pantry using Tesseract.js.

Dietary Filters: Strict validation for Vegan, Keto, Paleo, and specific allergies.

Visual Insights: Real-time nutrition charts and Eco-Scores.

Kitchen Tools: Integrated Shopping List and Weekly Meal Planner.

Community Feed: Share your creations and discover what others are cooking.

Downloadable Cards: Export recipes as high-quality images.

Secure Auth: Full user authentication with JWT and Bcrypt.

🛠️ Tech Stack

Frontend: React (Vite), Tailwind CSS, Framer Motion, Recharts.

Backend: Node.js, Express.

Database: MongoDB (Mongoose).

Authentication: JWT (JSON Web Tokens).

🚀 Getting Started

Prerequisites

Node.js installed on your machine.

MongoDB installed locally OR a MongoDB Atlas account.

Installation

Clone the repository

git clone [https://github.com/yourusername/remixr.git](https://github.com/yourusername/remixr.git)
cd remixr


Install Backend Dependencies

cd server
npm install


Install Frontend Dependencies

cd ../client
npm install


Configuration

Create a .env file in the server folder:

PORT=5000
# Default Local DB
MONGO_URI=mongodb://127.0.0.1:27017/remixr
JWT_SECRET=your_super_secret_key_123


Running the App

You need to run both terminals simultaneously:

Terminal 1 (Server):

cd server
npm run dev


Terminal 2 (Client):

cd client
npm run dev


Open http://localhost:3000 to view the app.

🌐 Making it Multiplayer (Cloud Database)

By default, this app saves data to your computer (127.0.0.1), creating an isolated "island." To allow multiple users to interact (see each other's Community posts, Likes, etc.) from different computers:

Create a Cloud Database: Sign up for a free account at MongoDB Atlas.

Get Connection String: Create a cluster and get your connection string. It looks like:
mongodb+srv://<user>:<pass>@cluster0.abcde.mongodb.net/remixr

Update Config: Everyone who wants to join the community must update their server/.env file with this Shared URL:

MONGO_URI=mongodb+srv://admin:password123@cluster0.abcde.mongodb.net/remixr


Restart: Restart the backend server. Now, recipes shared to the "Community" will be visible to everyone connected to this database!

📝 License

This project is open source and available under the MIT License.