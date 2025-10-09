import { useEffect, useState } from "react";
import { getAllProducts } from "../../api";
import SideBar from "../product_list/SideBar";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import CountDown from "./CountDown";

interface Product {
    id: number;
    title: string;
    image: string;
    price: number;
    category: string;
    description?: string;
}

function HomePage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [inrAmount, setInrAmount] = useState("");

    // First, create a sorted copy of the products array to avoid mutating the original array
    // const sortedProducts = [...products].sort((a, b) => b.price - a.price);

    function shuffleArray(products: Product[]) {
        // Create a copy of the array to avoid modifying the original
        const newArray = [...products];
        for (let i = newArray.length - 1; i > 0; i--) {
            // Pick a random index from the remaining elements
            const j = Math.floor(Math.random() * (i + 1));
            // Swap the current element with the random element
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    }

    // Use the shuffle utility function before slicing
    const shuffledProducts = shuffleArray(products);
    const randomProducts = shuffledProducts.slice(0, 4);

    const categories = [
        {label: "👕 Men's Clothing", value: "men's clothing", bg: "bg-red-100"},
        {label: "👗 Women's Clothing", value: "women's clothing", bg: "bg-pink-100"},
        {label: "💍 Jewellery", value: "jewelery", bg: "bg-yellow-100"},
        {label: "📱 Electronics", value: "electronics", bg: "bg-green-100"}
    ];

    useEffect(() => {
        getAllProducts().then((res) => {
            // console.log("res", res);
            if (res.status == 200) {
                setProducts(res.data);
            }
            setLoading(false);
        });
    }, []);

    // Carousel Settings
    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        autoplay: true,
        autoplayspeed: 3000,
        slidestoshow: 1,
        slidestoscroll: 1,
        arrows: false,
        pauseOnHover: true, // Add this line to prevent pausing on hover
        fade: true,
    };

    const openProductPage = (product: Product) => {
        if (product.category) {
            // encode category so URL is safe (handles spaces/apostrophes)
            navigate(`/products/${encodeURIComponent(product.category)}/${product.id}`);
        } else {
            navigate(`/products/${product.id}`);
        }
    };
    
    return (
        <>
            <SideBar title="My Ecommerce - Home">
                <div className="space-y-10">

                    {/* Hero Banner */}
                    <div className="rounded-lg shadow-lg">
                        <Slider {...sliderSettings}>
                            {products.map((p) => (
                                <div key={p.id} className="relative">
                                    <img src={p.image} alt={p.title} className="w-full h-80 object-contain bg-blue-100 dark:bg-gray-800 rounded-lg" />
                                    <div className="w-100 absolute bottom-0 rounded-lg left-0 right-0 text-center text-xl font-semibold text-white bg-black">
                                        {p.title}
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    </div>
                    
                    {/* Featured Categories */}
                    <section>
                        <h2 className="text-xl font-bold mb-4">Featured Categories</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            {categories.map((c) => (
                                <div key={c.value}
                                    className={`${c.bg} p-6 rounded-lg text-center cursor-pointer hover:scale-105 transition`} onClick={() => navigate(`/products/${c.value}`)}>{c.label}
                                </div>
                            ))}
                            {/* <div className="bg-blue-100 p-6 rounded-lg text-center cursor-pinter">👕 Men's Clothing</div>
                            <div className="bg-pink-100 p-6 rounded-lg text-center cursor-pinter">👗 Women's Clothing</div>
                            <div className="bg-yellow-100 p-6 rounded-lg text-center cursor-pinter">💍 Jewellery</div>
                            <div className="bg-green-100 p-6 rounded-lg text-center cursor-pinter">📱 Electronics</div> */}
                        </div>
                    </section>

                    {/* Best Seller */}
                    <section>
                        <h2 className="text-xl font-bold mb-4">Top Picks</h2>
                        {loading ? (
                            <p className="text-gray-700 dark:text-gray-300">Loading...</p>
                        ) : (
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                {randomProducts.map((p) => (
                                    <div key={p.id} onClick={() => openProductPage(p)} className="bg-blue-100 dark:bg-gray-800 rounded-lg shadow p-4 text-center cursor-pointer hover:scale-105 transition">
                                        <img src={p.image} alt={p.title} className="h-32 object-contain mx-auto" />
                                        <h3 className="mt-2 text-sm font-medium dark:text-gray-200">{p.title}</h3>
                                        <p className="text-blue-600 font-bold">${p.price}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </section>

                    {/* Limited Offers */}
                    <section className="bg-violet-100 p-6 rounded-lg text-center">
                        <h2 className="text-xl font-bold mb-2">⚡ Limited Time Offer!</h2>
                        <p className="text-lg">Flat 30% Off on Electronics - Hurry Up!</p>
                        <p className="mt-2 text-sm text-gray-600">Offer ends in: <CountDown targetDate="2025-10-30T23:59:59" /></p>
                    </section>

                    {/* Testimonials */}
                    <section>
                        <h2 className="text-xl font-bold mb-4">What our Customers Say</h2>
                        <div className="space-y-4">
                            <blockquote className="p-4 bg-gray-50 rounded-lg shadow">
                                ⭐⭐⭐⭐⭐ “Amazing products and fast delivery!” – Narendra.
                            </blockquote>
                            <blockquote className="p-4 bg-gray-50 rounded-lg shadow">
                                ⭐⭐⭐⭐ “Good quality at reasonable prices.” – P K.
                            </blockquote>
                        </div>
                    </section>

                </div>
            </SideBar>
        </>
    );
}

export default HomePage;
