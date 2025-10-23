import { useEffect, useState } from "react";
import { getAllProducts, getProductsByCategory } from "../../api";
import { useParams, useNavigate } from "react-router-dom";
import SideBar from "./SideBar";
import Slider from "react-slick";
import { useCurrency } from "../../hooks/useCurrency";
import {StarIcon} from "@heroicons/react/24/solid";
import {StarIcon as StarOutlineIcon} from "@heroicons/react/24/outline";

// Define an interface for a Product
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
    // Add any other properties from your product data here
}

function ProductsList() {
    const { category } = useParams<{ category?: string }>();
    const navigate = useNavigate();
    const [products, setProducts] = useState<Product[]>([]);  // always an array
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { format } = useCurrency();

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

            } catch (err) {
                console.error("API Error:", err);
                setError("Something went wrong. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
        fetchProducts().then(() => {});
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
        pauseOnHover: false, // Add this line to prevent pausing on hover
        fade: true,
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
            <SideBar title={`My Ecommerce - ${category ? category : "Products"}`} darkMode={false}
                     toggleDark={function (): void {
                         throw new Error("Function not implemented.");
                     }}>
                <div className="min-h-[60vh] p-2 rounded space-y-10">
                    {/* Carousel Section */}
                    {!loading && !error && products.length > 0 && (
                        <div className="rounded-lg">
                            <Slider {...sliderSettings}>
                                {products.slice(0, 5).map((product) => (
                                    <div key={product.id} className="relative">
                                        <img src={product.image} alt={product.title} className="w-full h-64 object-contain bg-blue-100 dark:bg-gray-800 rounded-lg" />
                                        <div className="w-100 absolute bottom-0 rounded-lg left-0 right-0 bg-black text-white text-center text-md font-semibold">
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
                            {products.map((product) => {
                                const rating = product.rating?.rate || 0;
                                const fullStars = Math.floor(rating);        // full stars
                                const hasHalfStar = rating % 1 >= 0.5;       // if half star
                                const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
                                return (
                                    <>
                                        <div key={product.id} onClick={() => openProductPage(product)}
                                             className="bg-blue-100 dark:bg-gray-800 rounded-lg shadow p-4 text-center flex flex-col cursor-pointer hover:scale-105 transition">
                                            <img src={product.image} alt={product.title}
                                                 className="h-40 object-contain mx-auto"/>
                                            <h2 className="text-sm font-semibold mt-3 line-clamp-2">{product.title}</h2>
                                            <p className="text-blue-600 dark:text-white font-bold mt-2">{format(product.price)} /-</p>
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
                                                <span className="ml-2 text-sm text-gray-900 dark:text-white">({rating.toFixed(1)})</span>
                                            </span>
                                        </div>
                                    </>
                                );
                            })}
                        </div>
                    )}
                </div>
            </SideBar>
        </>
    );
}

export default ProductsList;
