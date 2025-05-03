import React from 'react';
import './ItemList.css';
import testData from "../Assets/test.json";
import ProductItem from "../ProductItem/ProductItem";

const ItemList = () => {
    return (
        <div className='cont'>
            <div className='info'>ElectroMart - Products</div>
            <div className="item-list-container">
                {testData.map((item, index) => (
                    <div className="item-wrapper" key={index}>
                        <ProductItem
                            image={item.image}
                            name={item.name}
                            price={parseInt(item.price)}
                            quantity={item.quantity}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ItemList;