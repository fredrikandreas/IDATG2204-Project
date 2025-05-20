export const getCart = async () => {
    const token = localStorage.getItem('token');
    if (!token) return [];

    const res = await fetch(`${process.env.REACT_APP_BACKEND}/api/order/cart`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            'user_id': localStorage.getItem('user_id'),
        },
    });
    if (!res.ok) {
        console.error('failed to fetch cart, status', res.status);
        return [];
    }
    return res.json();
};