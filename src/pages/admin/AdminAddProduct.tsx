import React, { useEffect, useState } from "react";
import { createProduct } from "../../api";
import { Dialog, DialogPanel } from "@headlessui/react";

type Props = {
    isNewOpen: boolean;
    onNewClose: () => void;
    onProductAdded: (product: any) => void;
};

function AdminAddProduct({ isNewOpen, onNewClose, onProductAdded }: Props) {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState<number | "">("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [image, setImage] = useState("");
    
    useEffect(() => {
        if (isNewOpen) {
            setTitle("");
            setPrice("");
            setDescription("");
            setCategory("");
            setCategory("");
        }
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!title || !price || !category) {
            alert("Please fill all required fields.");
            return;
        }
        
        const newProduct = {
            title,
            price: Number(price),
            description,
            category,
            image: image || "https://via.placeholder.com/150"
        };

        const res = await createProduct(newProduct);
        if (res.status === 200 || res.status === 201) {
            alert("Product added successfully!");
            onProductAdded(res.data);
            onNewClose();

            // Also create product in localStorage
            const addProInLocal = JSON.parse(localStorage.getItem("adminProducts") || "[]");
            addProInLocal.push(res.data);
            localStorage.setItem("adminProducts", JSON.stringify(addProInLocal));
        }
    };

    return (
        <>
            <Dialog open={isNewOpen} onClose={onNewClose} className="relative z-50">
            
                {/* Overlay */}
                <div className="fixed inset-0 bg-black/50" aria-hidden="true" />

                {/* Popup */}
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-[2px] bg-black/30">
                    <DialogPanel className="bg-white rounded-lg shadow-lg w-[80%] h-[80%] overflow-y-auto relative p-6">

                        {/* Close */}
                        <button onClick={onNewClose} className="absolute top-3 right-3 text-gray-500 hover:text-red-600">✕</button>
                        <div className="p-6">
                            <h2 className="text-xl font-bold mb-4">Add New Product</h2>
                            <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
                                <input className="w-full p-2 border rounded" value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder="Title" />
                                <input className="w-full p-2 border rounded" value={price} onChange={(e) => setPrice(Number(e.target.value))} type="number" placeholder="Price" />
                                <textarea className="w-full p-2 border rounded" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description"></textarea>
                                <input className="w-full p-2 border rounded" value={category} onChange={(e) => setCategory(e.target.value)} type="text" placeholder="Category" />
                                <input className="w-full p-2 border rounded" value={image} onChange={(e) => setImage(e.target.value)} type="text" placeholder="Image URL" />
                                <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Save Product</button>
                            </form>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>
        </>
    );
};

export default AdminAddProduct;
