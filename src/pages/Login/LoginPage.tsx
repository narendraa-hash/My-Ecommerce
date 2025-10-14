import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext";
import { loginUser } from "../../api";
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'; // Or solid, depending on your preference

function LoginPage() {
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
        const user = await loginUser(username, password);
        if (!username && !password) {
            setError("Please enter username and password.");
        }

        // login check
        try {
            if (user && user.length > 0) {
                login(user);    // save to context + localStorage
                navigate("/home");
            } else {
                setError("Invalid username or password");
            }
        } catch (err) {
            console.error("API Error:", err);
            setError("Login failed. Please try again.");
        }
    };

    return (
        <>
            <div className="h-screen flex flex-col">

                {/* Header */}
                <header className="fixed top-0 left-0 w-full bg-white shadow p-4 text-center text-xl font-bold z-10">My Ecommerce</header>

                {/* Main content */}
                <main className="flex-grow bg-blue-500 flex items-center justify-center">

                    {/* Card */}
                    <div className="bg-white w-full max-w-sm rounded-2xl shadow-lg p-8">
                        <h2 className="text-2xl font-semibold text-center mb-6" id="login">Login</h2>
                        <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>

                            {/* Username */}
                            <input value={username} onChange={(e) => setUsername(e.target.value)}
                                   className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                   id="user_name" type="text" placeholder="Username"
                            autoComplete="username" autoFocus />

                            {/* Password */}
                            <div className="relative">
                                <input value={password} onChange={(e) => setPassword(e.target.value)}
                                       className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                       id="password" type={showPassword ? "text" : "password"} placeholder="Password"
                                />

                                <span onClick={togglePasswordVisibility} className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer" id="enable_hide_pass">
                                    {showPassword ? (
                                        <EyeSlashIcon className="h-5 w-5 text-gray-400" id="hide_pass" />
                                    ) : (
                                        <EyeIcon className="h-5 w-5 text-gray-400" id="show_pass" />
                                    )}
                                </span>
                            </div>

                            {/* Error Message */}
                            {error && <p className="text-red-500 text-sm">{error}</p>}

                            {/* Submit Button */}
                            <button type="submit" className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer" id="sign_in">Sign In</button>
                        </form>
                        <p className="mt-4 text-center text-sm cursor-default">Create New User?{" "}
                            <span className="text-blue-600 cursor-pointer" onClick={() => navigate("/register")}>Sign Up</span>
                        </p>
                    </div>
                </main>
            </div>
        </>
    );
}

export default LoginPage;
