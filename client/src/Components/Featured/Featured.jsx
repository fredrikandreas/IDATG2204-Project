import React from 'react';
import './Featured.css';
import Category from "../Category/Category";
import ItemList from "../ItemList/ItemList";

const Featured = () => {
    return (
        <div className="featured">
            <div className="featured-container">
                <Category />
                <ItemList></ItemList>
            </div>
        </div>
    )
}

export default Featured;