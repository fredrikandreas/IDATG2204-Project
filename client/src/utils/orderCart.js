export const orderCart = async () => {
    const token = localStorage.getItem('token');
    if (!token) return [];

    const res = await fetch(`${process.env.REACT_APP_BACKEND}/api/order/pay`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            'user_id': localStorage.getItem('user_id'),
        },
    });
    if (!res.ok) {
        console.error('failed to pay cart, status', res.status);
        return [];
    }
    return res.json();
};