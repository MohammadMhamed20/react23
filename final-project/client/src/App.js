import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { Route, Routes, useLocation } from "react-router-dom";
import PrivateRoute from "./components/AccessRoutes/PrivateRoute";
import PublicRoute from "./components/AccessRoutes/PublicRoute";
import Header from "./components/shared/Header";
import LeftSidebar from "./components/shared/LeftSidebar";
import RightSidebar from "./components/shared/RightSidebar";
import ThemeBtn from "./components/ui/ThemeBtn";
import EditProfile from "./pages/EditProfile";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";

const App = () => {
  const { pathname } = useLocation();
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
    }
  }, [darkMode]);

  return (
    <>
      <Toaster />
      <ThemeBtn darkMode={darkMode} setDarkMode={setDarkMode} />
      {pathname === "/login" ? (
        <></>
      ) : pathname === "/register" ? (
        <></>
      ) : (
        <Header />
      )}
      <div className="container flex justify-between gap-6 mt-5">
        {pathname === "/login" ? (
          <></>
        ) : pathname === "/register" ? (
          <></>
        ) : (
          <div className="w-[25%] lg:block hidden">
            <LeftSidebar />
          </div>
        )}
        <div
          className={
            pathname === "/login"
              ? "w-full"
              : pathname === "/register"
              ? "w-full"
              : "lg:w-[50%] w-full"
          }
        >
          <Routes>
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="/register"
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route
              path="/edit-profile"
              element={
                <PrivateRoute>
                  <EditProfile />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
        {pathname === "/login" ? (
          <></>
        ) : pathname === "/register" ? (
          <></>
        ) : (
          <div className="w-[25%] lg:block hidden">
            <RightSidebar />
          </div>
        )}
      </div>
    </>
  );
};

export default App;
