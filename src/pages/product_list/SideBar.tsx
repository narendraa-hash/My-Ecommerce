import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import CartPopup from "../cart/CartPopup";
import { useAuth } from "../../AuthContext";

type Props = {
  children?: React.ReactNode;
  title?: string;
};

function SideBar({ children, title = "My Ecommerce - Products" }: Props) {
    
    const navigate = useNavigate();
    const { category } = useParams<{ category?: string}>();
    const location = useLocation();
    const [cartOpen, setCartOpen] = useState(false);
    const { user } = useAuth(); // Get Logged-in User
    const [open, setOpen] = useState<boolean>(() => {
        const saved = localStorage.getItem("sidebar-open"); // Load From LocalStorage So It Remembers The Last State
        return saved ? JSON.parse(saved) : true;    // Open By Default
    });
    
    // Store In LocalStorage When Toggled
    useEffect(() => {
        localStorage.setItem("sidebar-open", JSON.stringify(open));
    }, [open]);

    const handleLogout = () => {
        navigate("/login");
    };

    // inside SideBar, wherever you navigate to a category:
    const GoToCategory = (cat: string) => {
        console.log("cat", cat);
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

    const isActive = (cat: string) => category === cat;

    return (
        <> 
            <div className="min-h-screen">
                
                {/* Sidebar Drawer */}
                <aside
                    className={`fixed top-0 left-0 z-40 w-64 h-screen p-4 overflow-y-auto bg-white dark:bg-gray-800 transform transition-transform duration-300 ${
                        open ? "translate-x-0" : "-translate-x-full"
                    }`}>
                    <div className="flex items-center justify-center mb-4">
                        <h5 onClick={() => GoToCategory("home")} className="text-base font-bold text-gray-500 uppercase dark:text-gray-400 cursor-pointer">Menu</h5>
                        {/* <button onClick={() => setOpen(false)} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
                            <svg aria-label="Close Menu" aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                            </svg>
                            <span className="sr-only">Close menu</span>
                        </button> */}
                    </div>

                    {/* Menu list */}
                    <nav className="py-4 overflow-y-auto">
                        <ul className="space-y-2 font-medium">
                            
                            {/* Admin */}
                            {user[0].username?.toLowerCase() === "admin" && (
                                <li>
                                    <a onClick={() => GoToCategory("admin")} id="admin"
                                        className={`flex items-center w-full p-2 text-left text-gray-900 rounded-lg group cursor-pointer ${
                                            isActive("admin") && user?.username?.toLowerCase() === "admin"    
                                                ? "bg-blue-600 text-white font-semibold shadow-md"
                                                : "text-gray-900 dark:text-white hover:bg-gray-400 dark:hover:bg-gray-700"
                                        }`}>
                                        <span>⚙️</span>
                                        <span className="ms-3">Admin</span>
                                    </a>
                                </li>
                            )}

                            {/* Shirts */}
                            <li>
                                <a onClick={() => GoToCategory("men's clothing")} id="mens_clothing"
                                    className={`flex items-center w-full p-2 text-left text-gray-900 rounded-lg group cursor-pointer ${
                                        isActive("men's clothing")
                                            ? "bg-blue-600 text-white font-semibold shadow-md"
                                            : "text-gray-900 dark:text-white hover:bg-gray-400 dark:hover:bg-gray-700"
                                    }`}>
                                    {/* <svg className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M4 4l4-2 4 2 4-2 4 2v6l-2 2v10H6V12L4 10V4z"/>
                                    </svg> */}
                                    <span>👕</span>
                                    <span className="ms-3">Shirts</span>
                                </a>
                            </li>

                            {/* Jewellery */}
                            <li>
                                <a onClick={() => GoToCategory("jewelery")} id="jewelery"
                                    className={`flex items-center w-full p-2 text-left text-gray-900 rounded-lg group cursor-pointer ${
                                        isActive("jewelery")
                                            ? "bg-blue-600 text-white font-semibold shadow-md"
                                            : "text-gray-900 dark:text-white hover:bg-gray-400 dark:hover:bg-gray-700"
                                    }`}>
                                    {/* <svg className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2l3 5-3 3-3-3 3-5zm0 7l7 7-7 7-7-7 7-7z"/>
                                    </svg> */}
                                    <span>💍</span>
                                    <span className="ms-3">Jewellery</span>
                                </a>
                            </li>

                            {/* Electronics */}
                            <li>
                                <a onClick={() => GoToCategory("electronics")} id="electronics"
                                    className={`flex items-center w-full p-2 text-left text-gray-900 rounded-lg group cursor-pointer ${
                                        isActive("electronics")
                                            ? "bg-blue-600 text-white font-semibold shadow-md"
                                            : "text-gray-900 dark:text-white hover:bg-gray-400 dark:hover:bg-gray-700"
                                    }`}>
                                    {/* <svg className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M4 6h16v12H4V6zm2 2v8h12V8H6zM9 20h6v2H9v-2z"/>
                                    </svg> */}
                                    <span>📱</span>
                                    <span className="ms-3">Electronics</span>
                                </a>
                            </li>
                            
                            {/* Women Clothing */}
                            <li>
                                <a onClick={() => GoToCategory("women's clothing")} id="women_clothing"
                                    className={`flex items-center w-full p-2 text-left text-gray-900 rounded-lg group cursor-pointer ${
                                        isActive("women's clothing")
                                            ? "bg-blue-600 text-white font-semibold shadow-md"
                                            : "text-gray-900 dark:text-white hover:bg-gray-400 dark:hover:bg-gray-700"
                                    }`}>
                                    {/* <svg className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2a5 5 0 015 5c0 1.38-.56 2.63-1.46 3.54L14 12v8h-4v-8l-1.54-1.46A5 5 0 017 7a5 5 0 015-5z"/>
                                    </svg> */}
                                    <span>👗</span>
                                    <span className="ms-3">Women Clothing</span>
                                </a>
                            </li>

                            {/* Logout */}
                            <li>
                                <button onClick={handleLogout} id="submit" className="mt-3 w-full bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition text-sm cursor-pointer">Sign Out</button>
                            </li>
                        </ul>
                    </nav>
                </aside>

                {/* MOBILE overlay only (lg:hidden) */}
                {open && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden pointer-events-none"></div>   // clicking overlay closes sidebar
                )}

                {/* Header — fixed and will shift on desktop when sidebar is open */}
                <header
                    className={`fixed top-0 z-20 flex items-center justify-between px-4 py-3 bg-white shadow transition-all duration-300 ${
                        open ? "lg:left-64 lg:w-[calc(100%-16rem)]" : "left-0 w-full"
                    }`} >

                    {/* Button to open drawer */}
                    <div className="flex items-center gap-3">
                        <button onClick={() => setOpen((s) => !s)} className="inline-flex items-center justify-center p-2 rounded-md bg-blue-700 text-white hover:bg-blue-800 focus:outline-none cursor-pointer" aria-expanded={open} aria-controls="sidebar">
                            <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-align-left">
                                <line x1="17" y1="10" x2="3" y2="10"></line>
                                <line x1="21" y1="6" x2="3" y2="6"></line>
                                <line x1="21" y1="14" x2="3" y2="14"></line>
                                <line x1="17" y1="18" x2="3" y2="18"></line>
                            </svg>
                        </button>
                    </div>
                    <h3 className="flex-1 text-center text-xl font-bold">{title}</h3>
                    <div className="flex items-center gap-2 mx-18">

                        {/* placeholder for right side — keep header balanced */}
                        <div style={{ width: 36 }}></div>
                    </div>
                </header>

                {/* Main content area — will be pushed right on large screens when open */}
                <main className={`pt-16 transition-all duration-300 ${open ? "lg:ml-64" : "lg:ml-0"}`}>

                    {/* Only show if NOT on login */}
                    {location.pathname !== "/login" && (
                        <div className="fixed top-3 right-3 z-50">
                            <button onClick={() => setCartOpen(true)}className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 cursor-pointer">Go to Cart</button>
                        </div>
                    )}
                    
                    {/* Cart Modal */}
                    <CartPopup isOpen={cartOpen} onClose={() => setCartOpen(false)} />
                    <div className="p-6">{children}</div>
                </main>
            </div>
        </>
    );
}

export default SideBar;
