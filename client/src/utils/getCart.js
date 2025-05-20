export const getCart = async () => {
    const token = localStorage.getItem('token');

    const apiUrl = `${process.env.REACT_APP_BACKEND}/api/order/cart`;
    try {
        const res = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!res.ok) throw new Error(`Failed with status ${res.status}`);
        return await res.json();
    } catch (err) {
        console.error('getCart error:', err);
        return [];
    }
};