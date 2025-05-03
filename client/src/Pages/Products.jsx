import React from 'react';
import ProductItem from '../Components/ProductItem/ProductItem';
import testData from '../Components/Assets/test.json';

const Products = () => {
    return (
        <div>
            {testData.map((item, index) => (
                <ProductItem
                    key={index}
                    image={item.image}
                    name={item.name}
                    price={parseInt(item.price)}
                    quantity={item.quantity}
                />
            ))}
        </div>
    )
}

export default Products;