import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
    user: any;
    token: string | null;
    login: (user: any) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function AuthProvider({ children }: {children: React.ReactNode}) {
    const [user, setUser] = useState<any>(null);
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        // Load from localStorage
        const savedUser = localStorage.getItem("user");
        const savedToken = localStorage.getItem("token");
        if (savedUser && savedToken) {
            setUser(JSON.parse(savedUser));
            setToken(savedToken);
        }
    }, []);

    const login = (user: any) => {
        const fakeToken = "token-" + user.id;   // simulate token
        setUser(user);
        setToken(fakeToken);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", fakeToken);
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    };

    return (
        <>
            <AuthContext.Provider value={{user, token, login, logout}}>
                {children}
            </AuthContext.Provider>
        </>
    );
}

export default AuthProvider;

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
    return ctx;
}
