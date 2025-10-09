<<<<<<< HEAD
import { createContext, useState, useContext, type ReactNode, useEffect } from "react";

interface Product {
    id: number;
    title: string;
    image: string;
    price: number;
    quantity?: number;
}

interface CartContextType {
    cart: Product[];
    addToCart: (product: Product) => void;
    removeFromCart: (id: number) => void;
    clearCart: () => void;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider ({children}: { children: ReactNode }) {
    const [cart, setCart] = useState<Product[]>(() => {
        const saved = localStorage.getItem("cart");
        return saved ? JSON.parse(saved) : [];
    });

    // Save Cart To LocalStorage Whenever It Changes
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product: Product) => {
        setCart((prev) => {
            const existing = prev.find((p) => p.id === product.id);
            if (existing) {
                return prev.map((p) =>
                    p.id === product.id ? {...p, quantity: (p.quantity || 1) + 1} : p
                );
            }
            return [...prev, {...product, quantity: 1}];
        });
    };

    const removeFromCart = (id: number) => {
        setCart((prev) => prev.filter((p) => p.id !== id));
    };

    const clearCart = () => setCart([]);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => {
    const ctx  = useContext(CartContext);
    if (!ctx) throw new Error("useCart must be used inside CartProvider");
    return ctx;
};
=======
import { createContext, useState, useContext, type ReactNode, useEffect } from "react";

interface Product {
    id: number;
    title: string;
    image: string;
    price: number;
    quantity?: number;
}

interface CartContextType {
    cart: Product[];
    addToCart: (product: Product) => void;
    removeFromCart: (id: number) => void;
    clearCart: () => void;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider ({children}: { children: ReactNode }) {
    const [cart, setCart] = useState<Product[]>(() => {
        const saved = localStorage.getItem("cart");
        return saved ? JSON.parse(saved) : [];
    });

    // Save Cart To LocalStorage Whenever It Changes
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product: Product) => {
        setCart((prev) => {
            const existing = prev.find((p) => p.id === product.id);
            if (existing) {
                return prev.map((p) =>
                    p.id === product.id ? {...p, quantity: (p.quantity || 1) + 1} : p
                );
            }
            return [...prev, {...product, quantity: 1}];
        });
    };

    const removeFromCart = (id: number) => {
        setCart((prev) => prev.filter((p) => p.id !== id));
    };

    const clearCart = () => setCart([]);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => {
    const ctx  = useContext(CartContext);
    if (!ctx) throw new Error("useCart must be used inside CartProvider");
    return ctx;
};
>>>>>>> 6c1a8b61e1f3198161b846041f59fea3250ea9af
