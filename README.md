# 🚀 Tax Loss Harvesting App

A responsive **Tax Loss Harvesting Web Application** built with React that helps users optimise their capital gains by intelligently selecting loss-making assets.

This project simulates real-world portfolio management by calculating **pre and post-harvesting capital gains** and visually displaying potential tax savings in real-time.

---

## 📸 Demo

👉 (https://koinxtaxlossharvesting.netlify.app/)

---

## ✨ Features

### 📊 Capital Gains Dashboard

* Displays **Short-Term (STCG)** and **Long-Term (LTCG)** gains
* Shows:

  * Profits
  * Losses
  * Net Gains
  * Total Realised Capital Gains

---

### 🔄 Real-Time Tax Optimization

* Select/deselect assets from holdings table
* Automatically updates:

  * Profits & Losses
  * Net Gains
  * Total Capital Gains
* Displays:

  > 💰 *"You're going to save ₹X"* (only when applicable)

---

### 📋 Holdings Table

* Displays:

  * Asset name & logo
  * Holdings & prices
  * STCG & LTCG gains
* Features:

  * ✅ Select individual rows
  * ✅ Select All checkbox
  * ✅ View All / Show Less toggle
  * ✅ Real-time updates on selection

---

### 🎨 Visual Feedback

* Highlight selected rows
* Color-coded gains:

  * 🟢 Green → Profit
  * 🔴 Red → Loss

---

### 📱 Responsive Design

* Fully optimized for:

  * Mobile 📱
  * Tablet 📲
  * Desktop 💻

---

### ⚙️ Mock API Integration

* Simulated APIs using Promises
* Handles:

  * Loading states ⏳
  * Error states ❌

---

## 🧠 Core Logic

* Net Gain = `profits - losses`
* Realised Capital Gains = `STCG Net + LTCG Net`
* Harvesting logic:

  * Positive gains → added to profits
  * Negative gains → added to losses

---

## 🛠️ Tech Stack

* ⚛️ React (Hooks + Context API)
* 🎨 Tailwind CSS
* ⚡ Vite
* 📦 JavaScript (ES6+)

---

## 📁 Project Structure

```
tax-loss-harvesting/
├── src/
│   ├── components/
│   ├── context/
│   ├── mock/
│   ├── utils/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
└── README.md
```

---

## ⚡ Getting Started

### 1️⃣ Clone the repository

```
git clone https://github.com/your-username/tax-loss-harvesting.git
cd tax-loss-harvesting
```

### 2️⃣ Install dependencies

```
npm install
```

### 3️⃣ Run the app

```
npm run dev
```

---

## 🎯 Objective

This project was built as part of a frontend assignment to demonstrate:

* Problem-solving ability
* UI/UX implementation skills
* Handling real-world financial logic
* Writing clean and scalable React code

---

## 🚀 Future Improvements

* 📈 Sorting & filtering holdings
* 📊 Charts for better visualization
* 🔐 Authentication system
* 🌐 Real API integration

---

## 👨‍💻 Author

**Abhishek Kumar**

---

## ⭐ If You Like This Project

Give it a ⭐ on GitHub and feel free to fork it!

