import { useLocation, useNavigate } from "react-router-dom";
import SideBar from "../product_list/SideBar";
import { useContext, useEffect } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { CartContext } from "../cart/CartContext.tsx";

function OrderSuccess () {
    const location = useLocation();
    const navigate = useNavigate();
    const { address, total, paymentMethod } = location.state || {};
    const { cart, clearCart } = useContext(CartContext)!;

    // Redirect To Home If No Order Data (User Accessed Directly)
    useEffect(() => {
        if (!address) navigate("/home");
    }, [address, navigate]);

    const handleDownPDF = () => {
        if (!address) return;

        const doc = new jsPDF();
        const margin = 20;

            // Order receipt title with icon
            doc.setFontSize(18);
            doc.text("🧾 Order Receipt", margin + 50, 20, { align: "center" });

            // Date
            doc.setFontSize(11);
            doc.text("Date: " + new Date().toLocaleDateString(), 150, 25);

            // Shipping Info
            doc.setFontSize(12);
            doc.text("Shipping Info:", margin, 50);
            doc.text(`Full Name: ${address.fullName}`, margin, 58);
            doc.text(`Email: ${address.email}`, margin, 66);
            doc.text(`Street: ${address.street}`, margin, 74);
            doc.text(`City: ${address.city}`, margin, 82);
            doc.text(`State: ${address.state}`, margin, 90);
            doc.text(`Zip: ${address.zip}`, margin, 98);

            // Order Items Table
            autoTable(doc, {
                startY: 110,
                head: [["Product", "Qty", "Price", "Total"]],
                body: cart.map((item) => [
                    String(item.title ?? ""),
                    String(item.quantity ?? 0),
                    `$${(item.price ?? 0).toFixed(2)}`,
                    `$${((item.price ?? 0) * (item.quantity ?? 1)).toFixed(2)}`
                ]),
                theme: "grid",
                headStyles: { fillColor: [41, 128, 185], textColor: 255 },
                margin: { left: margin, right: margin }
            });

            // Totals & Payment
            const finalY = 120;
            doc.text(`Payment Method: ${paymentMethod === "cod" ? "Cash On Delivery" : "card"}`, margin, finalY + 10);
            doc.text(`Total Amount: ${total.toFixed(2)}`, margin, finalY + 18);

            // Footer
            doc.setFontSize(12);
            doc.text("Thank you for shopping with My Ecommerce!", margin + 90, finalY + 30, { align: "center" });

            // Save PDF
            doc.save(`OrderReceipt_${address.fullName || "Customer"}.pdf`);
    };

    const continueShopping = () => {
        clearCart();
        navigate("/home");
    };

    return (
        <>
            <SideBar title="Order Success">
                <div className="flex flex-col items-center justify-center h[70vh] bg-white dark:bg-gray-800 rounded-lg shadow p-6 text-center">
                    <h1 className="text-2xl font-bold text-green-600 mb-2 cursor-default">🎉 Order Placed Successfully!</h1>
                    <p className="text-gray-600 dark:text-gray-300 mb-6 cursor-default">Thank you for purchase, {address?.fullName}.</p>
                    <p className="text-gray-600 dark:text-gray-300 mb-6 cursor-default">Thank you for purchase, {address?.email}.</p>
                    <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded shadow w-full max-w-md text-left cursor-default">
                        <h3 className="text-lg font-semibold mb-2">Order Summary</h3>
                        <p><strong>Payment:</strong> {paymentMethod === "cod" ? "Cash On Delivery" : "Card"}</p>
                        <p><strong>Total:</strong> ${total?.toFixed(2)}</p>
                        <p><strong>Ship To:</strong> {address?.street}, {address?.city}, {address?.state} - {address?.zip}</p>
                    </div>
                    <button onClick={handleDownPDF} className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-900 transition cursor-pointer">📄 Download Receipt (PDF)</button>
                    <button onClick={continueShopping} className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-900 transition cursor-pointer">Continue Shopping</button>
                </div>
            </SideBar>
        </>
    );
}

export default OrderSuccess;
