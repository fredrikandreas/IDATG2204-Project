import React from 'react';
import { useParams } from 'react-router-dom';

const ProductPage = () => {
    const { productId } = useParams();

    return (
        <div>
            <h1>Product page</h1>
            <p>{productId}</p>
        </div>
    )
}

export default ProductPage;