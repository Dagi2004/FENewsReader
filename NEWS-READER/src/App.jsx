import "./App.css";
import { useState } from "react";
import SignUp from "./pages/SignUp";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import NewsCard from "./components/NewsCard";
import { Route, Routes, Navigate } from "react-router-dom";

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleColor = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <>
      {isLoggedIn && <Navbar toggleColor={toggleColor} />}
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <NewsCard isDarkMode={isDarkMode} category="general" />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/entertainment"
          element={
            isLoggedIn ? (
              <NewsCard isDarkMode={isDarkMode} category="entertainment" />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/technology"
          element={
            isLoggedIn ? (
              <NewsCard isDarkMode={isDarkMode} category="technology" />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/sports"
          element={
            isLoggedIn ? (
              <NewsCard isDarkMode={isDarkMode} category="sports" />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/login"
          element={
            !isLoggedIn ? <Login onLogin={handleLogin} /> : <Navigate to="/" />
          }
        />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </>
  );
};

export default App;
