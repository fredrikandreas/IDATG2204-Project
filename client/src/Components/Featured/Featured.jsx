import React, { useState, useEffect } from 'react';
import './Featured.css';
import Category from '../Category/Category';
import ItemList from '../ItemList/ItemList';
import { getAllProducts } from '../../utils/getAllProducts';
import { getFilteredProducts } from '../../utils/getFilteredProducts';

const Featured = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchInitialProducts = async () => {
            const all = await getAllProducts();
            setProducts(all);
        };
        fetchInitialProducts().then();
    }, []);

    const handleFilter = async (filters) => {
        const filtered = await getFilteredProducts(filters);
        setProducts(filtered);
    };

    return (
        <div className="featured">
            <div className="featured-container">
                <Category onFilter={handleFilter} />
                <ItemList productList={products} />
            </div>
        </div>
    );
};

export default Featured;
