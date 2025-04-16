import React from "react";
import { Link } from "react-router-dom";
import backgroundImage from "../images/home-bg.jpg"; // Make sure this path matches your project structure

const Home: React.FC = () => {
  return (
    <div
      className="relative w-full h-screen bg-no-repeat bg-center bg-cover flex flex-col"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-opacity-40"></div>

      <header className="relative z-10 flex items-center justify-between px-8 py-4">
        <div className="flex items-center">
          <div className="text-sm font-semibold rounded-md p-1">
            <span className="text-white mr-1">Restaurant</span>
            <span className="w-12 h-8 rounded bg-neutral-100 px-1 text-neutral-700 font-bold">
              Hunter
            </span>
          </div>
        </div>
      </header>

      {/*  Main Content */}
      <div className="relative z-10 flex-grow flex flex-col justify-center items-center text-center px-4">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
          Craving something?
        </h1>
        <p className="text-white mb-8 text-lg sm:text-xl drop-shadow-md">
          Find restaurants in the quickest way near you offline or online.
        </p>
        <div className="flex space-x-4">
          <Link to="/restaurants">
            <button className="bg-yellow-500 text-white font-semibold px-6 py-3 rounded-md shadow-md hover:bg-yellow-600">
              Find Restaurants
            </button>
          </Link>
          <Link to="/contact">
            <button className="bg-blue-500 text-white font-semibold px-6 py-3 rounded-md shadow-md hover:bg-blue-600">
              Contact Us
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;