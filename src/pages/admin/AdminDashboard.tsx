import { useEffect, useState } from "react";
import { getAllProducts, deleteProduct } from "../../api";
import AdminAddProduct from "./AdminAddProduct";
import AdminEditProduct from "./AdminEditProduct";
import SideBar from "../product_list/SideBar";

interface Product {
    id: string;
    title: string;
    price: number;
    description?: string | undefined; // optional
    category: string;
    image: string;
}

function AdminDashboard() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [cartOpen, setCartOpen] = useState(false);
    const [updCartOpen, setUpdCartOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    // Load Products
    const fetchProducts = async () => {
        setLoading(true);

        // Load from localStorage first
        const localData = localStorage.getItem("adminProducts");
        if (localData) {
            setProducts(JSON.parse(localData));
            setLoading(false);
        }

        // Then fetch fresh data from the backend
        const res = await getAllProducts();
        if (res.status === 200) {
            // console.log("res", res.data);
            setProducts(res.data);
            localStorage.setItem("adminProducts", JSON.stringify(res.data));    // Sync to localStorage
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchProducts().then(() => {});
    }, []);

    // Delete product from both backend & localStorage
    const handleDelete = async (id: number) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            const res = await deleteProduct(id);
            if (res.status === 200) {
                alert("Product Deleted!");
                const delProInLocal = products.filter((p) => Number(p.id) !== id);
                setProducts(delProInLocal);
                localStorage.setItem("adminProducts", JSON.stringify(delProInLocal));
            }
        }
    };

    const handleEdit = (product: Product) => {
        setSelectedProduct(product);
        setUpdCartOpen(true);
    };

    // Add & Edit Callbacks
    const handleProductAdded = (newProduct: Product) => {
        setProducts((prev) => [...prev, newProduct]);
    };

    const handleProductUpdated = (updated: Product) => {
        setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    };

    return (
        <>
            <SideBar title="Admin Page" darkMode={false} toggleDark={function (): void {
                throw new Error("Function not implemented.");
            }}>
                <button onClick={() => setCartOpen(true)} className="bg-green-600 hover:bg-green-800 text-white px-4 py-2 rounded-lg mb-2 cursor-pointer">Add New Product</button>

                {/* Add Product Modal */}
                <AdminAddProduct isNewOpen={cartOpen} onNewClose={() => setCartOpen(false)} onProductAdded={handleProductAdded}/>

                {/* Edit Popup Modal */}
                {selectedProduct && (
                    <AdminEditProduct isOpen={updCartOpen} onClose={() => setUpdCartOpen(false)} product={selectedProduct} onProductUpdated={handleProductUpdated}/>
                )}
                {loading ? (
                    <p>Loading Product...</p>
                ) : (
                    <table className="min-w-full border rounded admin_table">
                        <thead className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                            <tr>
                                <th className="p-2 border">ID</th>
                                <th className="p-2 border">Title</th>
                                <th className="p-2 border">Category</th>
                                <th className="p-2 border">Price</th>
                                <th className="p-2 border">Action</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200">
                            {products.map((p) => (
                                <tr key={p.id}>
                                    <td className="p-2 border">{p.id}</td>
                                    <td className="p-2 border">{p.title}</td>
                                    <td className="p-2 border">{p.category}</td>
                                    <td className="p-2 border">{p.price}</td>
                                    <td className="p-2 border space-x-2">
                                        <button onClick={() => handleEdit(p)} className="bg-blue-600 hover:bg-blue-800 text-white px-2 py-1 rounded cursor-pointer">Edit</button>
                                        <button onClick={() => handleDelete(Number(p.id))} className="bg-red-600 hover:bg-red-800 text-white px-2 py-1 rounded cursor-pointer">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </SideBar>
        </>
    );
}

export default AdminDashboard;
