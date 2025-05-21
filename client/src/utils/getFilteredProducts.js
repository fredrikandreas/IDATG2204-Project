import { BACKEND_URL, PATH_PRODUCTS_FILTER } from './constants';

export const getFilteredProducts = async ({ brand, category, sort }) => {
    const apiUrl = BACKEND_URL + PATH_PRODUCTS_FILTER;

    const body = {
        brand: brand || null,
        category: category || null,
        sort: sort || null,
    };

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            throw new Error(`Server responded with status ${response.status}`);
        }

        return response.json();
    } catch (error) {
        console.error('Error fetching filtered products:', error);
        return [];
    }
};
