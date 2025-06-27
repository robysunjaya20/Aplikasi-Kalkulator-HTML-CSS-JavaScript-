import React from "react";

export default function ToggleMode({ darkMode, setDarkMode }) {
  return (
    <div className="toggle-mode">
      <label className="switch">
        <input
          type="checkbox"
          checked={darkMode}
          onChange={() => setDarkMode(!darkMode)}
        />
        <span className="slider round"></span>
      </label>
      <span>{darkMode ? "Dark Mode" : "Light Mode"}</span>
    </div>
  );
}