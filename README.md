<div align="center">

# 🍳 Remixr

### Transform leftovers into culinary masterpieces. Combat food waste with AI-powered recipe generation.

![MERN Stack](https://img.shields.io/badge/Stack-MERN-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Active-success?style=for-the-badge)

---

</div>

## 📖 Overview

**Remixr** is an intelligent kitchen companion that solves the eternal question: *"What's for dinner?"* 

By leveraging computer vision and advanced algorithmic logic, Remixr generates creative recipes from ingredients you already have, reducing food waste while respecting dietary restrictions and nutritional goals. Whether you're cooking solo or sharing with a community, Remixr makes sustainable cooking effortless and exciting.

<div align="center">

### 🎯 Mission
*Empower home cooks to reduce food waste by 40% through intelligent recipe generation and pantry management.*

</div>

---

## ✨ Features

### 🧠 **Intelligent Recipe Generation**
- **AI-Powered Remix Engine**: Generates culturally-aware recipes (Mexican, Italian, Asian fusion, etc.) based on ingredient compatibility and texture analysis
- **Culinary Logic**: Understands proper cooking techniques—sautéing aromatics before greens, protein temperature requirements, and optimal ingredient sequencing
- **Flavor Profile Matching**: Balances taste components (sweet, salty, umami, acid, bitter) for harmonious dishes

### 📸 **Smart Ingredient Input**
- **OCR Receipt Scanning**: Photograph grocery receipts or handwritten lists for automatic pantry population using Tesseract.js
- **Intelligent Auto-Complete**: Search bar with 100+ common ingredients and smart suggestions
- **Manual Entry**: Quick add interface for on-the-fly ingredient management

### 🥗 **Dietary Controls & Safety**
- **Strict Diet Filters**: Vegan, Keto, Paleo, Vegetarian, and custom dietary preferences
- **Allergy Management**: Automatic flagging and exclusion of allergens (nuts, dairy, shellfish, gluten, soy, eggs)
- **Nutritional Transparency**: Full ingredient disclosure and substitution suggestions

### 📊 **Analytics & Planning**
- **Visual Nutrition Breakdown**: Interactive donut charts displaying macronutrient distribution (protein, carbs, fats)
- **Eco-Impact Score**: Real-time carbon footprint calculation based on ingredient sourcing
- **Weekly Meal Planner**: Drag-and-drop interface for organizing recipes across your schedule
- **Smart Shopping Lists**: Auto-generated lists that sync with your meal plan and current pantry

### 🌎 **Social Features**
- **Community Feed**: Discover and share recipes with other Remixr users
- **Engagement System**: Like, save, and comment on community creations
- **Recipe Cards**: Generate high-resolution PNG cards optimized for social media sharing
- **User Profiles**: Track your cooking journey, saved recipes, and community impact

---

## 🛠 Tech Stack

<table>
<tr>
<td><strong>Frontend</strong></td>
<td>React (Vite), Tailwind CSS, Framer Motion, Recharts, Lucide Icons</td>
</tr>
<tr>
<td><strong>Backend</strong></td>
<td>Node.js, Express.js, JWT Authentication, Bcrypt</td>
</tr>
<tr>
<td><strong>Database</strong></td>
<td>MongoDB, Mongoose ODM</td>
</tr>
<tr>
<td><strong>AI & Utilities</strong></td>
<td>Tesseract.js (OCR), html2canvas (Export)</td>
</tr>
</table>

---

## 🚀 Installation

### Prerequisites

Ensure you have the following installed:
- **Node.js** (v16 or higher)
- **MongoDB** (local installation or MongoDB Atlas account)
- **npm** or **yarn** package manager

### Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/remixr.git
cd remixr
```

### Step 2: Backend Setup

```bash
cd server
npm install
```

### Step 3: Frontend Setup

```bash
cd ../client
npm install
```

### Step 4: Environment Configuration

Create a `.env` file in the `server/` directory:

```env
PORT=5000

# Database Connection
# Local: mongodb://127.0.0.1:27017/remixr
# Cloud: mongodb+srv://<user>:<password>@cluster.mongodb.net/remixr
MONGO_URI=mongodb://127.0.0.1:27017/remixr

# Authentication
JWT_SECRET=your_super_secret_key_change_this_in_production
```

### Step 5: Launch Application

Open two terminal windows:

**Terminal 1 - Backend Server:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend Client:**
```bash
cd client
npm run dev
```

Navigate to `http://localhost:3000` in your browser.

---

## 💡 Usage

### Local Mode (Single User)
By default, Remixr runs on your local machine with data stored in a local MongoDB instance. Perfect for personal use and testing.

### Cloud Mode (Multi-User)
Enable social features and cross-device access:

1. Create a free MongoDB Atlas account
2. Set up a cluster and obtain your connection string
3. Update `MONGO_URI` in `server/.env`:
   ```env
   MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/remixr
   ```
4. Restart the server to enable the shared Community Feed

---

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### Development Process

1. **Fork** the repository
2. **Create** a feature branch
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit** your changes
   ```bash
   git commit -m 'Add amazing feature'
   ```
4. **Push** to your branch
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open** a Pull Request

### Contribution Ideas
- 🌐 Internationalization and language support
- 🎨 UI/UX improvements and accessibility features
- 🧪 Additional dietary filters and allergen support
- 📱 Mobile app development
- 🤖 Enhanced AI recipe generation algorithms

---

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

## 🙏 Acknowledgments

Built with passion to reduce food waste and make sustainable cooking accessible to everyone.

**Remixr** - *Waste less. Cook more. Share always.*

---

<div align="center">

### Questions or Feedback?

Open an issue on GitHub or reach out to the maintainers.

**Star ⭐ this repository if you find it helpful!**

</div>