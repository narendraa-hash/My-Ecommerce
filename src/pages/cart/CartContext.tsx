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
    increaseQuantity: (id: number) => void;
    decreaseQuantity: (id: number) => void;
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

    const increaseQuantity = (id: number) => {
        setCart((prev) =>
            prev.map((p) =>
                p.id === id ? {...p, quantity: (p.quantity || 1) + 1 } : p
            )
        );
    };

    const decreaseQuantity = (id: number) => {
        setCart((prev) =>
            prev.map((p) =>
                p.id === id ? {...p, quantity: Math.max((p.quantity || 1) - 1, 1) } : p
            )
        );
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, increaseQuantity, decreaseQuantity }}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => {
    const ctx  = useContext(CartContext);
    if (!ctx) throw new Error("useCart must be used inside CartProvider");
    return ctx;
};
