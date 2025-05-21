import { BACKEND_URL, PATH_ORDER_CART } from './constants';

export const getCart = async () => {
    const token = localStorage.getItem('token');

    if (!token) return [];

    const apiUrl = BACKEND_URL + PATH_ORDER_CART;

    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Server responded with status ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching cart:', error);
        return [];
    }
};
