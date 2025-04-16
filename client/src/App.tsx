import React from "react";
import { Routes, Route } from "react-router-dom";

// Import the new page components
import Home from "./pages/Home";
import RestaurantPage from "./pages/RestaurantPage";
import Contact from "./pages/Contact";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurants" element={<RestaurantPage />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  );
}

export default App;