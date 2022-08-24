// this component will handle the toggle mode button

import React from "react";
import { ThemeContext } from "./ThemeContext";

// import fontawesome icon 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";


const ToggleMode = () => {
  const { theme, setTheme } = React.useContext(ThemeContext);
  // const {theme, setTheme} = useContext(ThemeContext)
  return (
    <div>
      {theme === "dark" ? (
        <button
        onClick={() => setTheme(theme=== "dark" ? "light" : "dark")}
          className="inline-block px-4 py-4 text-sm font-semibold leading-none dark:text-white rounded"
          
        >
          <FontAwesomeIcon icon={faSun}></FontAwesomeIcon>
        </button>
      ) : (
        <button
        onClick={() => setTheme(theme=== "dark" ? "light" : "dark")}
          className=" inline-block px-4 py-4 text-base font-semibold leading-none text:text-white text-gray-600 rounded"
          
        >
          <FontAwesomeIcon icon={faMoon}></FontAwesomeIcon>
        </button>
      )}
    </div>
  );
};

export default ToggleMode;