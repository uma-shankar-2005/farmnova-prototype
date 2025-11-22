import React from "react";
import { useDarkMode } from "../context/DarkModeContext";

const DarkModeToggle = () => {
  const { dark, setDark } = useDarkMode();
  return (
    <button
      className="ml-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
      onClick={() => setDark((dark) => !dark)}
      aria-label="Toggle dark mode"
    >
      {dark ? (
        <svg className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 2a1 1 0 01.993.883L11 3v1a1 1 0 01-1.993.117L9 4V3a1 1 0 011-1zm4.22 2.03a1 1 0 01.083 1.32l-.083.094-.707.707a1 1 0 01-1.497-1.32l.083-.094.707-.707a1 1 0 011.414 0zm4 7a1 1 0 01.117 1.993L18 11h-1a1 1 0 01-.117-1.993L17 9h1zm-8 6a1 1 0 01.993.883L11 17v1a1 1 0 01-1.993.117L9 18v-1a1 1 0 011-1zm-6-6a1 1 0 01.117 1.993L4 11H3a1 1 0 01-.117-1.993L3 9h1zm1.636-5.364a1 1 0 01.083 1.32l-.083.094-.707.707a1 1 0 01-1.497-1.32l.083-.094.707-.707a1 1 0 011.414 0zm12.728 12.728a1 1 0 01.083 1.32l-.083.094-.707.707a1 1 0 01-1.497-1.32l.083-.094.707-.707a1 1 0 011.414 0zm-12.728 0a1 1 0 01.083 1.32l-.083.094-.707.707a1 1 0 01-1.497-1.32l.083-.094.707-.707a1 1 0 011.414 0zM10 6a4 4 0 100 8 4 4 0 000-8z" />
        </svg>
      ) : (
        <svg className="w-6 h-6 text-gray-700 dark:text-gray-200" fill="currentColor" viewBox="0 0 20 20">
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      )}
    </button>
  );
};

export default DarkModeToggle;
