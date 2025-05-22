import React, { useEffect, useState } from 'react';
import './Category.css';
import Button from '../Button/Button';
import { getCategories } from "../../utils/getCategories";
import { getBrands } from "../../utils/getBrands";

const Category = ({ onFilter }) => {
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);

    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedBrand, setSelectedBrand] = useState('');
    const [sortOrder, setSortOrder] = useState('');

    const [loading, setLoading] = useState(true);
    const [filterApplied, setFilterApplied] = useState(false);

    const fetchFilters = async () => {
        setLoading(true);
        try {
            const [cats, bran] = await Promise.all([getCategories(), getBrands()]);
            setCategories(cats);
            setBrands(bran);
        } catch (err) {
            console.error("Error fetching filters:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFilters().then();
    }, []);

    const applyFilter = async () => {
        try {
            await onFilter({
                category: selectedCategory || null,
                brand: selectedBrand || null,
                sort: sortOrder || null,
            });
            setFilterApplied(true);
        } catch (err) {
            console.error("Error applying filter:", err);
        }
    };

    const resetFilter = async () => {
        try {
            setSelectedCategory('');
            setSelectedBrand('');
            setSortOrder('');
            await onFilter({
                category: null,
                brand: null,
                sort: null,
            });
            setFilterApplied(false);
        } catch (err) {
            console.error("Error resetting filter:", err);
        }
    };

    const handleButtonClick = () => {
        if (filterApplied) {
            resetFilter().then();
        } else {
            if (selectedCategory || selectedBrand || sortOrder) {
                applyFilter().then();
            } else {
                alert("Please select at least one filter before applying");
            }
        }
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
                    disabled={loading}
                >
                    <option value="">{loading ? "Loading categories..." : "Choose a category"}</option>
                    {categories.map((item, index) => (
                        <option key={index} value={item["category_id"]}>
                            {item["category_name"]}
                        </option>
                    ))}
                </select>
            </div>

            <div className="cat brand">
                <label htmlFor="select-brand"><h3>Brand</h3></label>
                <select
                    id="select-brand"
                    value={selectedBrand}
                    onChange={(e) => setSelectedBrand(e.target.value)}
                    disabled={loading}
                >
                    <option value="">{loading ? "Loading brands..." : "Choose a brand"}</option>
                    {brands.map((item, index) => (
                        <option key={index} value={item["brand_id"]}>
                            {item["brand_name"]}
                        </option>
                    ))}
                </select>
            </div>

            <div className="cat sort">
                <label htmlFor="select-sort"><h3>Sort by price</h3></label>
                <select
                    id="select-sort"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    disabled={loading}
                >
                    <option value="">{loading ? "Loading sort order..." : "Choose a sort order"}</option>
                    <option value="asc">Low → High</option>
                    <option value="desc">High → Low</option>
                </select>
            </div>

            <div className="cat apply-filter">
                <Button
                    type={filterApplied ? "dark" : "light"}
                    text={filterApplied ? "Clear" : loading ? "Loading..." : "Apply filter"}
                    onClick={handleButtonClick}
                    mode={loading}
                />
            </div>
        </div>
    );
};

export default Category;