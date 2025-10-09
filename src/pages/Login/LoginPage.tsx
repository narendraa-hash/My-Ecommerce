import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext";
import { loginUser } from "../../api";

function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // login check
        const user = await loginUser(username, password);
        if (username && password) {
            if (user) {
                login(user);    // save to context + localStorage
                navigate("/home");
                {/* if (user.username.toLowerCase() === "admin") {  // Redirection Logic
                    navigate("/admin");
                } else {
                    navigate("/home");
                    
                } */}
            }
        } 
        else {
            setError("Invalid username or password");
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
                        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
                        <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>

                            {/* Username */}
                            <input value={username} onChange={(e) => setUsername(e.target.value)} className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" id="user_name" type="text" placeholder="Username" />

                            {/* Password */}
                            <input value={password} onChange={(e) => setPassword(e.target.value)} className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" id="password" type="password" placeholder="Password" />

                            {/* Error Message */}
                            {error && <p className="text-red-500 text-sm">{error}</p>}

                            {/* Submit Button */}
                            <button type="submit" id="submit" className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">Sign In</button>
                        </form>
                        <p className="mt-4 text-center text-sm">
                            Create New User?{" "}
                            <span className="text-blue-600 cursor-pointer" onClick={() => navigate("/register")}>Sign Up</span>
                        </p>
                    </div>
                </main>
            </div>
        </>
    );
}

export default LoginPage;
