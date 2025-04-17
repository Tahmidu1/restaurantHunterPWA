# 🧭 Rest Hunter – Progressive Web App (PWA) for Restaurant Discovery

**Rest Hunter** is a modern Progressive Web App (PWA) designed to help users discover nearby restaurants with features like offline support, dynamic map rendering, filters, and AI chatbot integration. Built using React, Node.js, Express, and Google Maps/Places APIs.

---

## 📦 Prerequisites

To run this project locally, ensure you have:

- Node.js (v16+ recommended)
- A valid **Google API Key** with:
  - Google Places API enabled
  - Google Maps JavaScript API enabled
- A **Groq AI API Key** (optional, for chatbot functionality)

---

## 🔐 Environment Variable Setup

> **Important:**  
> The value of `REACT_APP_GOOGLE_PLACES_API_KEY` must be a single key that has both the **Google Maps JavaScript API** and **Google Places API** enabled in your Google Cloud Console.

---

### `server/.env`

Create a `.env` file in the `server` directory with:

```env
REACT_APP_GOOGLE_PLACES_API_KEY=your_google_api_key
```
> This API key must have **Google Places API** enabled.

---

### `client/.env`

Create a `.env` file in the `client` directory similar to this:

```env
REACT_APP_GOOGLE_PLACES_API_KEY=your_google_api_key
REACT_APP_MAP_ID=your_map_id
REACT_APP_GROQ_API_KEY=your_groq_api_key
```
## 🛠 Installation

Clone the repository and install dependencies for both client and server:

```bash
git clone https://github.com/Tahmidu1/restaurantHunterPWA.git
cd restaurantHunterPWA

cd server
npm install

cd ../client
npm install
```

---

## ▶️ Running the App

1. Start the backend (Express.js API):

```bash
cd server
npm start
```

2. In a new terminal, start the frontend (React app):

```bash
cd client
npm start
```

- Frontend: `http://localhost:3000`  
- Backend: `http://localhost:3001`

---

## 🌐 Features

- 🗺️ Real-time location with interactive map
- 🔍 Filter restaurants by cuisine & rating
- 💬 AI Chatbot powered by Groq (optional)
- 📦 Offline capability using service workers
- 📱 Fully responsive on desktop and mobile
- 🌍 Accessibility features: bold text toggle, language selector (WIP)
- 📤 Share button to distribute restaurant cards

---

## ⚠️ Notes

- Google Maps **cannot be cached** for offline use due to Google's Terms of Service.
- Offline mode supports restaurant cards and UI via service worker cache, but not the map itself.

---

## 📁 Project Structure

```bash
restaurantHunterPWA/
├── client/        # React frontend (PWA)
│   ├── public/
│   ├── src/
│   └── .env       # Frontend environment variables
│
├── server/        # Node.js backend
│   ├── routes/
│   ├── server.js
│   └── .env       # Backend environment variables
```

---

## 📜 License

This project was developed as part of an academic submission for London South Bank University.  
For inquiries, please contact the repository owner (me).
