import axios from "axios";

// Create axios instance with fake store api baseURL
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
export const getProductsByCategory = (category: string) => api.get(`/products/category/${category}`);
export const deleteProduct = (id: number) => api.delete(`/products/${id}`);
export const createProduct = (product: object) => api.post("/products", product);
export const updateProduct = (id: number, product: object) => api.put(`/products/${id}`, product);

// Auth Calls
export const loginUser = async (username: string, password: string) => {
    try {
        if (!username || !password) return null;
        const res = await authApi.get(`/users?username=${username}&password=${password}`);
        if (res.data.length > 0) {  // If any matching user is found, return the first one
            return res.data;
        } else {
            return null; // invalid credentials
        }
    } catch (err) {
        console.error("Login error:", err);
        return null;
    }
};

// Register New Users
export const registerUser = async (username: string, password: string) => {
    const res = await authApi.post("/users", { username, password });
    return res.data;
};

// Check if a user already exists
export const checkUsernameExists = async (username: string) => {
    const res = await axios.get(`http://localhost:5001/users?username=${username}`);
    return res.data.length > 0; // True if a username exists
};
