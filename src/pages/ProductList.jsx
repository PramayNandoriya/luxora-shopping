import React, { useEffect, useState } from 'react';
import axios from "axios";
import "../style/productList.css";
import { Button, Popover, Typography } from '@mui/material';
import { productList } from '../api';
import Rating from '@mui/material/Rating';
import Pagination from '@mui/material/Pagination';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import CloseIcon from '@mui/icons-material/Close';

const ProductList = () => {
    const [product, setProduct] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 8;
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        axios.get(productList)
            .then((res) => setProduct(res.data))
            .catch((error) => console.error(error));
    }, []);

    const totalPages = Math.ceil(product.length / productsPerPage);
    const startIndex = (currentPage - 1) * productsPerPage;
    const selectedProducts = product.slice(startIndex, startIndex + productsPerPage);

    const handleOpenPopover = (event, product) => {
        setAnchorEl(event.currentTarget);
        setSelectedProduct(product);
    };

    const handleClosePopover = () => {
        setAnchorEl(null);
        setSelectedProduct(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <div className='productContainer'>
            <div className="clientText">
                <h1 className='FirstText'>Our</h1> <h1 className='secondText'>Products</h1>
            </div>
            <div className="productWrapper">
                {selectedProducts.map((item) => (
                    <div className="box" key={item.id} onClick={(e) => handleOpenPopover(e, item)}>
                        <div className="inner">
                            <span className="pricing">£{item.price}</span>
                            <img className='productImg' src={item.image} alt='img' />
                            <p className="title">{item.title.length > 60 ? item.title.slice(0, 25) + "..." : item.title}</p>

                            {item.rating && item.rating.rate !== undefined ? (
                                <Rating name="half-rating" value={item.rating.rate} readOnly />
                            ) : (
                                <p>No ratings available</p>
                            )}
                            <p>Feedbacks: {item.rating ? item.rating.count : 0}</p>

                            <div className="action">
                                <Button variant='outlined' style={{ display: "flex", gap: "10px" }}><LocalMallIcon />BUY NOW</Button>
                                <Button><AddShoppingCartIcon /></Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="paginationContainer">
                <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={(event, value) => setCurrentPage(value)}
                    color="primary"
                />
            </div>

            {/* Popover for selected product */}
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClosePopover}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <div className="popoverContent">
                    {selectedProduct && (
                        <>
                            <div className="top">
                                <h2 style={{width:"60%"}}>{selectedProduct.title}</h2>
                                <CloseIcon style={{fontSize:"2rem",cursor:"pointer"}} onClick={handleClosePopover} />

                            </div>

                            <div className='productDeatils'>
                                <img src={selectedProduct.image} alt={selectedProduct.title} className="popoverImage" />
                                <div className='innerInfo'>

                                    <p><span style={{fontWeight:"bold"}}>Category : </span>{selectedProduct.category}</p>
                                    <p>{selectedProduct.description}</p>
                                    <Rating name="half-rating" value={selectedProduct.rating.rate} readOnly />
                                    <p><span style={{fontWeight:"bold"}}>Feedbacks: </span> {selectedProduct.rating.count}</p>
                                    <p><span style={{fontWeight:"bold"}}>Price: £ </span>{selectedProduct.price}</p>
                            
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </Popover>
        </div>
    );
};

export default ProductList;
