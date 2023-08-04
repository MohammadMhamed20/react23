import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import LeftSidebar from "./LeftSidebar";

const Header = () => {
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <>
      <header className="lg:hidden py-3 px-5 bg-white border-b flex items-center justify-between">
        <h3 className="text-primary">
          <Link to="/">Logo Here</Link>
        </h3>
        <div
          className="p-2 bg-primary rounded-md text-white cursor-pointer"
          onClick={() => setOpenMenu(true)}
        >
          <FaBars />
        </div>
      </header>

      <div
        className={`fixed top-0 transition-all duration-300 ${
          openMenu ? "left-0" : "-left-[150%]"
        } right-0 bottom-0 bg-dark/40 w-full h-full z-50`}
        onClick={() => setOpenMenu(false)}
      >
        <div
          className="w-[250px] bg-secondary min-h-[100vh] p-3"
          onClick={(event) => event.stopPropagation()}
        >
          <LeftSidebar />
        </div>
      </div>
    </>
  );
};

export default Header;
