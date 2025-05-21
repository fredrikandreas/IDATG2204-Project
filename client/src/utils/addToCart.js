import {BACKEND_URL, PATH_ORDER} from "./constants";

export const addToCart = async ({ product_id, quantity, price }) => {
    const token = localStorage.getItem('token');
    const apiUrl = BACKEND_URL + PATH_ORDER;

    const body = {
        product_id: product_id || null,
        quantity: quantity || null,
        price: price || null,
    };

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            throw new Error(`Server responded with status ${response.status}`);
        }

        return response.json();
    } catch (error) {
        console.error('Error adding to cart:', error);
        return [];
    }
};