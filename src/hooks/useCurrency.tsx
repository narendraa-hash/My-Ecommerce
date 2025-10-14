export const useCurrency = () => {
    const USD_TO_INR = 83;
    
    // For displaying formatted currency like ₹999
    const format = (price: number) => `₹${(price * USD_TO_INR).toFixed(0)}`;
    
    // For internal calculations (returns number)
    const convert = (price: number) => Math.round(price * USD_TO_INR);
    return { format, convert };
};
