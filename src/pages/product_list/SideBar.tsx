import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CartPopup from "../cart/CartPopup";
import { useAuth } from "../../AuthContext";
import { useCart } from "../cart/CartContext.tsx";

type Props = {
  children?: React.ReactNode;
  title?: string;
};

function SideBar({ children, title }: Props) {
    const navigate = useNavigate();
    const location = useLocation();
    const [cartOpen, setCartOpen] = useState(false);
    const { user } = useAuth(); // Get logged-in User
    const [close, setClose] = useState(false);
    const [open, setOpen] = useState<boolean>(() => {
        const saved = localStorage.getItem("sidebar-open"); // Load From LocalStorage So It Remembers The Last State
        return saved ? JSON.parse(saved) : true;    // Open By Default
    });
    const { clearCart } = useCart();

    // Store In LocalStorage When Toggled
    useEffect(() => {
        localStorage.setItem("sidebar-open", JSON.stringify(open));
        setClose(false);
    }, [open]);

    const handleLogout = () => {
        clearCart()
        navigate("/login");
    };

    // inside SideBar, wherever you navigate to a category:
    const GoToCategory = (cat: string) => {
        if (cat === "home") {
            navigate("/home");
        }
        else if (cat === "admin") {
            navigate("/admin");
        }
        else {
            navigate(`/products/${encodeURIComponent(cat)}`);
        }
    };

    // Helper To Build Target For Category or Special Pages
    const pathFor = (cat: string) => {
        if (cat === "home") return "/home";
        if (cat === "admin") return "/admin";
        return `/products/${encodeURIComponent(cat)}`;
    };

    // isActive returns true if the current pathname equals target or starts with target + '/'
    const isActive = (cat: string) => {
        const target = pathFor(cat);
        return (
            location.pathname === target ||
            location.pathname.startsWith(target + "/")  // handles /products/:category/:id
        );
    };

    const categories = [
        {id: 1, icon: "👕", label: "Men's Clothing", value: "men's clothing"},
        {id: 5, icon: "💍", label: "Jewellery", value: "jewelery"},
        {id: 9, icon: "📱", label: "Electronics", value: "electronics"},
        {id: 16, icon: "👗", label: "Women's Clothing", value: "women's clothing"},
    ];

    return (
        <>
            <div className="min-h-screen">

                {/* Sidebar Drawer */}
                <aside
                    className={`fixed top-0 left-0 z-40 w-64 h-screen p-4 overflow-y-auto bg-gray-100 dark:bg-gray-800 transform transition-transform duration-300 border-x-1 border-gray-300  ${
                        open ? "translate-x-0" : "-translate-x-full"
                    }`}>
                    <div className="flex items-center justify-center mb-4">
                        <a onClick={() => GoToCategory("home")} className="text-base font-bold text-gray-600 hover:text-gray-900 uppercase dark:text-gray-400 cursor-pointer">
                            <span className="ms-3">Menu</span>
                        </a>
                        <button onClick={() => setOpen(false)} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
                            <svg aria-label="Close Menu" aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                            </svg>
                            <span className="sr-only">Close menu</span>
                        </button>
                    </div>

                    {/* Menu list */}
                    <nav className="overflow-y-auto">
                        <ul className="space-y-2 font-medium">

                            {/* Admin */}
                            <li>
                                {user?.[0].username?.toLowerCase() === "admin" && (
                                    <li>
                                        <a onClick={() => GoToCategory("admin")} id="admin"
                                           className={`flex items-center w-full p-2 text-left text-gray-900 rounded-lg group cursor-pointer ${
                                               isActive("admin")
                                                   ? "bg-blue-600 text-white font-semibold shadow-md"
                                                   : "text-gray-900 dark:text-white hover:bg-gray-400 dark:hover:bg-gray-700"
                                           }`}>
                                            <span>⚙️</span>
                                            <span className="ms-3">Admin</span>
                                        </a>
                                    </li>
                                )}
                            </li>

                            {/* List of Categories */}
                            <li className="space-y-2">
                                {categories.map((c) => (
                                    <a key={c.id} onClick={() => GoToCategory(c.value)} id="group_categories"
                                       className={`flex items-center w-full p-2 text-left text-gray-900 rounded-lg group cursor-pointer ${
                                           isActive(c.value)
                                               ? "bg-blue-600 text-white font-semibold shadow-md"
                                               : "text-gray-900 dark:text-white hover:bg-gray-400 dark:hover:bg-gray-700"
                                       }`}>
                                        <span>{c.icon}</span>
                                        <span className="ms-3">{c.label}</span>
                                    </a>
                                ))}
                            </li>

                            {/* Logout */}
                            <li>
                                <button onClick={handleLogout} id="submit" className="mt-3 w-full bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-900 transition text-sm cursor-pointer">Sign Out</button>
                            </li>
                        </ul>
                    </nav>
                </aside>

                {/* Header — fixed and will shift on desktop when the sidebar is open */}
                <header
                    className={`fixed top-0 z-20 flex items-center justify-between px-4 py-3 bg-gray-100 shadow transition-all duration-300 border-b-1 border-gray-300 ${
                        open ? "lg:left-64 lg:w-[calc(100%-16rem)]" : "left-0 w-full"
                    }`} >

                    {/* Button to open sidebar */}
                    {close == false && open == false && (
                        <div className="flex items-center gap-3">
                            <button onClick={() => setOpen((s) => !s)} className="inline-flex items-center justify-center p-2 rounded-md bg-blue-600 text-white hover:bg-blue-900 focus:outline-none cursor-pointer" aria-expanded={open} aria-controls="sidebar">
                                <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-align-left">
                                    <line x1="17" y1="10" x2="3" y2="10"></line>
                                    <line x1="21" y1="6" x2="3" y2="6"></line>
                                    <line x1="21" y1="14" x2="3" y2="14"></line>
                                    <line x1="17" y1="18" x2="3" y2="18"></line>
                                </svg>
                            </button>
                        </div>
                    )}
                    <h3 className="flex-1 text-center text-xl font-bold cursor-default">{title}</h3>
                    <div className="flex items-center gap-2 mx-18">

                        {/* placeholder for right side — keep header balanced */}
                        <div style={{ width: 36 }}></div>
                    </div>
                </header>

                {/* Main content area — will be pushed right on large screens when open */}
                <main className={`pt-16 transition-all duration-300 ${open ? "lg:ml-62" : "lg:ml-0"}`}>

                    {/* Only show if NOT on login */}
                    {location.pathname !== "/login" && location.pathname !== "/order-success" && (
                        <div className="fixed top-2 right-3 z-50">
                            <button onClick={() => setCartOpen(true)} className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 cursor-pointer">Go to Cart</button>
                        </div>
                    )}

                    {/* Cart Modal */}
                    <CartPopup isOpen={cartOpen} onClose={() => setCartOpen(false)} />
                    <div className="p-3">{children}</div>
                </main>
            </div>
        </>
    );
}

export default SideBar;
