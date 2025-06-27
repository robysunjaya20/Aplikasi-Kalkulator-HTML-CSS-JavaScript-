import React, { useState, useEffect } from "react";
import Calculator from "./components/Calculator";
import ToggleMode from "./components/ToggleMode";

export default function App() {
  // State untuk dark mode, ambil dari localStorage kalau ada
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved === "true";
  });

  // Update class dan localStorage saat darkMode berubah
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  return (
    <div className="app">
      <ToggleMode darkMode={darkMode} setDarkMode={setDarkMode} />
      <Calculator />
      <footer className="footer">Dibuat oleh Roby Sunjaya</footer>
    </div>
  );
}