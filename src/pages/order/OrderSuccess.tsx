<<<<<<< HEAD
import { useLocation, useNavigate } from "react-router-dom";
import SideBar from "../product_list/SideBar";
import { useEffect } from "react";
import jsPDF from "jspdf";

function OrderSuccess () {
    const location = useLocation();
    const navigate = useNavigate();
    const { address, total, paymentMethod } = location.state || {};

    // Redirect To Home If No Order Data(User Accessed Directly)
    useEffect(() => {
        if (!address) navigate("/home");
    }, [address, navigate]);

    const handleDownPDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(18);
        doc.text("Order Recipt", 20, 20);
        doc.setFontSize(12);
        doc.text(`Full Name: ${address.fullName}`, 20, 40);
        doc.text(`Street: ${address.street}`, 20, 50);
        doc.text(`City: ${address.city}`, 20, 60);
        doc.text(`State: ${address.state}`, 20, 70);
        doc.text(`Zip: ${address.zip}`, 20, 80);
        doc.text(`Payment Method: ${address.paymentMethod === "cod" ? "Cash On Delivery" : "card"}`, 20, 100);
        doc.text(`Total Amount: ${address.total.toFixed(2)}`, 20, 120);
        doc.text("Thank you for shopping with My Ecommerce!", 20, 140);
        doc.save(`OrderRecipt_${address.fullName}.pdf`);
    };

    return (
        <>
            <SideBar title="Order Success">
                <div className="flex flex-col items-center justify-center h[70vh] bg-white dark:bg-gray-800 rounded-lg shadow p-6 text-center">
                    <h1 className="text-2xl font-bold text-green-600 mb-2">🎉 Order Placed Successfully!</h1>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">Thank you for purchase, {address?.fullName}.</p>
                    <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded shadow w-full max-w-md text-left">
                        <h3 className="text-lg font-semibold mb-2">Order Summary</h3>
                        <p><strong>Payment:</strong> {paymentMethod === "cod" ? "Cash On Delivery" : "Card"}</p>
                        <p><strong>Total:</strong> ${total?.toFixed(2)}</p>
                        <p><strong>Ship To:</strong> {address?.street}, {address?.city}, {address?.state} - {address?.zip}</p>
                    </div>
                    <button onClick={handleDownPDF} className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">📄 Download Receipt (PDF)</button>
                    {/* {address && (
                        <div className="bg-gray-50 p-4 rounded shadow w-full max-w-md text-left">
                            <h2 className="font-semibold mb-2">Shipping To:</h2>
                            <p>{address.fullName}</p>
                            <p>{address.street}, {address.city}, {address.state}, {address.zip}</p>
                            <h2 className="font-semibold mt-4 mb-2">Order Details:</h2>
                            <p>Total: <span className="font-bold">${total.toFixed(2)}</span></p>
                            <p>Payment: {paymentMethod === "cod" ? "Cash on Delivery" : "Card Payment"}</p>
                        </div>
                    )} */}
                    <button onClick={() => navigate("/home")} className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Continue Shopping</button>
                </div>
            </SideBar>
        </>
    );
}

export default OrderSuccess;
=======
import { useLocation, useNavigate } from "react-router-dom";
import SideBar from "../product_list/SideBar";
import { useEffect } from "react";
import jsPDF from "jspdf";

function OrderSuccess () {
    const location = useLocation();
    const navigate = useNavigate();
    const { address, total, paymentMethod } = location.state || {};

    // Redirect To Home If No Order Data(User Accessed Directly)
    useEffect(() => {
        if (!address) navigate("/home");
    }, [address, navigate]);

    const handleDownPDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(18);
        doc.text("Order Recipt", 20, 20);
        doc.setFontSize(12);
        doc.text(`Full Name: ${address.fullName}`, 20, 40);
        doc.text(`Street: ${address.street}`, 20, 50);
        doc.text(`City: ${address.city}`, 20, 60);
        doc.text(`State: ${address.state}`, 20, 70);
        doc.text(`Zip: ${address.zip}`, 20, 80);
        doc.text(`Payment Method: ${address.paymentMethod === "cod" ? "Cash On Delivery" : "card"}`, 20, 100);
        doc.text(`Total Amount: ${address.total.toFixed(2)}`, 20, 120);
        doc.text("Thank you for shopping with My Ecommerce!", 20, 140);
        doc.save(`OrderRecipt_${address.fullName}.pdf`);
    };

    return (
        <>
            <SideBar title="Order Success">
                <div className="flex flex-col items-center justify-center h[70vh] bg-white dark:bg-gray-800 rounded-lg shadow p-6 text-center">
                    <h1 className="text-2xl font-bold text-green-600 mb-2">🎉 Order Placed Successfully!</h1>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">Thank you for purchase, {address?.fullName}.</p>
                    <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded shadow w-full max-w-md text-left">
                        <h3 className="text-lg font-semibold mb-2">Order Summary</h3>
                        <p><strong>Payment:</strong> {paymentMethod === "cod" ? "Cash On Delivery" : "Card"}</p>
                        <p><strong>Total:</strong> ${total?.toFixed(2)}</p>
                        <p><strong>Ship To:</strong> {address?.street}, {address?.city}, {address?.state} - {address?.zip}</p>
                    </div>
                    <button onClick={handleDownPDF} className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">📄 Download Receipt (PDF)</button>
                    {/* {address && (
                        <div className="bg-gray-50 p-4 rounded shadow w-full max-w-md text-left">
                            <h2 className="font-semibold mb-2">Shipping To:</h2>
                            <p>{address.fullName}</p>
                            <p>{address.street}, {address.city}, {address.state}, {address.zip}</p>
                            <h2 className="font-semibold mt-4 mb-2">Order Details:</h2>
                            <p>Total: <span className="font-bold">${total.toFixed(2)}</span></p>
                            <p>Payment: {paymentMethod === "cod" ? "Cash on Delivery" : "Card Payment"}</p>
                        </div>
                    )} */}
                    <button onClick={() => navigate("/home")} className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Continue Shopping</button>
                </div>
            </SideBar>
        </>
    );
}

export default OrderSuccess;
>>>>>>> 6c1a8b61e1f3198161b846041f59fea3250ea9af
