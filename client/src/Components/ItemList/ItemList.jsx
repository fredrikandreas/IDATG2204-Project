import React, { useState, useEffect, useRef } from 'react';
import './ItemList.css';
import ProductItem from "../ProductItem/ProductItem";

export default function ItemList() {
    const containerRef = useRef(null);
    const itemWidth = 200; // Adjust to your card width + margin
    const [columns, setColumns] = useState(1);
    // Calculate columns on resize
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
        fetch(process.env.REACT_APP_BACKEND + '/products')
            .then(res => res.json())
            .then(data => setProductList(data));
    }, []);

    return (
        <div className="cont">
            <div className="info">ElectroMart - Products</div>

            <div className="item-list-container" ref={containerRef}>
                {productList.map((item, idx) => (
                    <div className="item-wrapper" key={idx}>
                        <ProductItem
                            image={item['image']}
                            name={item['name']}
                            price={item['price']}
                            quantity={item['stock_quantity']}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
