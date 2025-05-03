import React from 'react';
import './ProductItem.css';

const ProductItem = ({ image, name, price, quantity }) => {
    return (
        <div className="product-container">
            <div className="product-image"></div>
            <div className="product-info">
                <h2>{name}</h2>
                <h2>{price},-</h2>
                <h3>{quantity} på lager</h3>
            </div>
        </div>
    )
}

export default ProductItem;