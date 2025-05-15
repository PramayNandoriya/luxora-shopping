import React from 'react';
import "../style/ProductDetails.css";
import { Rating } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const ProductDetailPage = ({ product, onClose, quantity, setQuantity }) => {
    if (!product) return null;
console.log(product);
    return (
        <div className='productDetailBox'>
            <div className='ProDetaiWrapper'>
                <button className="close-btn" onClick={onClose}>
                    <CloseIcon />
                </button>
                <div className='ProDetailImg'>
                    <img src={product.image} alt='product' />
                </div>
                <div className="proDetailInfo">
                    <h2 className="title">{product.title}</h2>
                    <p className="description">{product.description}</p>
                    <Rating name="half-rating" value={product.rating?.rate || "No Rating"}  readOnly />
                    <div className='proDetailPrice'>
                        <h1 className="price">£ {product.price}</h1>
                        <span className="offer">50% Off</span>
                    </div>
                    <div className="proDetailButtons">
                        <button className="qty-btn" onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                        <span className="quantity">{quantity}</span>
                        <button className="qty-btn" onClick={() => setQuantity(quantity + 1)}>+</button>
                        <button className="add-to-cart-btn">Add To Cart</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;
