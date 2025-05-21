import { BACKEND_URL, PATH_CATEGORIES } from './constants';

export const getCategories = async () => {
    const apiUrl = BACKEND_URL + PATH_CATEGORIES;
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
        console.error('Error fetching categories:', error);
        return [];
    }
};