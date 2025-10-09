<<<<<<< HEAD
import axios from "axios";

// Create axios instance with fakestoreapi baseURL
const api = axios.create({
    baseURL: "https://fakestoreapi.com",
});

// Auth API (json-server)
const authApi = axios.create({
    baseURL: "http://localhost:5001"    // Your json-server
});

// Example API calls
export const getAllProducts = () => api.get("/products");
export const getSingleProduct = (id: number) => api.get(`/products/${id}`);
export const getAllCategories = () => api.get("/products/categories");
export const getProductsByCategory = (category: string) => api.get(`/products/category/${category}`);
export const deleteProduct = (id: number) => api.delete(`/products/${id}`);
export const createProduct = (product: any) => api.post("/products", product);
export const updateProduct = (id: number, product: any) => api.put(`/products/${id}`, product);
export const getProductByID = (id: number) => api.get(`/products/${id}`);

export const getAllCarts = () => api.get("/carts");

// Auth Calls
export const loginUser = async (username: string, password: string) => {
    if (username && password) {
        const res = await authApi.get(`/users?username=${username}&password=${password}`);
        return res.data; // First matching user or undefined
    }
};

// Register New Users
export const registerUser = async (username: string, password: string) => {
    const res = await authApi.post("/users", { username, password });
    return res.data;
};

// Check if user already exists
export const checkUsernameExists = async (username: string) => {
    const res = await axios.get(`http://localhost:5001/users?username=${username}`);
    return res.data.length > 0; // True if username exists
};

export default api;
=======
import axios from "axios";

// Create axios instance with fakestoreapi baseURL
const api = axios.create({
    baseURL: "https://fakestoreapi.com",
});

// Auth API (json-server)
const authApi = axios.create({
    baseURL: "http://localhost:5001"    // Your json-server
});

// Example API calls
export const getAllProducts = () => api.get("/products");
export const getSingleProduct = (id: number) => api.get(`/products/${id}`);
export const getAllCategories = () => api.get("/products/categories");
export const getProductsByCategory = (category: string) => api.get(`/products/category/${category}`);
export const deleteProduct = (id: number) => api.delete(`/products/${id}`);
export const createProduct = (product: any) => api.post("/products", product);
export const updateProduct = (id: number, product: any) => api.put(`/products/${id}`, product);
export const getProductByID = (id: number) => api.get(`/products/${id}`);

export const getAllCarts = () => api.get("/carts");

// Auth Calls
export const loginUser = async (username: string, password: string) => {
    if (username && password) {
        const res = await authApi.get(`/users?username=${username}&password=${password}`);
        return res.data; // First matching user or undefined
    }
};

// Register New Users
export const registerUser = async (username: string, password: string) => {
    const res = await authApi.post("/users", { username, password });
    return res.data;
};

// Check if user already exists
export const checkUsernameExists = async (username: string) => {
    const res = await axios.get(`http://localhost:5001/users?username=${username}`);
    return res.data.length > 0; // True if username exists
};

export default api;
>>>>>>> 6c1a8b61e1f3198161b846041f59fea3250ea9af
