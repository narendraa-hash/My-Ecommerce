import React, { useEffect, useState } from "react";
import { updateProduct } from "../../api";
import { Dialog, DialogPanel } from "@headlessui/react";

type UpdProps = {
    isOpen: boolean;
    onClose: () => void;
    product: any;
    onProductUpdated: (product: any) => void;
};

function AdminEditProduct({ isOpen, onClose, product, onProductUpdated }: UpdProps) {
    const [title, setTitle] = useState(product.title);
    const [price, setPrice] = useState(product.price);
    const [category, setCategory] = useState(product.category);
    const [description, setDescription] = useState(product.description || "");
    const [image, setImage] = useState(product.image);

    useEffect(() => {
        if (product) {
            setTitle(product.title);
            setPrice(product.price);
            setDescription(product.description || "");
            setCategory(product.category);
            setImage(product.image);
        }
    }, [product]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!title || !price || !category) {
            alert("Please fill all required fields.");
            return;
        }

        const editedProduct = { title, price, description, category, image };
        const res = await updateProduct(product.id, editedProduct);

        if (res.status === 200 || res.status === 201) {
            alert("Product updated successfully!");
            onProductUpdated({ ...product, ...editedProduct });
            onClose();

            // Also update product in localStorage
            // Get the item from localStorage. It will be a string or null.
            const storedProducts = localStorage.getItem("adminProducts");

            // Parse the string back into a JavaScript array.
            // The `|| "[]"` fallback provides a default empty array as a string, which JSON.parse can handle.
            const updProInLocal = JSON.parse(storedProducts || "[]");
            const checkUpdProId = updProInLocal.map((p: any) => p.id === product.id ? editedProduct : p);
            localStorage.setItem("adminProducts", JSON.stringify(checkUpdProId)); // Convert the updated array back to a JSON string before storing it
        }
    };

    return (
        <>
            <Dialog open={isOpen} onClose={onClose} className="relative z-50">

                {/* Overlay */}
                <div className="fixed inset-0 bg-black/50" aria-hidden="true" />

                {/* Popup */}
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-[2px] bg-black/30">
                    <DialogPanel className="bg-white rounded-lg shadow-lg w-[80%] h-[80%] overflow-y-auto relative p-6">

                        {/* Close */}
                        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-red-600">✕</button>
                        <div className="p-6">
                            <h1 className="text-xl font-bold mb-4">Edit Product</h1>
                            <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
                                <input className="w-full p-2 border rounded" value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder="Title" />
                                <input className="w-full p-2 border rounded" value={price} onChange={(e) => setPrice(Number(e.target.value))} type="number" placeholder="Price" />
                                <textarea className="w-full p-2 border rounded" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description"></textarea>
                                <input className="w-full p-2 border rounded" value={category} onChange={(e) => setCategory(e.target.value)} type="text" placeholder="Category" />
                                <input className="w-full p-2 border rounded" value={image} onChange={(e) => setImage(e.target.value)} type="text" placeholder="Image" />
                                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer">Submit</button>
                            </form>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>
        </>
    );
}

export default AdminEditProduct;
