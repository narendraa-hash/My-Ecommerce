import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/Login/LoginPage";
import ProductsList from "./pages/product_list/ProductsList";     // adjust path if files live in ./pages or ./components
import SingleProduct from "./pages/product_list/SingleProduct";
import HomePage from "./pages/home/HomePage";
import CheckoutPage from "./pages/cart/CheckoutPage";
import OrderSuccess from "./pages/order/OrderSuccess";
import AuthProvider from "./AuthContext";
import RegisterPage from "./pages/Login/RegisterPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminAddProduct from "./pages/admin/AdminAddProduct";
import AdminEditProduct from "./pages/admin/AdminEditProduct";

function App() {
    return (
        <>
            <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
                <AuthProvider>
                    <Router>
                        <Routes>

                            {/* Default route → Login Page */}
                            <Route path="/" element={<Navigate to="/login" replace />} />
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/register" element={<RegisterPage />} />
                            <Route path="/admin" element={<AdminDashboard />} />
                            <Route path="/admin/add" element={
                                <AdminAddProduct
                                    isNewOpen={false}
                                    onNewClose={function (): void { throw new Error("Function not implemented."); } }
                                    onProductAdded={function (_product: any): void { throw new Error("Function not implemented."); } }
                                />
                                }
                            />
                            <Route path="/admin/edit/:id" element={
                                <AdminEditProduct
                                    isOpen={false}
                                    onClose={function (): void { throw new Error("Function not implemented."); } }
                                    product={undefined} onProductUpdated={function (_product: any): void { throw new Error("Function not implemented."); } }
                                />
                                }
                            />

                            {/* After login → Home Page */}
                            <Route path="/home" element={<HomePage />} />

                            {/* Products list */}
                            <Route path="/products" element={<ProductsList />} />
                            <Route path="/products/:category" element={<ProductsList />} />

                            {/* Open Single Product Page */}
                            <Route path="/products/:id" element={<SingleProduct />} />
                            <Route path="/products/:category/:id" element={<SingleProduct />} />

                            {/* Check Out & Order Succes Pages */}
                            <Route path="/checkout" element={<CheckoutPage />} />
                            <Route path="/order-success" element={<OrderSuccess />} />

                            {/* fallback */}
                            <Route path="*" element={<Navigate to="/login" replace />} />
                            
                        </Routes>
                    </Router>
                </AuthProvider>
            </div>
        </>
    );
};

export default App;
