import { useEffect, useState } from "react";
import { getAllProducts, getProductsByCategory } from "../../api";
import { useParams, useNavigate } from "react-router-dom";
import SideBar from "./SideBar";
import Slider from "react-slick";

// Define an interface for a Product
interface Product {
    id: number;
    title: string;
    image: string;
    price: number;
    description?: string;
    category?: string;
    // Add any other properties from your product data here
}

function ProductsList() {
    const { category } = useParams<{ category?: string }>();
    const navigate = useNavigate();
    const [products, setProducts] = useState<Product[]>([]);  // always an array
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        setError(null);
        const fetchProducts = async () => {
            try {

                let res;
                if (category) {
                    // use category as-is — react-router decodes URL components automatically
                    res = await getProductsByCategory(category);
                } else {
                    res = await getAllProducts();
                }

                if (res.status === 200) {
                    setProducts(res.data);
                } else {
                    setError("Failed to fetch products. Please try again.");
                }

            } catch (err: any) {
                console.error("API Error:", err);
                setError("Something went wrong. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [category]);

    // Carousel settings
    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 2500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
    };

    const openProductPage = (product: Product) => {
        if (category) {
            // encode category so URL is safe (handles spaces/apostrophes)
            navigate(`/products/${encodeURIComponent(category)}/${product.id}`);
        } else {
            navigate(`/products/${product.id}`);
        }
    };

    return (
        <>

            {/* ... your component's main content ... */}
            <SideBar title={`My Ecommerce - ${category ? category : "Products"}`}>
                <div className="bg-gray-100 min-h-[60vh] p-2 rounded space-y-6">
                    {/* Carousel Section */}
                    {!loading && !error && products.length > 0 && (
                        <div className="rounded-lg overflow-hidden shadow-md">
                            <Slider {...sliderSettings}>
                                {products.slice(0, 5).map((product) => (
                                    <div key={product.id} className="relative">
                                        <img src={product.image} alt={product.title} className="w-full h-64 object-contain bg-grey-900 p-7" />
                                        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-center text-sm">
                                            {product.title}
                                        </div>
                                    </div>
                                ))}
                            </Slider>
                        </div>
                    )}

                    {/* Products Grid */}
                    {loading && <p className="text-center text-gray-500">Loading products...</p>}
                    {error && <p className="text-center text-red-500 font-medium">{error}</p>}
                    {!loading && !error && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {products.map((product) => (
                                <div key={product.id} onClick={() => openProductPage(product)} className="bg-white rounded-lg shadow-md p-4 flex flex-col cursor-pointer hover:scale-105 transition">
                                    <img src={product.image} alt={product.title} className="h-40 object-contain mx-auto" />
                                    <h2 className="text-sm font-semibold mt-3 line-clamp-2">{product.title}</h2>
                                    <p className="text-blue-600 font-bold mt-2">${product.price}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </SideBar>
        </>
    );
}

export default ProductsList;
