export const addToCart = async ({ product_id, quantity, price }) => {
    const apiUrl = `${process.env.REACT_APP_BACKEND}/api/order`;

    const body = {
        product_id: product_id || null,
        quantity: quantity || null,
        price: price || null,
    };

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            throw new Error(`Server responded with status ${response.status}`);
        }

        return response.json();
    } catch (error) {
        console.error('Error fetching cart:', error);
        return [];
    }
};