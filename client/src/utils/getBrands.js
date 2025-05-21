import { BACKEND_URL, PATH_BRANDS } from './constants';

export const getBrands = async () => {
    const apiUrl = BACKEND_URL + PATH_BRANDS;
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
        console.error('Error fetching brands:', error);
        return [];
    }
};