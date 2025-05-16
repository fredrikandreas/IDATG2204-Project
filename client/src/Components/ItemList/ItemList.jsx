import React, { useState, useEffect, useRef } from 'react';
import './ItemList.css';
import testData from "../Assets/test.json";
import ProductItem from "../ProductItem/ProductItem";
import {getAllProducts} from "../../utils/getAllProducts";

export default function ItemList() {
    const containerRef = useRef(null);
    const itemWidth = 200; // Adjust to your card width + margin
    const products = getAllProducts();

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

    return (
        <div className="cont">
            <div className="info">ElectroMart - Products</div>

            <div className="item-list-container" ref={containerRef}>
                {testData.map((item, idx) => (
                    <div className="item-wrapper" key={idx}>
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
    );
}
