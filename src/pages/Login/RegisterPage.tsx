import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext";
import { checkUsernameExists, registerUser } from "../../api";
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';    // Or solid, depending on your preference


function registerPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { login } = useAuth();
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!username && !password) {
            setError("Both fields are required.");
            return;
        }
        try {
            // Check if the username already exists
            const existUser = await checkUsernameExists(username);
            if (existUser) {
                setError("Username already taken. Choose another.");
                return;
            }

            // Create a new User
            const newUser = await registerUser(username, password);
            if (newUser) {
                login(newUser); // auto-login after registration
                navigate("/home");
            }
        } catch(err) {
            console.error("API Error:", err);
            setError("Registration failed. Try again.");
        }
    };

    return (
        <>
            <div className="h-screen flex flex-col">

                {/* Header */}
                <header className="fixed top-0 left-0 w-full bg-white shadow p-4 text-center text-xl font-bold z-10">My Ecommerce</header>

                {/* Main Content */}
                <main className="flex-grow bg-blue-500 flex items-center justify-center">
                    <div className="bg-white w-full max-w-sm rounded-2xl shadow-lg p-8">
                        <h2 className="text-2xl font-semibold text-center mb-6" id="register">Register</h2>
                        <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>

                            {/* Username */}
                            <input value={username} onChange={(e) => setUsername(e.target.value)}
                                   type="text"
                                   className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                   placeholder="Username" id="username"
                            autoComplete="username" autoFocus/>

                            {/* Password */}
                            <div className="relative">
                                <input value={password}
                                       onChange={(e) => setPassword(e.target.value)}
                                       type={showPassword ? "text" : "password"}
                                       className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                       placeholder="Password" id="password"/>
                                <span onClick={togglePasswordVisibility} className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer">
                                    {showPassword ? (
                                        <EyeSlashIcon className="h-5 w-5 text-gray-400" id="hide_pass" />
                                    ) : (
                                        <EyeIcon className="h-5 w-5 text-gray-400" id="show_pass" />
                                    )}
                                </span>
                            </div>

                            {error && <p className="text-red-500 text-sm">{error}</p>}
                            <button type="submit" className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer" id="create_account">Create Account</button>
                        </form>
                        <p className="mt-4 text-center text-sm cursor-default">Already have an account?{" "}
                            <span className="text-blue-600 cursor-pointer" onClick={() => navigate("/login")}>Sign In</span>
                        </p>
                    </div>
                </main>
            </div>
        </>
    );
}

export default registerPage;
