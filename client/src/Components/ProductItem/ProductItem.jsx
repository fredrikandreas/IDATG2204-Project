import React from 'react';
import './ProductItem.css';

const ProductItem = React.memo(({ dir, image, name, price, description, quantity }) => {
    return (
        <div className="product-container" style={{flexDirection: dir}}>
            <div className="product-image" style={{backgroundImage: `url(${image})`}}></div>
            <div className="product-info" style={{width: dir === 'row' ? '55%' : '100%'}}>
                <h1>{price},-</h1>
                <h2>{name}</h2>
                <h3>{description}</h3>
                <h3 className="kvant">{quantity} på lager</h3>
            </div>
        </div>
    );
});

export default ProductItem;