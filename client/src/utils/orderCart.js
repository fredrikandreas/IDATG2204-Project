export const orderCart = async () => {
    const apiUrl = `${process.env.REACT_APP_BACKEND}/api/order/pay`;
    try {
        const res = await fetch(apiUrl, { method: 'POST' });
        if (!res.ok) throw new Error('Order failed');
        return await res.json();
    } catch (err) {
        console.error('Order error:', err);
        return null;
    }
};