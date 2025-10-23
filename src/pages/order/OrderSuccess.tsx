import { useLocation, useNavigate } from "react-router-dom";
import SideBar from "../product_list/SideBar";
import {useContext, useEffect, useState} from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { CartContext } from "../cart/CartContext.tsx";
import {useCurrency} from "../../hooks/useCurrency.tsx";

function OrderSuccess () {
    const location = useLocation();
    const navigate = useNavigate();
    const { address, total, paymentMethod } = location.state || {};
    const { cart, clearCart } = useContext(CartContext)!;
    const [invoiceNumber, setInvoiceNumber] = useState("");
    const { convert } = useCurrency();

    // Redirect To Home If No Order Data (User Accessed Directly)
    useEffect(() => {
        if (!address) navigate("/home");
        const existingInvoice = sessionStorage.getItem("invoiceNumber");
        if (existingInvoice) {
            setInvoiceNumber(existingInvoice);
        } else {
            const newInvoice = generateInvoiceNumber();
            setInvoiceNumber(newInvoice);
            sessionStorage.setItem("invoiceNumber", newInvoice);
        }
    }, [address, navigate]);

    // 🧮 Generate a unique invoice number
    const generateInvoiceNumber = () => {
        const now = new Date();
        const datePart = now.toISOString().slice(0, 10).replace(/-/g, ""); // e.g. 20251016
        const randomPart = Math.floor(1000 + Math.random() * 9000); // random 4-digit number
        return `INV-${datePart}-${randomPart}`;
    };

    const handleDownPDF = () => {
        if (!address) return;

        const doc = new jsPDF();
        const margin = 20;

        // Ecommerce header
        doc.setFontSize(16);
        doc.text("My Ecommerce", margin, 20, { align: "left" });

        // Invoice header
        doc.setFontSize(23);
        doc.text("INVOICE", margin + 170, 30, { align: "right" });

        // Invoice details and date
        doc.setFontSize(10);
        doc.text(`Invoice No: ${invoiceNumber}`, margin, 30);
        doc.text("Date: " + new Date().toLocaleDateString(), margin, 35);

        // Line break
        doc.line(margin, 40, 200 - margin, 40);

        // Bill From
        doc.setFontSize(15);
        doc.text("Bill From:", margin, 50, { align: "left" }, { fontStyle: "bold" });

        // Shipping Info
        doc.setFontSize(11);
        doc.text("Best Seller", margin, 58);
        doc.text("bestseller@gmail.com", margin, 66);
        doc.text("Best Seller Street", margin, 74);
        doc.text("Best State", margin, 82);
        doc.text("Best Seller City", margin, 90);
        doc.text("666666", margin, 98);

        // Bill To
        doc.setFontSize(15);
        doc.text("Bill To:", margin + 130, 50, { align: "left" }, { fontStyle: "bold" });

        // Shipping Info
        doc.setFontSize(11);
        doc.text(`${address.fullName}`, margin + 130, 58);
        doc.text(`${address.email}`, margin + 130, 66);
        doc.text(`${address.street}`, margin + 130, 74);
        doc.text(`${address.state}`, margin + 130, 82);
        doc.text(`${address.city}`, margin + 130, 90);
        doc.text(`${address.zip}`, margin + 130, 98);

        // Line break
        doc.line(margin, 110, 200 - margin, 110);

        // Footer
        doc.setFontSize(12);

        // Order Items Table
        autoTable(doc, {
            startY: 120,
            head: [["Product", "Price", "Qty", "Subtotal"]],
            body: cart.map((item) => [
                String(item.title ?? ""),
                `${convert(item.price ?? 0).toFixed(2)}`,
                String(item.quantity ?? 0),
                `${(convert(item.price) * (item.quantity || 1)).toFixed(2)}`
            ], { autoSize: true, overflow: "linebreak", fontSize: 10 } ),
            foot: [["Grand Total", "", "", `${total.toFixed(2)}`]],
            theme: "grid",
            headStyles: { fillColor: [200, 80, 150], textColor: 50 },
            margin: { left: margin, right: margin },
        });

        // Thank you message
        const finalY = 80 + 20 * (cart.length + 1);
        doc.text("Thank you for shopping with My Ecommerce!", margin + 90, finalY + 40, { align: "center" });

        // Save PDF
        doc.save(`OrderReceipt_${invoiceNumber || "Customer"}.pdf`);
    };

    const continueShopping = () => {
        clearCart();
        navigate("/home");
    };

    return (
        <>
            <SideBar title="Order Success" darkMode={false} toggleDark={function (): void {
                throw new Error("Function not implemented.");
            }}>
                <div className="flex flex-col items-center justify-center h[70vh] bg-white dark:bg-gray-800 rounded-lg shadow p-6 text-center">
                    <h1 className="text-2xl font-bold text-green-600 mb-2 cursor-default">🎉 Order Placed Successfully!</h1>
                    <p className="text-gray-600 dark:text-gray-300 mb-6 cursor-default">Thank you for purchase, {address?.fullName}.</p>
                    <p className="text-gray-500 dark:text-gray-400 mb-4 cursor-default">Your Invoice No: <span className="font-semibold">{invoiceNumber}</span></p>
                    <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded shadow w-full max-w-md text-left cursor-default">
                        <h3 className="text-lg font-semibold mb-2">Order Summary</h3>
                        <p><strong>Payment:</strong> {paymentMethod === "cod" ? "Cash On Delivery" : "Card"}</p>
                        <p><strong>Total: </strong>₹{total?.toFixed(2)}</p>
                        <p><strong>Ship To:</strong> {address?.street}, {address?.state}, {address?.city},  - {address?.zip}</p>
                    </div>
                    <button onClick={handleDownPDF} className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-900 transition cursor-pointer">📄 Download Receipt (PDF)</button>
                    <button onClick={continueShopping} className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-900 transition cursor-pointer">Continue Shopping</button>
                </div>
            </SideBar>
        </>
    );
}

export default OrderSuccess;
