import React from "react";
import { BsFire } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import { FiHome } from "react-icons/fi";
import { MdExplore, MdLogout } from "react-icons/md";
import { RiPagesLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { userLoggedOut } from "../../features/auth/authSlice";

const LeftSidebar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state?.auth);
  const { pathname } = useLocation();

  // logout
  const logout = () => {
    dispatch(userLoggedOut());
  };

  return (
    <aside>
      <div>
        <Link to="/">
          <h3 className="text-2xl text-[#66CCFF]">Logo Here</h3>
        </Link>
      </div>

      <div className="mt-10 flex flex-col justify-center items-center">
        <div>
          <img
            className="w-18 h-18 rounded-full mx-auto"
            src={user?.profilePic ? "" : "/images/users/2.jpg"}
            alt="user"
          />
        </div>
        <h2 className="mt-2">{`${user?.firstName} ${user?.lastName}`}</h2>
      </div>

      <nav className="mt-6 flex flex-col gap-3">
        <li>
          <Link
            to="/"
            className={`flex items-center gap-4 text-sm text-[#6c757d] hover:text-black uppercase px-5 py-3 tranistion-all duration-500 hover:bg-white rounded-xl hover:shadow-md hover:shadow-dark/10 ${
              pathname === "/" && "text-black bg-white"
            }`}
          >
            <FiHome className="text-xl" />
            Feed
          </Link>
        </li>
        <li>
          <Link
            to="/profile"
            className={`flex items-center gap-4 text-sm text-[#6c757d] hover:text-black uppercase px-5 py-3 tranistion-all duration-500 hover:bg-white rounded-xl hover:shadow-md hover:shadow-dark/10 ${
              pathname === "/profile" && "text-black bg-white"
            } ${pathname === "/edit-profile" && "text-black bg-white"}`}
          >
            <FaUserCircle className="text-xl" />
            Profile
          </Link>
        </li>
        <li>
          <Link
            to="/"
            className="flex items-center gap-4 text-sm text-[#6c757d] hover:text-black uppercase px-5 py-3 tranistion-all duration-500 hover:bg-white rounded-xl hover:shadow-md hover:shadow-dark/10"
          >
            <MdExplore className="text-2xl" />
            explore
          </Link>
        </li>
        <li>
          <Link
            to="/"
            className="flex items-center gap-4 text-sm text-[#6c757d] hover:text-black uppercase px-5 py-3 tranistion-all duration-500 hover:bg-white rounded-xl hover:shadow-md hover:shadow-dark/10"
          >
            <BsFire className="text-xl" />
            trending
          </Link>
        </li>
        <li>
          <Link
            to="/"
            className="flex items-center gap-4 text-sm text-[#6c757d] hover:text-black uppercase px-5 py-3 tranistion-all duration-500 hover:bg-white rounded-xl hover:shadow-md hover:shadow-dark/10"
          >
            <RiPagesLine className="text-xl" />
            pages
          </Link>
        </li>
        <li>
          <div
            className="flex items-center gap-4 text-sm text-[#6c757d] hover:text-black uppercase px-5 py-3 tranistion-all duration-500 hover:bg-white rounded-xl hover:shadow-md hover:shadow-dark/10 cursor-pointer"
            onClick={logout}
          >
            <MdLogout className="text-xl" />
            logout
          </div>
        </li>
      </nav>
    </aside>
  );
};

export default LeftSidebar;
