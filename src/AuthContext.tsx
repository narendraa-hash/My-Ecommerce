<<<<<<< HEAD
import { createContext, useContext, useState } from "react";

interface AuthContextType {
    user: any;
    token: string | null;
    login: (user: any) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<any>(null);
    const [token, setToken] = useState<string | null>(null);

    const login = (user: any) => {
        // Ensure user object is valid
        if (!user) return;
        const fakeToken = "token-" + user.id;
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
=======
import { createContext, useContext, useState } from "react";

interface AuthContextType {
    user: any;
    token: string | null;
    login: (user: any) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<any>(null);
    const [token, setToken] = useState<string | null>(null);

    const login = (user: any) => {
        // Ensure user object is valid
        if (!user) return;
        const fakeToken = "token-" + user.id;
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
>>>>>>> 6c1a8b61e1f3198161b846041f59fea3250ea9af
