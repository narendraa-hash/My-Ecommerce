import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { getSingleProduct } from "../../api";
import SideBar from "./SideBar";
import { useCart } from "../cart/CartContext";

interface Product {
    id: number;
    title: string;
    image: string;
    price: number;
    description?: string;
    category?: string;
}

function decodeIfNeeded(value?: string) {
    if (!value) return value;
    try {
        return decodeURIComponent(value);
    } catch {
        return value;
    }
}

function SingleProduct() {
    const params = useParams<{ id?: string; category?: string }>();
    const rawCategory = params.category;
    const categoryParam = rawCategory ? decodeIfNeeded(rawCategory) : undefined;
    const id = params.id;
    const navigate = useNavigate();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError]  = useState<string | null>(null);
    const { addToCart } = useCart();

    // New Local States for Button & Notification
    const [disabled, setDisabled] = useState(false);
    const [notification, setNotification] = useState(false);

    useEffect(() => {
        if (!id) return;
        setLoading(true);
        setError(null);
        getSingleProduct(Number(id)).then((res) => {
            if (res.status == 200) {
                setProduct(res.data);
            } else {
                setError("Failet to fetch products.");
            }
        })
        .catch(() => setError("Something went wrong."))
        .finally(() => setLoading(false));
    }, [id]);

    const handleBack = () => {
        // Priority:
        // 1) If category was present in URL params -> go back to that category list.
        // 2) Else if product.category exists (from fetched product) -> go to that category.
        // 3) Else go to all products.
        if (categoryParam) {
            navigate(`/products/${encodeURIComponent(categoryParam)}`);
            return;
        }
        if (product?.category) {
            navigate(`/products/${encodeURIComponent(product.category)}`);
            return;
        }
        navigate("/products");
    };

    const prettyCategory = (cat?: string) => {
        if (!cat) return null;
        // make it look nicer: capitalize first letter
        return cat.charAt(0).toUpperCase() + cat.slice(1);
    };

    // Add To Cart Logic With Notification + Delay
    const handleAddToCart = () => {
        if (!product) return;
        addToCart(product);
        setNotification(true);
        setDisabled(true);

        // Disable For 3 Seconds Then Resets
        setTimeout(() => {
            setNotification(false);
            setDisabled(false);
        }, 3000);
    };

    return (
        <>
            <SideBar title={`My Ecommerce - ${product?.title ?? "Product"}`}>
                <div className="bg-gray-100 min-h-[60vh] p-6 rounded space-y-4">

                    {/* Breadcrumb */}
                    <nav className="text-sm text-gray-600">
                        <Link to="/home" className="hover:underline">Home</Link> 
                        <span className="mx-2">/</span>
                        {categoryParam ? (
                            <>
                                <Link to={`/products/${encodeURIComponent(categoryParam)}`} className="hover:underline">{prettyCategory(categoryParam)}</Link>
                                <span className="mx-2">/</span>
                            </>
                        ) : product?.category ? (
                            <>
                                <Link to={`/products/${encodeURIComponent(product.category!)}`} className="hover:underline">{prettyCategory(product.category)}</Link>
                                <span className="mx-2">/</span>
                            </>
                        ) : null}
                        <span className="font-medium">{product?.title ?? "Product"}</span>
                    </nav>

                    <div className="bg-white p-6 rounded-lg shadow-md flex flex-col sm:flex-row gap-6">
                        {loading && <p className="text-center text-gray-500">Loading...</p>}
                        {error && <p className="text-center text-red-500">{error}</p>}
                        {!loading && !error && product && (
                            <>
                                <img src={product.image} alt={product.title} className="w-full sm:w-1/3 h-64 object-contain" />
                                <div className="flex-1">
                                    <h2 className="text-2xl font-bold mb-3">{product.title}</h2>
                                    <p className="text-gray-600 mb-4">{product.description}</p>
                                    <p className="text-blue-600 font-bold text-lg">${product.price}</p>
                                    <div className="mt-4 flex gap-2">
                                        <button onClick={handleAddToCart} disabled={disabled} className={`px-4 py-2 rounded-lg text-white font-semibold transitio ${
                                                disabled
                                                ? "bg-gray-400 cursor-not-allowed"
                                                : "bg-blue-600 hover:bg-blue-700"
                                            }`}>
                                            {disabled ? "Added!" : "Add to Cart"}
                                        </button>
                                        <button onClick={handleBack} className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600">← Back</button>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                    {notification && (
                        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                                        bg-green-600 text-white text-sm px-6 py-3 rounded-lg 
                                        shadow-lg z-[9999] animate-fade-in">
                            Product added to cart
                        </div>
                    )}
                </div>
            </SideBar>
        </>
    );
}

export default SingleProduct;
