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

### `server/.env`

Create a `.env` file in the `server` directory with:

```env
REACT_APP_GOOGLE_PLACES_API_KEY=your_google_api_key
