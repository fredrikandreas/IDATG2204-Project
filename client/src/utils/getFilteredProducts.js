export const getFilteredProducts = async ({ category, brand, sort }) => {
    const apiUrl = `${process.env.REACT_APP_BACKEND}/api/products/filter`;

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
