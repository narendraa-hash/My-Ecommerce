import React, { createContext, useContext, useState } from "react";

interface User {
    id: string;
    username: string;
    password?: string;
}

interface AuthContextType {
    user: User[] | null;   // <-- array now
    token: string | null;
    login: (user: User[]) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User[] | null>(null);
    const [token, setToken] = useState<string | null>(null);

    const login = (user: User[]) => {
        // Ensure user object is valid
        if (!user) return;
        const fakeToken = "token-" + user[0].id;
        setUser(user);
        setToken(fakeToken);
    };

    const logout = () => {
        setUser(null);
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
    return ctx;
}
