import React from "react";
import Header from "../components/Header";
import RestaurantList from "../components/RestaurantList";
import Footer from "../components/Footer";
import Chatbot from "../components/Chatbot";

const RestaurantPage: React.FC = () => {
  return (
    <div>
      <Header />
      <RestaurantList />
      <Footer />
      <Chatbot />
    </div>
  );
};

export default RestaurantPage;
