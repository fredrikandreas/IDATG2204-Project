import React, { useState, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";
import './ItemList.css';
import ProductItem from "../ProductItem/ProductItem";
import {getAllProducts} from "../../utils/getAllProducts";

export default function ItemList() {
    const containerRef = useRef(null);
    const itemWidth = 200;
    const [columns, setColumns] = useState(1);

    useEffect(() => {
        const updateColumns = () => {
            if (!containerRef.current) return;
            const width = containerRef.current.offsetWidth;
            const cols = Math.max(1, Math.floor(width / itemWidth));
            setColumns(cols);
        };
        updateColumns();
        window.addEventListener('resize', updateColumns);
        return () => window.removeEventListener('resize', updateColumns);
    }, []);

    const [productList, setProductList] = useState([]);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const products = await getAllProducts();
                setProductList(products);
            } catch (err) {
                console.error(err);
            }
        }
        fetchProducts().then();
    }, []);

    return (
        <div className="cont">
            <div className="item-list-container" ref={containerRef}>
                {productList.map((item) => (
                    <Link className="item-wrapper" to={`/product/${item['product_id']}`} key={item['product_id']}>
                        <ProductItem
                            image={`${process.env.REACT_APP_BACKEND}${item['image_url']}`}
                            name={item['name']}
                            price={item['price']}
                            quantity={item['stock_quantity']}
                        />
                    </Link>
                ))}
            </div>
        </div>
    );
}
