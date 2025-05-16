import React, {useEffect, useState} from 'react';
import './ProductHero.css';
import {getProduct} from "../../utils/getProduct";
import ProductItem from "../ProductItem/ProductItem";
import Button from "../Button/Button";

const ProductHero = () => {
    const id = window.location.pathname.split("/")[2];

    const [product, setProduct] = useState(null);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const prod = await getProduct(id);
                console.log(prod);
                setProduct(prod);
            } catch (err) {
                console.error(err);
            }
        }
        fetchProducts().then();
    }, []);

    console.log(product);

    return (
        <div>
            {product ? (
                <div className="product-hero">
                    <ProductItem
                        dir="row"
                        image={`${process.env.REACT_APP_BACKEND}${product['image_url']}`}
                        name={product['name']}
                        price={product['price']}
                        description={product['description']}
                        quantity={product['stock_quantity']}
                    />
                    <div className="button-wrap">
                        <Button type="dark" text="Add to cart →" path="/cart" />
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default ProductHero;