import React, { useState } from 'react';
import './Category.css';
import brands from '../Assets/brands.json';
import cats from '../Assets/categories.json';
import Button from '../Button/Button';
import { getFilteredProducts } from '../../utils/getFilteredProducts';

const Category = ({ onFilter }) => {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedBrand, setSelectedBrand] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');

    const handleFilter = () => {
        onFilter({
            category: selectedCategory || null,
            brand: selectedBrand || null,
            sort: sortOrder || null
        }).then();
    };

    return (
        <div className='category-container'>
            <h2 className='filter'>
                <div className='filter-icon'>≓</div>
                Filter
            </h2>

            <div className="cat type">
                <label htmlFor="select-category"><h3>Category</h3></label>
                <select
                    id="select-category"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    <option value="">Choose a category</option>
                    {cats.map((item, index) => (
                        <option key={index} value={item.name}>{item.name}</option>
                    ))}
                </select>
            </div>

            <div className="cat brand">
                <label htmlFor="select-brand"><h3>Brand</h3></label>
                <select
                    id="select-brand"
                    value={selectedBrand}
                    onChange={(e) => setSelectedBrand(e.target.value)}
                >
                    <option value="">Choose a brand</option>
                    {brands.map((item, index) => (
                        <option key={index} value={item.name}>{item.name}</option>
                    ))}
                </select>
            </div>

            <div className="cat sort">
                <label htmlFor="select-sort"><h3>Sort by price</h3></label>
                <select
                    id="select-sort"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                >
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>
            </div>

            <div className="cat apply-filter">
                <Button type="light" text="Apply filter →" onClick={handleFilter} />
            </div>
        </div>
    );
};

export default Category;
