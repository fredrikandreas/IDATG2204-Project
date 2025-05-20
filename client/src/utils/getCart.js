export const getCart = async () => {
    const apiUrl = `${process.env.REACT_APP_BACKEND}/api/order/cart`;
    try {
        const res = await fetch(apiUrl);
        if (!res.ok) throw new Error('Failed to fetch cart');
        return await res.json();
    } catch (err) {
        console.error(err);
        return [];
    }
};