import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import './ProductHero.css';
import { getProduct } from "../../utils/getProduct";
import { addToCart } from "../../utils/addToCart";
import ProductItem from "../ProductItem/ProductItem";
import Button from "../Button/Button";
import { isLoggedIn } from "../../utils/auth";
import {getImage} from "../../utils/getImage";

const ProductHero = () => {
    const id = window.location.pathname.split("/")[2];
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchProducts() {
            try {
                const prod = await getProduct(id);
                setProduct(prod);
            } catch (err) {
                console.error(err);
            }
        }
        fetchProducts().then();
    }, []);

    const handleDecrease = () => {
        if (quantity > 1) setQuantity(prev => prev - 1);
    };

    const handleIncrease = () => {
        if (product && quantity < product["stock_quantity"]) {
            setQuantity(prev => prev + 1);
        }
    };

    const handleAddToCart = async () => {
        if (!isLoggedIn()) {
            navigate('/login', { state: { from: `/product/${id}` } });
            return;
        }

        try {
            await addToCart({
                product_id: id,
                quantity,
                price: product["price"] * quantity,
            });
            navigate('/cart');
        } catch (err) {
            console.error("Failed to add to cart:", err);
        }
    };

    return (
        <div>
            {product ? (
                <div className="product-hero">
                    <ProductItem
                        dir="row"
                        image={getImage(product["image_path"])}
                        name={product["product_name"]}
                        price={product["price"]}
                        description={product["description"]}
                        quantity={product["stock_quantity"]}
                    >

                    </ProductItem>

                    <div className="quantity-selector">
                        <Button type="dark" text="-" onClick={handleDecrease} mode={quantity === 1}></Button>
                        <span><h3>{quantity}</h3></span>
                        <Button type="dark" text="+" onClick={handleIncrease} mode={quantity >= product["stock_quantity"]}></Button>
                    </div>

                    <div className="button-wrap">
                        <Button
                            type="dark"
                            text={product["stock_quantity"] === 0 ? 'Sold out' : `Add to cart`}
                            onClick={() => handleAddToCart()}
                            mode={product["stock_quantity"] === 0 }
                        />
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default ProductHero;
