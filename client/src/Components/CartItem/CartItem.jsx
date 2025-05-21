import React from "react";
import "./CartItem.css";

const CartItem = React.memo(({ image, name, price, quantity }) =>  {
    return (
        <div className="cart-item-container">
            <div className="cart-item-image" style={{backgroundImage: `url(${image})`}}></div>
            <div className="cart-item-info">
                <h2>{name}</h2>
                <h2>{price}</h2>
                <h3 className="kvant">{quantity} stk</h3>
            </div>
        </div>
    )
})

export default CartItem;