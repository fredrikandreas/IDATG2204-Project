import {BACKEND_URL, PATH_ORDER_DELETE} from "./constants";

export const deleteProduct = async (product_id, quantity) => {
    const token = localStorage.getItem('token');
    const apiUrl = BACKEND_URL + PATH_ORDER_DELETE;

    const body = {
        product_id: product_id,
        quantity: quantity,
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
        console.error('Error deleting from cart:', error);
        return [];
    }
};