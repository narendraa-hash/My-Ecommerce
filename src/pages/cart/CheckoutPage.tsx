import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext }  from "./CartContext";
import SideBar from "../product_list/SideBar";
import { useCurrency } from "../../hooks/useCurrency";

function CheckoutPage () {

    const countries = {
        India: {
            "Andaman and Nicobar Islands": ["Port Blair"],
            "Andhra Pradesh": ["Eluru", "Guntur", "Kadapa", "Kurnool", "Nellore", "Ongole", "Srikakulam", "Tirupati", "Vijayawada", "Visakhapatnam", "West Godavari", "West Godavari"],
            "Arunachal Pradesh": ["Itanagar", "Nicobar", "Panaji", "Papum Pare"],
            "Assam": ["Dispur", "Guwahati", "Lahore", "Mandi", "Shimla"],
            "Bihar": ["Bhagalpur", "Patna", "Muzaffarpur", "Nainital", "Gaya"],
            "Chandigarh": ["Chandigarh"],
            "Chhattisgarh": ["Raipur", "Durg", "Jalandhar"],
            "Dadra and Nagar Haveli and Daman and Diu": ["Daman", "Diu"],
            "Delhi": ["Delhi", "New Delhi"],
            "Goa": ["Panaji", "Papum Pare"],
            "Gujarat": ["Ahmedabad", "Bharatpur", "Surat", "Vadodara"],
            "Haryana": ["Faridabad", "Gurgaon", "Hisar", "Rohtak"],
            "Himachal Pradesh": ["Shimla", "Solan", "Sultanpur"],
            "Jammu and Kashmir": ["Jammu", "Kashmir", "Srinagar"],
            "Jharkhand": ["Bokaro", "Giridih", "Ranchi"],
            "Karnataka": ["Bengaluru"],
            "Kerala": ["Thiruvananthapuram", "Kollam", "Pathanamthitta"],
            "Lakshadweep": ["Lakshadweep"],
            "Ladakh": ["Leh", "Kargil"],
            "Madhya Pradesh": ["Bhopal", "Indore", "Jabalpur", "Ujjain"],
            "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Solan", "Surat", "Nashik"],
            "Manipur": ["Imphal", "Thoubal"],
            "Meghalaya": ["Shillong", "Dhanbad"],
            "Mizoram": ["Aizawl", "Lunglei"],
            "Nagaland": ["Dimapur", "Kohima"],
            "Odisha": ["Bhubaneswar", "Cuttack", "Rourkela"],
            "Puducherry": ["Puducherry"],
            "Punjab": ["Amritsar", "Jalandhar", "Ludhiana", "Patiala"],
            "Rajasthan": ["Jaipur", "Jodhpur", "Kota", "Udaipur"],
            "Sikkim": ["Gangtok"],
            "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Tirunelveli", "Tiruchirappalli", "Theni"],
            "Telangana": ["Hyderabad", "Nizamabad", "Warangal"],
            "Tripura": ["Agartala"],
            "Uttar Pradesh": ["Agra", "Lucknow","Kanpur", "Ghaziabad" ,"Varanasi"],
            "Uttarakhand": ["Dehradun", "Haridwar", "Rishikesh"],
            "West Bengal": ["Kolkata", "Howrah", "Durgapur", "Asansol"]
        }
    };

    const { cart } = useContext(CartContext)!;
    const navigate = useNavigate();
    const { convert } = useCurrency();
    const [email, setEmail] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [availableCities, setAvailableCities] = useState<string[]>([]);


    const [address, setAddress] = useState({
        fullName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zip: ""
    });

    const [paymentMethod, setPaymentMethod] = useState("cod");

    const total = cart.reduce((sum, p) => sum + convert(p.price) * (p.quantity || 1), 0);

    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newEmail = e.target.value;
        setAddress({ ...address, email: newEmail})
        setEmail(newEmail);
        if (!validateEmail(newEmail)) {
            setError('Please enter a valid email address.');
        } else {
            setError('');
        }
    };

    // When state changes
    type StateType = keyof typeof countries.India; // all state names
    const handleStateChange = (state: string) => {
        setAddress({ ...address, state, city: "" }); // reset city

        setAvailableCities(countries?.India?.[state as StateType] || []);
    };

    // When city changes
    const handleCityChange = (city: string) => {
        setAddress({ ...address, city });
    };

    const limit = 6;
    const handleNumChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const zipValue = e.target.value;
        setAddress({ ...address, zip: zipValue.slice(0, limit) });
    };

    const handlePlaceOrder = async () => {
        if (!address.fullName || !address.email || !address.street || !address.city || !address.state || !address.zip) {
            alert("Please fill in all required fields");
            return;
        }

        if (validateEmail(email) == false) {
            alert("Please enter a valid email address.");
            return;
        }

        // Simulate Order + Order Placement
        navigate("/order-success", {
            state: { address, total, paymentMethod } as object,
        });
        try {
            await fetch("http://localhost:5000/send-email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    toEmail: address.email,
                    subject: "Order Placed Successfully",
                    message: `Hello ${address.fullName},\nYour order totaling ₹${total} has been placed.`,
                }),
            });
        } catch (err) {
            console.error("Failed to send email:", err);
        }
    };

    return (
        <>
            <SideBar title="Checkout">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">

                    {/* Address Form */}
                    <div className="space-y-4 bg-white p-4 rounded shadow">
                        <h2 className="text-lg font-semibold cursor-default">Shipping Address</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                            {/* Full Name */}
                            <div>
                                <label>Full Name
                                    <input aria-label={"Full Name"} type="text" className="border p-2 w-full rounded" value={address.fullName} onChange={(e) => setAddress({ ...address, fullName: e.target.value})} />
                                </label>
                            </div>

                            {/* Email Address */}
                            <div>
                                <label>Email Address
                                    <input type="email" className="border p-2 w-full rounded" value={address.email} onChange={(handleChange)} />
                                    {!address.email? "" : error && <p style={{color: 'red'}}>{error}</p>}
                                </label>
                            </div>

                            {/* Street Address */}
                            <div className="col-span-2">
                                <label>Street Address
                                    <textarea className="border p-2 w-full rounded" value={address.street} onChange={(e) => setAddress({ ...address, street: e.target.value})}></textarea>
                                </label>
                            </div>

                            <div className="flex items-center justify-between gap-4 col-span-2">

                                {/* State Dropdown */}
                                <div className="w-full md:w-1/2">
                                    <label>State</label>
                                    <select value={address.state}
                                            onChange={(e) => handleStateChange(e.target.value)} className="border p-2 w-full rounded">
                                        <option value="">Select State</option>
                                        {Object.keys(countries.India).map((state) => (
                                            <option key={state} value={state}>{state}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* City Dropdown */}
                                <div className="w-full md:w-1/2">
                                    <label>City</label>
                                    <select value={address.city}
                                            onChange={(e) => handleCityChange(e.target.value)} className="border p-2 w-full rounded">
                                        <option value="">Select City</option>
                                        {availableCities.map((city) => (
                                            <option key={city} value={city}>{city}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Zip Code */}
                                <div className="w-full md:w-1/2">
                                    <label>Zip Code
                                        <input type="number" maxLength={6} className="border p-2 w-full rounded" value={address.zip} onChange={handleNumChange} />
                                    </label>
                                </div>

                            </div>
                        </div>

                        {/* Payment */}
                        <h2 className="text-lg font-semibold cursor-default">Payment Method</h2>
                        <label className="flex items-center gap-2">
                            <input type="radio" value="cod" checked={paymentMethod == "cod"} onChange={(e) => setPaymentMethod(e.target.value)} /> Cash On Delivery
                        </label>
                        <label className="flex items-center gap-2">
                            <input type="radio" value="card" checked={paymentMethod == "card"} onChange={(e) => setPaymentMethod(e.target.value)} /> Credit/Debit Card (simulation)
                        </label>
                    </div>

                    {/* Order Summary */}
                    <div className="bg-white p-4 rounded shadow">
                        <h2 className="text-lg font-semibold mb-4 cursor-default">Order Summary</h2>
                        <ul className="space-y-2 border-t border-gray-200 cursor-default">
                            {cart.map((p) => (
                                <li key={p.id} className="py-2 flex justify-between divide-y divide-gray-200 cursor-default">
                                    <span>{p.title} (x{p.quantity})</span>
                                    <span>{(convert(p.price) * (p.quantity || 1)).toFixed(2)}</span>
                                </li>
                            ))}
                        </ul>
                        <div className="flex justify-between mt-4 font-bold divide-y cursor-default">
                            <span>Total:</span>
                            <span>₹{total.toFixed(2)}</span>
                        </div>
                        <button className="mt-6 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-900 cursor-pointer" onClick={handlePlaceOrder}>Place Order</button>
                    </div>
                </div>
            </SideBar>
        </>
    );
}

export default CheckoutPage;
