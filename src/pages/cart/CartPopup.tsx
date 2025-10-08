import { Dialog, DialogPanel } from "@headlessui/react";
import { useCart } from "./CartContext";
import { useNavigate } from "react-router-dom";

type Props = {
    isOpen: boolean;
    onClose: () => void;
};

function CartPopup({ isOpen, onClose }: Props) {
    const { cart, removeFromCart } = useCart();
    const navigate = useNavigate();

    return (
        <>
            <Dialog open={isOpen} onClose={onClose} className="relative z-50">

                {/* Overlay */}
                <div className="fixed inset-0 bg-black/50" aria-hidden="true" />

                {/* Popup */}
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-[2px] bg-black/30">
                    <DialogPanel className="bg-white rounded-lg shadow-lg w-[80%] h-[80%] overflow-y-auto relative p-6">

                        {/* Close */}
                        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-red-600 cursor-pointer">✕</button>
                        <h2 className="text-2xl font-bold mb-6 text-center">🛒 Your Cart</h2>
                        {cart.length === 0 ? (
                            <p className="text-gray-500">Cart is empty.</p>
                        ) : (
                            <>
                                <ul className="space-y-2">
                                    {cart.map((item) => (
                                        <li key={item.id} className="flex items-center gap-4 bg-gray-100 p-4 rounded-xl py-2 justify-between border border-gray-300 shadow-md">
                                            <img src={item.image} alt={item.title} className="w-16 h-16 object-contain" />
                                            <div className="flex-1">
                                                <h3 className="text-sm font-medium">{item.title}</h3>
                                                <p className="text-blue-600 font-bold">${item.price} × {(item.quantity || 1)}</p>
                                            </div>
                                            <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:underline text-sm cursor-pointer">Remove</button>
                                        </li>
                                    ))}
                                </ul>
                                <div className="flex justify-between mt-4 font-bold">
                                    <span>Total:</span>
                                    <span>$
                                        {cart
                                            .reduce((sum, p) => sum + p.price * (p.quantity || 1), 0)
                                            .toFixed(2)}
                                    </span>
                                </div>
                                {/* Checkout button */}
                                <button
                                    className={`mt-6 w-full py-2 rounded 
                                        ${cart.length === 0 
                                        ? "bg-gray-400 text-gray-700 dark:text-gray-300"
                                        : "bg-green-600 text-white hover:bg-green-700 cursor-pointer"}`}
                                        onClick={() => navigate("/checkout")} disabled={cart.length === 0}>
                                        Proceed to Checkout
                                </button>
                            </>
                        )}
                    </DialogPanel>
                </div>
            </Dialog>
        </>
    );
}

export default CartPopup;
