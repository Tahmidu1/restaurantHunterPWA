import React from "react";
import { TypeAnimation } from "react-type-animation";

// Header with a dynamic type animation
const Header: React.FC = () => {
  return (
    <header className=" bg-[#636363] text-white p-4 flex justify-between items-center">
      {/* <h1 className="text-xl font-bold">Restaurant Hunter</h1> */}
      <div
        // href="/"
        className="text-sm font-semibold bg-[#222831] rounded-md p-1"
      >
        <span className="text-white mr-1">Restaurant</span>
        <span className=" w-12 h-8 rounded bg-neutral-100 px-1 text-neutral-700 font-bold">
          Hunter
        </span>
      </div>
      <p className=" text-sm font-semibold mx-2 px-1">
        <TypeAnimation
          sequence={[
            "What are you craving today? Let your taste buds lead the way!", // Types 'One'
            2000, // Waits 2s
            "Satisfy every craving—there’s a dish for every mood!", // De-letes 'One' and types 'Two'
            2000, // Waits 2s
            "Hungry for something new? Discover the flavors calling your name!",
            2000,
          ]}
          wrapper="span"
          cursor={true}
          repeat={Infinity}
          style={{ display: "inline-block" }}
        />
      </p>
    </header>
  );
};

export default Header;
