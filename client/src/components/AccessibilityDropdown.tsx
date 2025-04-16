import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

const AccessibilityDropdown: React.FC = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isBoldText, setIsBoldText] = useState(false);

  useEffect(() => {
    if (isBoldText) {
      document.body.classList.add("bold-text");
    } else {
      document.body.classList.remove("bold-text");
    }
  }, [isBoldText]);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gray-800 text-white px-3 py-2 rounded-md focus:outline-none"
      >
        Accessibility Features
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md p-4 shadow-lg z-10">
          <div className="mb-4">
            <label htmlFor="language-select" className="block text-gray-700 mb-1">
              Language:
            </label>
            <select
              id="language-select"
              value={i18n.language}
              onChange={handleLanguageChange}
              className="w-full border border-gray-300 rounded-md px-2 py-1"
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              {/* add more language options here */}
            </select>
          </div>
          <div>
            <label htmlFor="bold-toggle" className="block text-gray-700 mb-1">
              Bold Text:
            </label>
            <input
              type="checkbox"
              id="bold-toggle"
              checked={isBoldText}
              onChange={() => setIsBoldText(!isBoldText)}
              className="form-checkbox"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AccessibilityDropdown;