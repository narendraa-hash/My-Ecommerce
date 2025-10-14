import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext }  from "./CartContext";
import SideBar from "../product_list/SideBar";
import { useCurrency } from "../../hooks/useCurrency";

function CheckoutPage () {
    const { cart, clearCart } = useContext(CartContext)!;
    const navigate = useNavigate();
    const { convert } = useCurrency();

    const [address, setAddress] = useState({
        fullName: "",
        street: "",
        city: "",
        state: "",
        zip: ""
    });

    const [paymentMethod, setPaymentMethod] = useState("cod");

    const total = cart.reduce((sum, p) => sum + convert(p.price) * (p.quantity || 1), 0);

    const handlePlaceOrder = () => {
        if (!address.fullName || !address.street) {
            alert("Please fill in all required fields");
            return;
        }

        // Simulate Order + Order Placement
        clearCart();
        navigate("/order-success", {
            state: { address, total, paymentMethod } as object,
        });
    };

    return (
        <>
            <SideBar title="checkout">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">

                    {/* Address Form */}
                    <div className="space-y-4 bg-white p-4 rounded shadow">
                        <h2 className="text-lg font-semibold">Shipping Address</h2>
                        <input type="text" className="border p-2 w-full rounded" value={address.fullName} onChange={(e) => setAddress({ ...address, fullName: e.target.value})} placeholder="Full Name" />
                        <input type="text" className="border p-2 w-full rounded" value={address.street} onChange={(e) => setAddress({ ...address, street: e.target.value})} placeholder="Street Address" />
                        <input type="text" className="border p-2 w-full rounded" value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value})} placeholder="City" />
                        <div className="flex gap-2">
                            <input type="text" className="border p-2 w-full rounded" value={address.state} onChange={(e) => setAddress({ ...address, state: e.target.value })} placeholder="State" />
                            <input type="text" className="border p-2 w-full rounded" value={address.zip} onChange={(e) => setAddress({ ...address, zip: e.target.value })} placeholder="Zip" />
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
                        <button className="mt-6 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700" onClick={handlePlaceOrder}>Place Order</button>
                    </div>
                </div>
            </SideBar>
        </>
    );
}

export default CheckoutPage;
