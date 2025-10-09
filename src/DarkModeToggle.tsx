import { useEffect } from "react";

function DarkModeToggle({darkMode, toggleDark} : { darkMode: boolean; toggleDark: () => void}) {

    useEffect(() => {
        if (darkMode) document.documentElement.classList.add("dark");
        else document.documentElement.classList.remove("dark");
        localStorage.setItem("dark", darkMode.toString());
    }, [darkMode]);

    return (
        <>
            <button onClick={toggleDark} 
                className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition">
                {darkMode ? "☀️ Light" : "🌙 Dark"}
            </button>
        </>
    );
}

export default DarkModeToggle;
