import React, {useEffect, useState} from 'react';
import './Category.css';
import testData from '../Assets/test.json';
import brands from '../Assets/brands.json';
import cats from '../Assets/categories.json';
import Button from '../Button/Button';

const Category = () => {
    const prices = testData.map(item => item.price);
    const minDataPrice = Math.min(...prices);
    const maxDataPrice = Math.max(...prices);

    const [minPrice, setMinPrice] = useState(minDataPrice);
    const [maxPrice, setMaxPrice] = useState(maxDataPrice);

    useEffect(() => {
        setMinPrice(minDataPrice);
        setMaxPrice(maxDataPrice);
    }, [minDataPrice, maxDataPrice]);

    return (
        <div className='category-container'>
            <h2 className='filter'><div className='filter-icon'>≓</div>Filter</h2>
            <div className="cat type">
                <label htmlFor="select-category"><h3>Kategori</h3></label>
                <select name="type-menu" id="select-category">
                    <option key='' value='' selected>Velg en kategori</option>
                    {cats.map((item, index) => (
                        <option key={index} value={item.name}>{item.name}</option>
                    ))}
                </select>
            </div>
            <div className="cat brand">
                <label htmlFor="select-brand"><h3>Merke</h3></label>
                <select name="brand-menu" id="select-brand">
                    <option key='' value='' selected>Velg et merke</option>
                    {brands.map((item, index) => (
                        <option key={index} value={item.name}>{item.name}</option>
                    ))}
                </select>
            </div>
            <div className="cat min-price">
                <label htmlFor=""><h3>Min price: {parseInt(minPrice)}</h3></label>
                <input
                    type="range"
                    step={10}
                    min={minDataPrice}
                    max={maxDataPrice}
                    value={minPrice}
                    onChange={(e) => setMinPrice(Number(e.target.value))}
                />
            </div>
            <div className="cat max-price">
                <label htmlFor=""><h3>Max price: {parseInt(maxPrice)}</h3></label>
                <input
                    type="range"
                    step={10}
                    min={minDataPrice}
                    max={maxDataPrice}
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                />
            </div>
            <div className="cat apply-filter">
                <Button type='light' text='Apply filter →'></Button>
            </div>
        </div>
    )
}

export default Category;