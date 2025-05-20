import React, { useEffect } from 'react';
import "../style/productPage.css";
import CloseIcon from '@mui/icons-material/Close';
import { useParams } from "react-router-dom";

const ProductPage = ({ handleCloseProductPage, selectedProduct }) => {
    const { id } = useParams(); // Access the 'id' from URL params (useParams hook)

    useEffect(() => {
        // Log the selected product to check if it's passed correctly
        console.log("Selected Product:", selectedProduct);
    }, [selectedProduct]);

    if (!selectedProduct) {
        return <div>Loading...</div>; // Handle the case if product data is not available yet
    }

    return (
        <div className="productPageWrapper">
            <div className='ProductPageBox'>
                <div className="closeBtn" onClick={handleCloseProductPage}>
                    <CloseIcon style={{ fontSize: "2rem", cursor: "pointer" }} />
                </div>

                <h1>{selectedProduct?.title}</h1> {/* Display product title */}
                <div className='productDetails'>
                    <img className='proDetailsImg' src={selectedProduct?.image} alt={selectedProduct?.title} />
                    <div className="productInfo">
                        <p>Product ID: {id}</p> {/* Use product ID from URL */}
                        <p>Price: £{selectedProduct?.price}</p>
                        <p>{selectedProduct?.description}</p>
                        <p>Rating: {selectedProduct?.rating?.rate}</p>
                        <p>Reviews: {selectedProduct?.rating?.count}</p>
                        <div className="buttonGroup">
                            <button>Buy Now</button>
                            <button>Add to Cart</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductPage;
