import { BACKEND_URL, PATH_ORDER_PAY } from './constants';

export const orderCart = async () => {
    const token = localStorage.getItem('token');

    if (!token) return [];

    const apiUrl = BACKEND_URL + PATH_ORDER_PAY;

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
        console.error('Error paying order:', error);
        return [];
    }
};