// pages/Contact.tsx (Updated using PNG images)
import React from "react";
import { Link } from "react-router-dom";

// Import PNG images from the images folder
import emailIcon from "../images/email.png";
import phoneIcon from "../images/phone.png";
import officeIcon from "../images/info.png";

const Contact: React.FC = () => {
  return (
    <div className="bg-[#a8a7a7] min-h-screen flex flex-col">
      {/* Header with Clickable Tailwind-Styled Logo */}
      <header className="bg-[#636363] shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center">
          <Link to="/">
            <div className="text-sm font-semibold bg-[#222831] rounded-md p-1 cursor-pointer">
              <span className="text-white mr-1">Restaurant</span>
              <span className="w-12 h-8 rounded bg-neutral-100 px-1 text-neutral-700 font-bold">
                Hunter
              </span>
            </div>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8 flex-1">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 text-[#000000]">Contact Us</h1>
          <p className="text-gray-600">
            We're here to help you with any inquiries.
          </p>
        </div>

        {/* Contact Info Cards Using PNG Images */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Email Card */}
          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
            <img src={emailIcon} alt="Email Icon" className="w-12 h-12 mb-4" />
            <h2 className="text-xl font-semibold">Email</h2>
            <p className="text-gray-700 mt-2">support@restHunter.com</p>
            <p className="text-sm text-gray-500">Send us an email anytime.</p>
          </div>

          {/* Phone Card */}
          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
            <img src={phoneIcon} alt="Phone Icon" className="w-12 h-12 mb-4" />
            <h2 className="text-xl font-semibold">Phone</h2>
            <p className="text-gray-700 mt-2">+1 (123) 456 7890</p>
            <p className="text-sm text-gray-500">
              Call us for immediate assistance.
            </p>
          </div>

          {/* Office Card */}
          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
            <img src={officeIcon} alt="Office Icon" className="w-12 h-12 mb-4" />
            <h2 className="text-xl font-semibold">Office</h2>
            <p className="text-gray-700 mt-2">London, XX000</p>
            <p className="text-sm text-gray-500">
              Visit us for in-person support.
            </p>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mt-16 bg-white rounded-lg shadow-md p-6 text-center max-w-md mx-auto">
          <h3 className="text-lg font-bold mb-2">
            Subscribe to our Newsletter
          </h3>
          <p className="text-sm text-gray-500 mb-4">
            Be the first to learn about our latest features and updates.
          </p>
          <div className="flex items-center">
            <input
              type="email"
              placeholder="Your email here"
              className="flex-grow border border-gray-300 rounded-l-md px-3 py-2 focus:outline-none"
            />
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r-md">
              Join
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-2">
            By subscribing, you agree to receive updates and agree to our
            Privacy Policy.
          </p>
        </div>
      </div>

      {/* Footer Links */}
      <footer className="bg-gray-200 text-gray-700 py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm mb-2 sm:mb-0">
            © {new Date().getFullYear()} RestHunter. All rights reserved.
          </p>
          <div className="flex space-x-4 text-sm">
            <Link to="/privacy" className="hover:underline">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:underline">
              Terms of Service
            </Link>
            <Link to="/cookies" className="hover:underline">
              Cookie Settings
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Contact;
