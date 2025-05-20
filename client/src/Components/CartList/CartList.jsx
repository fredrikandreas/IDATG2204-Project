import React, {useEffect, useState} from 'react';
import './CartList.css';
import {getCart} from "../../utils/getCart";
import {orderCart} from "../../utils/orderCart";
import { isLoggedIn } from "../../utils/auth";
import {useNavigate} from "react-router-dom";

const CartList = () => {
    const navigate = useNavigate();



    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchCart = async () => {
        setLoading(true);
        const data = await getCart();
        setCartItems(data);
        setLoading(false);
    };

    useEffect(() => {
        getCart()
            .then(data => {
                setCartItems(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error loading cart:', err);
                setLoading(false);
            });
    }, []);

    const handleOrder = async () => {
        const result = await orderCart();
        if (result) {
            alert('Order placed!');
            await fetchCart();
        }
    };

    return (
        <div className="cart-container">
            <h1>Your Cart</h1>

            {loading ? (
                <h3>Loading...</h3>
            ) : cartItems.length === 0 ? (
                <h3>No items in cart.</h3>
            ) : (
                <ul className="cart-list">
                    {cartItems.map((item) => (
                        <li key={item.id} className="cart-item">
                            <div><strong>{item.name}</strong></div>
                            <div>Qty: {item.quantity}</div>
                            <div>Price: ${item.price.toFixed(2)}</div>
                        </li>
                    ))}
                </ul>
            )}

            <button onClick={handleOrder} disabled={cartItems.length === 0}>
                Place Order
            </button>
        </div>
    )
}

export default CartList;