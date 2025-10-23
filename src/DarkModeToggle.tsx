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
                className="bg-gray-600 text-white hover:bg-gray-900 dark:text-gray-900 dark:bg-white dark:hover:bg-gray-400 p-3 rounded transition duration-300 ease-in-out
                    flex items-center justify-center text-sm font-medium cursor-pointer w-full h-10"
            >
                {darkMode ? "☀️ Light" : "🌙 Dark"}
            </button>
        </>
    );
}

export default DarkModeToggle;
