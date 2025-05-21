import React from 'react';
import { Link } from 'react-router-dom';
import './ItemList.css';
import ProductItem from '../ProductItem/ProductItem';
import {getImage} from "../../utils/getImage";

export default function ItemList({ productList }) {
    return (
        <div className="cont">
            <div className="item-list-container">
                {productList.length === 0 ? (
                    <p className="no-results">Loading...</p>
                ) : (
                    productList.map((item) => (
                        <Link
                            className="item-wrapper"
                            to={`/product/${item['product_id']}`}
                            key={item['product_id']}
                        >
                            <ProductItem
                                dir="column"
                                image={getImage(item["image_path"])}
                                name={item['product_name']}
                                price={item['price']}
                                description=""
                                quantity={item['stock_quantity']}
                            />
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
}
