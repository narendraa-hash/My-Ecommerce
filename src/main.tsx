import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { CartProvider } from './pages/cart/CartContext.tsx'

createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <CartProvider>
            <App />
        </CartProvider>
    </React.StrictMode>,
);
