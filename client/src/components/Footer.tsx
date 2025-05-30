import React from "react";

const Footer: React.FC = () => {
  const year = new Date().getFullYear();
  return (
    <footer className=" text-neutral-300 p-1 m-0 flex justify-center items-center font-thin text-xs">
      <p className="">
        <span>@ {year} copyright. </span>
      </p>
    </footer>
  );
};

export default Footer;
