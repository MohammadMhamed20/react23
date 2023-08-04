import React from "react";
import { MdLightMode } from "react-icons/md";

const ThemeBtn = ({ darkMode, setDarkMode }) => {
  return (
    <div
      className={`fixed bottom-3 right-3 w-12 h-12 rounded-full ${
        darkMode ? "bg-[#fff]" : "bg-[#000000]"
      } flex items-center justify-center cursor-pointer`}
      onClick={() => setDarkMode(!darkMode)}
    >
      <MdLightMode
        className={`${darkMode ? "text-[#000]" : "text-[#fff]"} text-2xl`}
      />
    </div>
  );
};

export default ThemeBtn;
