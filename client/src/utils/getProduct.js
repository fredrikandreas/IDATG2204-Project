import { BACKEND_URL, PATH_PRODUCTS } from './constants';

export const getProduct = async (id) => {
    const apiUrl = BACKEND_URL + PATH_PRODUCTS + `/${id}`;
    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Server responded with status ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching product:', error);
        return [];
    }
};