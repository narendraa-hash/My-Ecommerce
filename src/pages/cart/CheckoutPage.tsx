import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext }  from "./CartContext";
import SideBar from "../product_list/SideBar";
import { useCurrency } from "../../hooks/useCurrency";

interface City {
    id: number;
    city: string;
}

interface Countries {
    India: Record<string, City[]>;
}

function CheckoutPage () {

    // Data for countries and cities
    const countries: Countries = {
        India: {
            "Andaman and Nicobar Islands": [{id: 1, city: "Port Blair"}],
            "Andhra Pradesh": [
                {id: 1, city: "East Godavari"}, {id: 2, city: "Eluru"}, {id: 3, city: "Guntur"}, {id: 4, city: "Kadapa"}, {id: 5, city: "Kurnool"}, {id: 6, city: "Nellore"},
                {id: 7, city: "Ongole"}, {id: 8, city: "Srikakulam"}, {id: 9, city: "Tirupati"}, {id: 10, city: "Vijayawada"}, {id: 11, city: "Visakhapatnam"}, {id: 12, city: "West Godavari"}
            ],
            "Arunachal Pradesh": [{id: 1, city: "Itanagar"}, {id: 2, city: "Nicobar"}, {id: 3, city: "Panaji"}, {id: 4, city: "Papum Pare"}],
            "Assam": [{id: 1, city: "Dispur"}, {id: 2, city: "Guwahati"}, {id: 3, city: "Lahore"}, {id: 4, city: "Mandi"}, {id: 5, city: "Shimla"}],
            "Bihar": [{id: 1, city: "Bhagalpur"}, {id: 2, city: "Patna"}, {id: 3, city: "Muzaffarpur"}, {id: 4, city: "Nainital"}, {id: 5, city: "Gaya"}],
            "Chandigarh": [{id: 1, city: "Chandigarh"}],
            "Chhattisgarh": [{id: 1, city: "Raipur"}, {id: 2, city: "Durg"}, {id: 3, city: "Jalandhar"}],
            "Dadra and Nagar Haveli and Daman and Diu": [{id: 1, city: "Daman"}, {id: 2, city: "Diu"}],
            "Delhi": [{id: 1, city: "Delhi"}, {id: 2, city: "New Delhi"}],
            "Goa": [{id: 1, city: "Panaji"}, {id: 2, city: "Papum Pare"}],
            "Gujarat": [{id: 1, city: "Ahmedabad"}, {id: 2, city: "Bharatpur"}, {id: 3, city: "Surat"}, {id: 4, city: "Vadodara"}],
            "Haryana": [{id: 1, city: "Faridabad"}, {id: 2, city: "Gurgaon"}, {id: 3, city: "Hisar"}, {id: 4, city: "Rohtak"}],
            "Himachal Pradesh": [{id: 1, city: "Shimla"}, {id: 2, city: "Solan"}, {id: 3, city: "Sultanpur"}],
            "Jammu and Kashmir": [{id: 1, city: "Jammu"}, {id: 2, city: "Kashmir"}, {id: 3, city: "Srinagar"}],
            "Jharkhand": [{id: 1, city: "Bokaro"}, {id: 2, city: "Giridih"}, {id: 3, city: "Ranchi"}],
            "Karnataka": [{id: 1, city: "Bengaluru"}],
            "Kerala": [{id: 1, city: "Thiruvananthapuram"}, {id: 2, city: "Kollam"}, {id: 3, city: "Pathanamthitta"}],
            "Lakshadweep": [{id: 1, city: "Lakshadweep"}],
            "Ladakh": [{id: 1, city: "Leh"}, {id: 2, city: "Kargil"}],
            "Madhya Pradesh": [{id: 1, city: "Bhopal"}, {id: 2, city: "Indore"}, {id: 3, city: "Jabalpur"}, {id: 4, city: "Ujjain"}],
            "Maharashtra": [{id: 1, city: "Mumbai"}, {id: 2, city: "Pune"}, {id: 3, city: "Nagpur"}, {id: 4, city: "Solan"}, {id: 5, city: "Surat"}, {id: 6, city: "Nashik"}],
            "Manipur": [{id: 1, city: "Imphal"}, {id: 2, city: "Thoubal"}],
            "Meghalaya": [{id: 1, city: "Shillong"}, {id: 2, city: "Dhanbad"}],
            "Mizoram": [{id: 1, city: "Aizawl"}, {id: 2, city: "Lunglei"}],
            "Nagaland": [{id: 1, city: "Dimapur"}, {id: 2, city: "Kohima"}],
            "Odisha": [{id: 1, city: "Bhubaneswar"}, {id: 2, city: "Cuttack"}, {id: 3, city: "Rourkela"}],
            "Puducherry": [{id: 1, city: "Puducherry"}],
            "Punjab": [{id: 1, city: "Amritsar"}, {id: 2, city: "Jalandhar"}, {id: 3, city: "Ludhiana"}, {id: 4, city: "Patiala"}],
            "Rajasthan": [{id: 1, city: "Jaipur"}, {id: 2, city: "Jodhpur"}, {id: 3, city: "Kota"}, {id: 4, city: "Udaipur"}],
            "Sikkim": [{id: 1, city: "Gangtok"}],
            "Tamil Nadu": [{id: 1, city: "Chennai"}, {id: 2, city: "Coimbatore"}, {id: 3, city: "Madurai"}, {id: 4, city: "Tirunelveli"}, {id: 5, city: "Tiruchirappalli"}, {id: 6, city: "Theni"}],
            "Telangana": [{id: 1, city: "Hyderabad"}, {id: 2, city: "Nizamabad"}, {id: 3, city: "Warangal"}],
            "Tripura": [{id: 1, city: "Agartala"}],
            "Uttar Pradesh": [{id: 1, city: "Agra"}, {id: 2, city: "Lucknow"},{id: 3, city: "Kanpur"}, {id: 4, city: "Ghaziabad"}, {id: 5, city: "Varanasi"}],
            "Uttarakhand": [{id: 1, city: "Dehradun"}, {id: 2, city: "Haridwar"}, {id: 3, city: "Rishikesh"}],
            "West Bengal": [{id: 1, city: "Kolkata"}, {id: 2, city: "Howrah"}, {id: 3, city: "Durgapur"}, {id: 4, city: "Asansol"}]
        }
    };

    const { cart } = useContext(CartContext)!;
    const navigate = useNavigate();
    const { convert } = useCurrency();
    const [email, setEmail] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [availableCities, setAvailableCities] = useState<City[]>([]);
    const [paymentMethod, setPaymentMethod] = useState("cod");
    const [address, setAddress] = useState({
        fullName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zip: ""
    });
    const total = cart.reduce((sum, p) => sum + convert(p.price) * (p.quantity || 1), 0);

    // Validate Email
    const validateEmail = (email: string): boolean => {
        const emailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailValid.test(email);
    };

    // Email validation & Error handling
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

    // Set available cities when state changes
    type StateType = keyof typeof countries.India; // all state names
    const handleStateChange = (state: string) => {
        setAddress({ ...address, state, city: "" });
        const cities = countries.India[state as StateType] || [];
        setAvailableCities(cities);
    };

    // Dynamically update cities based on state
    const handleCityChange = (city: string) => {
        setAddress({ ...address, city });
    };

    // Limit zip code to 6 digits
    const limit = 6;
    const handleNumChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const isNumeric = /^[0-9]*$/.test(value); // Allow an empty string

        // Only update the state if the new value is numeric and within the length limit
        if (isNumeric && value.length <= limit) {
            setAddress({ ...address, zip: value });
        }
    };

    // When the user clicks the "Place Order" button.
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
            <SideBar title="Checkout" darkMode={false} toggleDark={function (): void {
                throw new Error("Function not implemented.");
            }}>
                <div className="grid grid-cols-1 md:grid-cols-2 p-4 gap-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md dark:shadow-lg text-gray-900
                    dark:text-white text-md font-medium cursor-default text-sm leading-relaxed">

                    {/* Address Form */}
                    <div className="space-y-4 bg-white p-4 rounded shadow text-gray-900 dark:text-stone-100 dark:bg-gray-600/20">
                        <h2 className="text-lg font-bold cursor-default">Shipping Address</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                            {/* Full Name */}
                            <div>
                                <label> Full Name
                                    <input value={address.fullName} onChange={(e) => setAddress({ ...address, fullName: e.target.value})} type="text" placeholder="Enter your full name"
                                           className="shadow appearance-none border border-gray-500 p-2 w-full rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline
                                           placeholder:text-gray-300 dark:text-white dark:placeholder:text-gray-500" aria-label={"Full Name"}
                                    />
                                </label>
                            </div>

                            {/* Email Address */}
                            <div>
                                <label> Email Address
                                    <input value={address.email} onChange={(handleChange)} type="email" placeholder="Enter your email address"
                                           className="shadow appearance-none border border-gray-500 p-2 w-full rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline
                                           placeholder:text-gray-300 dark:text-white dark:placeholder:text-gray-500" aria-label={"Email Address"} aria-describedby="email-error"
                                    />
                                    {!address.email? "" : error && <p style={{color: 'red'}}>{error}</p>}
                                </label>
                            </div>

                            {/* Street Address */}
                            <div className="col-span-2">
                                <label> Street Address
                                    <textarea value={address.street} onChange={(e) => setAddress({ ...address, street: e.target.value})} placeholder="Enter your street address"
                                              className="shadow appearance-none border border-gray-500 p-2 w-full rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline
                                              placeholder:text-gray-300 dark:text-white dark:placeholder:text-gray-500" aria-label={"Street Address"} aria-describedby="street-error">
                                    </textarea>
                                </label>
                            </div>

                            <div className="flex items-center justify-between gap-4 col-span-2">

                                {/* State Dropdown */}
                                <div className="w-full md:w-1/2">
                                    <label> State
                                        <select value={address.state} onChange={(e) => handleStateChange(e.target.value)}
                                            className="shadow appearance-none border border-gray-500 p-2 rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline
                                            dark:text-white dark:placeholder:text-gray-500 dark:bg-gray-800 cursor-pointer" aria-label={"State"} aria-describedby="state-error"
                                        >
                                            <option value="">Select State</option>
                                            {Object.keys(countries.India).map((state) => (
                                                <option key={state} value={state}>
                                                    {state}
                                                </option>
                                            ))}
                                        </select>
                                    </label>
                                </div>

                                {/* City Dropdown */}
                                <div className="w-full md:w-1/2">
                                    <label> City
                                        <select value={address.city} onChange={(e) => handleCityChange(e.target.value)}
                                            className="shadow appearance-none border border-gray-500 p-2 w-full rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline
                                            dark:text-gray-300 dark:placeholder:text-gray-500 dark:bg-gray-800 cursor-pointer" aria-label={"City"} aria-describedby="city-error"
                                        >
                                            <option value="">Select City</option>
                                            {availableCities.map((c) => (
                                                <option key={c.id} value={c.city}>
                                                    {c.city}
                                                </option>
                                            ))}
                                        </select>
                                    </label>
                                </div>

                                {/* Zip Code */}
                                <div className="w-full md:w-1/2">
                                    <label> Zip Code
                                        <input value={address.zip} onChange={handleNumChange} type="text"
                                               className="shadow appearance-none border border-gray-500 p-2 w-full rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline
                                               placeholder:text-gray-300 dark:text-white dark:placeholder:text-gray-500" aria-label={"Zip Code"} aria-describedby="zip-error" placeholder="Enter your zip code"
                                        />
                                    </label>
                                </div>

                            </div>
                        </div>

                        {/* Payment */}
                        <h2 className="text-lg font-bold cursor-default">Payment Method</h2>
                        <div className="flex flex-col gap-2 cursor-default text-sm font-medium text-md text-gray-900 dark:text-white dark:bg-gray-600/20 p-4 rounded shadow-md border-t
                            border-gray-200 dark:border-gray-700">
                            <div>
                                <input value="cod" onChange={(e) => setPaymentMethod(e.target.value)} type="radio"
                                       checked={paymentMethod == "cod"} className="mr-1 cursor-pointer"
                                />
                                <span className="cursor-default">Cash On Delivery</span>
                            </div>
                            <div>
                                <input value="card" onChange={(e) => setPaymentMethod(e.target.value)} type="radio"
                                       checked={paymentMethod == "card"} className="mr-1 cursor-pointer"
                                />
                                <span className="cursor-default">Credit/Debit Card (simulation)</span>
                            </div>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="bg-white p-4 rounded shadow text-gray-900 dark:text-white dark:bg-gray-600/20">
                        <h2 className="text-lg font-bold mb-4 cursor-default">Order Summary</h2>
                        <ul className="space-y-2 cursor-default text-sm font-medium text-md text-gray-900 dark:text-white dark:bg-gray-600/20 p-4 rounded shadow-md border-t
                            border-gray-200 dark:border-gray-700">
                            {cart.map((p) => (
                                <li key={p.id} className="py-2 flex justify-between divide-y divide-gray-200 cursor-default text-sm font-medium text-md">
                                    <span>{p.title} (x{p.quantity})</span>
                                    <span className="text-blue-600 dark:text-blue-400">₹{(convert(p.price) * (p.quantity || 1)).toFixed(2)}</span>
                                </li>
                            ))}
                        </ul>
                        <div className="flex justify-between mt-4 font-bold divide-y cursor-default">
                            <span>Total:</span>
                            <span className="text-blue-600 dark:text-blue-400">₹{total.toFixed(2)} /-</span>
                        </div>
                        <button className="mt-6 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-900 cursor-pointer" onClick={handlePlaceOrder}>Place Order</button>
                    </div>
                </div>
            </SideBar>
        </>
    );
}

export default CheckoutPage;
