import React from "react";
import "./CartItem.css";
import {deleteProduct} from "../../utils/deleteProduct";

const CartItem = React.memo(({ id, name, price, description, quantity }) =>  {
    const removeProduct = () => {
        deleteProduct(id)
        .then(() => {
            console.log("Product deleted")
        })
        .catch((err) => {
            console.log(err)
        }
        )
    }

    return (
        <div className="cart-item-container">
            <div className="cart-item-info">
                <h2>{name}</h2>
                <h3>{description}</h3>
                <h3>{price},-</h3>
            </div>
            <div className="cart-item-handle">
                <h2>{quantity}</h2>
                <button
                    type="button"
                    onClick={removeProduct}
                >X</button>
            </div>
        </div>
    )
})

export default CartItem;