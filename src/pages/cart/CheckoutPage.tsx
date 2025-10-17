import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext }  from "./CartContext";
import SideBar from "../product_list/SideBar";
import { useCurrency } from "../../hooks/useCurrency";

function CheckoutPage () {
    const { cart } = useContext(CartContext)!;
    const navigate = useNavigate();
    const { convert } = useCurrency();
    const [email, setEmail] = useState<string>('');
    const [error, setError] = useState<string>('');

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
                    message: `Hello ${address.fullName},\nYour order totaling $${total.toFixed(2)} has been placed.`,
                }),
            });
        } catch (err) {
            console.error("Failed to send email:", err);
        }
    };

    return (
        <>
            <SideBar title="checkout">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">

                    {/* Address Form */}
                    <div className="space-y-4 bg-white p-4 rounded shadow">
                        <h2 className="text-lg font-semibold">Shipping Address</h2>
                        <div>
                            <label className="block mb-2">Full Name
                                <input aria-label={"Full Name"} type="text" className="border p-2 w-full rounded" value={address.fullName} onChange={(e) => setAddress({ ...address, fullName: e.target.value})} />
                            </label>
                        </div>
                        <div>
                            <label className="block mb-2">Email Address
                                <input type="email" className="border p-2 w-full rounded" value={address.email} onChange={(handleChange)} />
                                {!address.email? "" : error && <p style={{color: 'red'}}>{error}</p>}
                            </label>
                        </div>
                        <div>
                            <label className="block mb-2">Street Address
                                <textarea className="border p-2 w-full rounded" value={address.street} onChange={(e) => setAddress({ ...address, street: e.target.value})}></textarea>
                            </label>
                        </div>
                        <div>
                            <label className="block mb-2">City
                                <input type="text" className="border p-2 w-full rounded" value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value})} />
                            </label>
                        </div>
                        <div className="flex gap-2">
                            <div>
                                <label className="block mb-2">State
                                    <input type="text" className="border p-2 w-full rounded" value={address.state} onChange={(e) => setAddress({ ...address, state: e.target.value })} />
                                </label>
                            </div>
                            <div>
                                <label className="block mb-2">Zip Code
                                    <input type="number" maxLength={6} className="border p-2 w-full rounded" value={address.zip} onChange={handleNumChange} />
                                </label>
                            </div>
                        </div>

                        {/* Payment */}
                        <h2 className="text-lg font-semibold mt-4">Payment Method</h2>
                        <label className="flex items-center gap-2">
                            <input type="radio" value="cod" checked={paymentMethod == "cod"} onChange={(e) => setPaymentMethod(e.target.value)} /> Cash On Delivery
                        </label>
                        <label className="flex items-center gap-2">
                            <input type="radio" value="card" checked={paymentMethod == "card"} onChange={(e) => setPaymentMethod(e.target.value)} /> Credit/Debit Card (simulation)
                        </label>
                    </div>

                    {/* Order Summary */}
                    <div className="bg-white p-4 rounded shadow">
                        <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                        <ul className="divide-y">
                            {cart.map((p) => (
                                <li key={p.id} className="py-2 flex justify-between">
                                    <span>{p.title} (x{p.quantity})</span>
                                    <span>{(convert(p.price) * (p.quantity || 1)).toFixed(2)}</span>
                                </li>
                            ))}
                        </ul>
                        <div className="flex justify-between mt-4 font-bold">
                            <span>Total:</span>
                            <span>{total.toFixed(2)}</span>
                        </div>
                        <button className="mt-6 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-900 cursor-pointer" onClick={handlePlaceOrder}>Place Order</button>
                    </div>
                </div>
            </SideBar>
        </>
    );
}

export default CheckoutPage;
