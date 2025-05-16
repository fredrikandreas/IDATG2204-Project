import React, {useEffect, useState} from 'react';
import ProductItem from "../Components/ProductItem/ProductItem";
import Button from "../Components/Button/Button";
import {getProduct} from "../utils/getProduct";
import {getAllProducts} from "../utils/getAllProducts";

const ProductPage = () => {
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
            <h1>Product Page</h1>
            <ProductItem
                image={`${process.env.REACT_APP_BACKEND}${product['image_url']}`}
                name={product['name']}
                price={product['price']}
                quantity={product['stock_quantity']}
            />
            <Button type="dark" text="Add to cart" path={"/cart"}></Button>
        </div>
    )
}

export default ProductPage;