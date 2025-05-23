import React from "react";
import "./CartItem.css";
import { deleteProduct } from "../../utils/deleteProduct";
import Button from "../Button/Button";
import {Link} from "react-router-dom";

const CartItem = React.memo(({ id, name, price, description, quantity, onDelete }) => {
    const removeProduct = () => {
        deleteProduct(id, quantity)
            .then(() => {
                console.log("Product deleted");
                if (onDelete) {
                    onDelete(id, quantity);
                }
            })
            .catch((err) => {
                console.error(err);
            });
    };

    return (
        <div className="cart-item-container">
            <div className="cart-item-info">
                <Link to={`/product/${id}`} style={{ textDecoration: 'none', color: 'inherit'}}>
                    <h2>{name}</h2>
                    <h3>{description}</h3>
                    <h3>{price},-</h3>
                </Link>
            </div>

            <div className="cart-item-handle">
                <h2>{quantity}</h2>
                <Button type="dark" text="X" onClick={removeProduct}/>
            </div>
        </div>
    );
});

export default CartItem;
