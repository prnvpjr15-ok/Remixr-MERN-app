<div align="center">

<h1>🍳 Remixr</h1>

<p>
<strong>Turn leftovers into masterpieces. Fight food waste with AI.</strong>
</p>

<p>
<a href="#-features">Features</a> •
<a href="#-tech-stack">Tech Stack</a> •
<a href="#-getting-started">Getting Started</a> •
<a href="#-multiplayer-mode">Multiplayer</a>
</p>

<!-- Badges -->

<p>
<img src="https://www.google.com/search?q=https://img.shields.io/badge/MERN-Stack-blue%3Fstyle%3Dflat-square%26logo%3Dreact" alt="MERN Stack" />
<img src="https://www.google.com/search?q=https://img.shields.io/badge/License-MIT-green%3Fstyle%3Dflat-square" alt="License" />
<img src="https://www.google.com/search?q=https://img.shields.io/badge/Status-Active-success%3Fstyle%3Dflat-square" alt="Status" />
</p>

<br />
</div>

📖 About The Project

Remixr is a smart kitchen operating system designed to solve the "what's for dinner?" dilemma while reducing household food waste.

By combining Computer Vision (OCR) for easy input and Algorithmic Logic for culinary creativity, Remixr helps you visualize meals using ingredients you already have at home. It includes strict dietary controls, nutritional insights, and social features to make sustainable cooking accessible to everyone.

✨ Features

🧠 Intelligent Generation

AI Recipe Remix: Generates structured recipes based on flavor profiles (Mexican, Italian, Asian, etc.) and ingredient texture analysis.

Smart Logic: Unlike basic randomizers, Remixr understands that onions need to be sautéed before spinach and that eggs shouldn't be seared like steak.

📸 Smart Input

OCR Receipt Scanning: Snap a picture of your grocery receipt or handwritten list, and the app auto-fills your pantry using Tesseract.js.

Auto-Complete: A smart search bar with over 100+ common ingredients.

🥗 Dietary Control

Strict Filters: Filters for Vegan, Keto, Paleo, and Vegetarian diets.

Allergy Safety: Automatically flags recipes containing user-specified allergens (Nuts, Dairy, Shellfish, etc.).

📊 Data & Tools

Visual Nutrition: Interactive donut charts breaking down Protein, Carbs, and Fats using Recharts.

Eco-Score: Calculates the carbon footprint of your meal based on ingredients.

Meal Planner: Drag-and-drop recipes into your weekly schedule.

Shopping List: Persistent checklist integrated with your user profile.

🌎 Social & Export

Community Feed: Share your best remixes and "Like" creations from other users.

Recipe Cards: Download high-resolution PNG recipe cards to share on social media.

🛠 Tech Stack

Domain

Technologies

Frontend

React (Vite), Tailwind CSS, Framer Motion, Recharts, Lucide Icons

Backend

Node.js, Express.js, JWT (Auth), Bcrypt (Security)

Database

MongoDB, Mongoose (ODM)

Utilities

Tesseract.js (OCR), html2canvas (Export)

🚀 Getting Started

Follow these steps to set up the project locally.

Prerequisites

Node.js (v16+)

MongoDB (Installed locally OR a MongoDB Atlas account)

1. Clone the Repository

git clone [https://github.com/yourusername/remixr.git](https://github.com/yourusername/remixr.git)
cd remixr


2. Install Backend

cd server
npm install


3. Install Frontend

cd ../client
npm install


4. Configuration

Create a .env file in the server/ folder and add your variables:

PORT=5000
# Use local DB or Atlas URL
MONGO_URI=mongodb://127.0.0.1:27017/remixr
# Secret for JWT tokens
JWT_SECRET=your_super_secret_key_123


5. Run the Application

You need to run two terminals simultaneously.

Terminal 1 (Backend):

cd server
npm run dev


Terminal 2 (Frontend):

cd client
npm run dev


Visit http://localhost:3000 in your browser.

🌐 Multiplayer Mode (Cloud Database)

By default, the app saves data to your local machine (localhost). To enable sharing recipes with friends or accessing your account from different devices:

Create a free account at MongoDB Atlas.

Create a Cluster and get your Connection String.

Update server/.env with the cloud URL:

MONGO_URI=mongodb+srv://<user>:<password>@cluster0.abcde.mongodb.net/remixr


Restart the server. Now everyone connected to this database shares the same Community Feed!

🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

Fork the Project

Create your Feature Branch (git checkout -b feature/AmazingFeature)

Commit your Changes (git commit -m 'Add some AmazingFeature')

Push to the Branch (git push origin feature/AmazingFeature)

Open a Pull Request

📝 License

Distributed under the MIT License. See LICENSE for more information.