import React, { useEffect, useState } from 'react';
import './CartList.css';
import { getCart } from "../../utils/getCart";
import { orderCart } from "../../utils/orderCart";
import { useNavigate } from "react-router-dom";
import { getProduct } from "../../utils/getProduct";
import { getImage } from "../../utils/getImage";
import CartItem from "../CartItem/CartItem";

const CartList = () => {
    const navigate = useNavigate();

    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [ordering, setOrdering] = useState(false); // NEW

    const fetchCart = async () => {
        setLoading(true);
        const data = await getCart();
        setCartItems(data);
        setLoading(false);
    };

    useEffect(() => {
        const fetchCartWithProducts = async () => {
            try {
                const cartData = await getCart();
                const enrichedItems = await Promise.all(
                    cartData.map(async (item) => {
                        const product = await getProduct(item["product_id"]);
                        return {
                            ...product,
                            product_id: item["product_id"],
                            quantity: item["quantity"],
                        };
                    })
                );
                setCartItems(enrichedItems);
            } catch (err) {
                console.error('Error loading cart:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchCartWithProducts().then();
    }, []);

    const handleDelete = (deletedId) => {
        setCartItems(prevItems =>
            prevItems.filter(item => item["product_id"] !== deletedId)
        );
    };

    const handleOrder = async () => {
        setOrdering(true);
        try {
            const result = await orderCart();
            if (result) {
                alert('Order placed!');
                navigate('/');
            }
        } catch (err) {
            console.error('Order failed:', err);
            alert('Failed to place order. Try again later.');
        } finally {
            setOrdering(false);
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
                        <li key={item["product_id"]} className="cart-list">
                            <CartItem
                                id={item["product_id"]}
                                image={getImage(item["image_path"])}
                                name={item["product_name"]}
                                price={item["price"]}
                                description={item["description"]}
                                quantity={item["quantity"]}
                                onDelete={handleDelete}
                            />
                        </li>
                    ))}
                </ul>
            )}

            <button
                onClick={handleOrder}
                disabled={cartItems.length === 0 || ordering}
            >
                <h3>{ordering ? 'Placing Order...' : 'Place Order'}</h3>
            </button>
        </div>
    );
};

export default CartList;
