import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { getSingleProduct } from "../../api";
import SideBar from "./SideBar";
import { useCart } from "../cart/CartContext";
import { useCurrency } from "../../hooks/useCurrency";
import { StarIcon } from "@heroicons/react/24/solid";
import { StarIcon as StarOutlineIcon } from "@heroicons/react/24/outline";

interface Product {
    id: number;
    title: string;
    image: string;
    price: number;
    description?: string;
    category?: string;
    rating?: {
        rate: number;
    };
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
    const { format } = useCurrency();

    // New Local States for Button & Notification
    const [disabled, setDisabled] = useState(false);
    const [notification, setNotification] = useState(false);



    useEffect(() => {
        if (!id) return;
        setLoading(true);
        setError(null);
        getSingleProduct(Number(id)).then((res) => {
            if (res.status === 200) {
                setProduct(res.data);
            } else {
                setError("Failed to fetch products.");
            }
        })
        .catch(() => setError("Something went wrong."))
        .finally(() => setLoading(false));
    }, [id]);

    const rating = product?.rating?.rate || 0;
    const fullStars = Math.floor(rating);        // full stars
    const hasHalfStar = rating % 1 >= 0.5;       // if half star
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    const handleBack = () => {
        // Priority:
        // 1) If a category was present in URL params -> go back to that category list.
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
        // make it look nicer: capitalize the first letter
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
                <div className="bg-gray-100 min-h-[60vh] p-4 rounded">

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

                    <div className="bg-blue-100 dark:bg-gray-800 w-full rounded-lg shadow-md flex flex-col sm:flex-row gap-6">
                        {loading && <p className="text-center text-gray-500">Loading...</p>}
                        {error && <p className="text-center text-red-500">{error}</p>}
                        {!loading && !error && product && (
                            <div key={product.id}
                                 className="bg-blue-100 dark:bg-gray-800 rounded-lg shadow p-4 text-center flex flex-col cursor-default w-full">
                                <img src={product.image} alt={product.title} className="w-full sm:w-1/3 h-64 object-contain" />
                                <div className="flex-1">
                                    <h2 className="text-2xl font-bold mb-3">{product.title}</h2>
                                    <p className="text-gray-600 mb-4">{product.description}</p>
                                    <p className="text-blue-600 font-bold text-lg">{format(product.price)}</p>
                                    <span className="flex items-center justify-center w-full p-2 text-left text-gray-900 rounded-lg group cursor-default"
                                          key={product.id} id="group_categories">
                                                <div className="flex text-green-500">

                                                    {/* Full stars */}
                                                    {Array(fullStars).fill(0).map((_, i) => (
                                                        <StarIcon key={`full-${i}`} className="h-5 w-5"/>
                                                    ))}

                                                    {/* Half star: heroicons doesn’t have exact half, so use outline for half effect or custom */}
                                                    {hasHalfStar && (
                                                        <StarIcon className="h-5 w-5 text-green-300 relative"/>
                                                    )}

                                                    {/* Empty stars */}
                                                    {Array(emptyStars).fill(0).map((_, i) => (
                                                        <StarOutlineIcon key={`empty-${i}`} className="h-5 w-5"/>
                                                    ))}
                                                </div>

                                        {/* Numeric rating */}
                                        <span className="ml-2 text-sm text-gray-600">({rating.toFixed(1)})</span>
                                    </span>
                                    <div className="mt-4 flex gap-2">
                                        <button onClick={handleAddToCart} disabled={disabled} className={`px-4 py-2 rounded-lg text-white font-semibold transition ${
                                                disabled
                                                ? "bg-gray-400 cursor-not-allowed"
                                                : "bg-blue-600 hover:bg-blue-700"
                                            }`}>
                                            {disabled ? "Added!" : "Add to Cart"}
                                        </button>
                                        <button onClick={handleBack} className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600">← Back</button>
                                    </div>
                                </div>
                            </div>
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
