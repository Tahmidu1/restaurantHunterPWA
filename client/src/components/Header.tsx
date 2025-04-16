import React from "react";
import { Link } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import AccessibilityDropdown from "./AccessibilityDropdown";

const Header: React.FC = () => {
  return (
    <header className="bg-[#636363] text-white p-2 flex items-center justify-between">
      {/* Left: Clickable Logo */}
      <div className="flex items-center">
        <Link to="/">
          <div className="text-sm font-semibold bg-[#222831] rounded-md p-1 cursor-pointer">
            <span className="text-white mr-1">Restaurant</span>
            <span className="w-12 h-8 rounded bg-neutral-100 px-1 text-neutral-700 font-bold">
              Hunter
            </span>
          </div>
        </Link>
      </div>

      {/* Center: Animated Text */}
      <div className="flex-grow text-center">
        <p className="text-xs font-semibold mx-2">
          <TypeAnimation
            sequence={[
              "What are you craving today? Let your taste buds lead the way!",
              2000,
              "Satisfy every craving—there’s a dish for every mood!",
              2000,
              "Hungry for something new? Discover the flavors calling your name!",
              2000,
            ]}
            wrapper="span"
            cursor={true}
            repeat={Infinity}
            style={{ display: "inline-block" }}
          />
        </p>
      </div>

      {/* Right: Accessibility Dropdown */}
      <div className="flex items-center">
        <AccessibilityDropdown />
      </div>
    </header>
  );
};

export default Header;
