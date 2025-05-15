import React, { useEffect, useState } from 'react';
import axios from "axios";
import "../style/productList.css";
import { Button, Typography, Modal, Box, Rating } from '@mui/material';
import { productList } from '../api';
import Pagination from '@mui/material/Pagination';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import CloseIcon from '@mui/icons-material/Close';

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    maxWidth: 600,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 3,
    p: 3,
    outline: 'none',
    maxHeight: '90vh',
    overflowY: 'auto',
};

const ProductList = () => {
    const [product, setProduct] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 8;
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        axios.get(productList)
            .then((res) => setProduct(res.data))
            .catch((error) => console.error(error));
    }, []);

    const totalPages = Math.ceil(product.length / productsPerPage);
    const startIndex = (currentPage - 1) * productsPerPage;
    const selectedProducts = product.slice(startIndex, startIndex + productsPerPage);

    const openModal = (product) => {
        setSelectedProduct(product);
        setQuantity(1);  // Reset quantity on open
        setModalOpen(true);
    };

    const closeModal = () => {
        setSelectedProduct(null);
        setQuantity(1);  // Reset quantity on close
        setModalOpen(false);
    };

    return (
        <div className='productContainer'>
            <div className="clientText">
                <h1 className='FirstText'>Our</h1> <h1 className='secondText'>Products</h1>
            </div>

            <div className="productWrapper">
                {selectedProducts.map((item) => (
                    <div
                        className="box"
                        key={item.id}
                        onClick={() => openModal(item)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={() => { }}
                    >
                        <div className="inner">
                            <span className="pricing">£{item.price.toFixed(2)}</span>
                            <img className='productImg' src={item.image} alt={item.title} />
                            <p className="title">{item.title.length > 60 ? item.title.slice(0, 40) + "..." : item.title}</p>

                            {item.rating && item.rating.rate !== undefined ? (
                                <Rating name="half-rating" value={item.rating.rate} precision={0.5} readOnly />
                            ) : (
                                <Typography variant="body2" color="textSecondary">No ratings available</Typography>
                            )}
                            <p className="feedbacks">Feedbacks: {item.rating ? item.rating.count : 0}</p>

                            <div className="action">
                                <Button variant='outlined' startIcon={<LocalMallIcon />} className="buyBtn">BUY NOW</Button>
                                <Button className="cartBtn" aria-label="Add to cart"><AddShoppingCartIcon /></Button>
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
                    shape="rounded"
                    size="large"
                />
            </div>

            {/* Modal for product details */}
            <Modal
                open={modalOpen}
                onClose={closeModal}
                aria-labelledby="modal-product-title"
                aria-describedby="modal-product-description"
            >
                <Box sx={modalStyle}>
                    {selectedProduct && (
                        <>
                            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                                <Typography id="modal-product-title" variant="h6" component="h2" sx={{ flexGrow: 1 }}>
                                    {selectedProduct.title}
                                </Typography>
                                <CloseIcon
                                    sx={{ cursor: 'pointer', color: '#e74c3c', fontSize: 28 }}
                                    onClick={closeModal}
                                />
                            </Box>

                            <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} gap={2}>
                                <img
                                    src={selectedProduct.image}
                                    alt={selectedProduct.title}
                                    style={{ maxWidth: 200, width: '100%', objectFit: 'contain', borderRadius: 12 }}
                                />

                                <Box flex={1} display="flex" flexDirection="column" gap={1}>
                                    <Typography variant="subtitle1"><strong>Category:</strong> {selectedProduct.category}</Typography>
                                    <Typography variant="body2" sx={{ mb: 1 }}>{selectedProduct.description}</Typography>
                                    <Rating name="half-rating" value={selectedProduct.rating.rate} precision={0.5} readOnly />
                                    <Typography variant="body2"><strong>Feedbacks:</strong> {selectedProduct.rating.count}</Typography>
                                    <Typography variant="body2" sx={{ fontWeight: 'bold', mt: 1, fontSize: '1.2rem' }}>
                                        Price: £{selectedProduct.price.toFixed(2)}
                                    </Typography>

                                    {/* Quantity selector and Buy Now button */}
                                    <Box
                                        mt={3}
                                        display="flex"
                                        alignItems="center"
                                        gap={2}
                                        flexWrap="wrap"
                                    >
                                        <Box display="flex" alignItems="center" gap={1}>
                                            <Typography variant="body1">Quantity:</Typography>
                                            <Button
                                                variant="outlined"
                                                size="small"
                                                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                                            >
                                                -
                                            </Button>
                                            <Typography
                                                variant="body1"
                                                sx={{
                                                    minWidth: 30,
                                                    textAlign: 'center',
                                                    fontWeight: 'bold',
                                                }}
                                            >
                                                {quantity}
                                            </Typography>
                                            <Button
                                                variant="outlined"
                                                size="small"
                                                onClick={() => setQuantity((q) => q + 1)}
                                            >
                                                +
                                            </Button>
                                        </Box>

                                        <Button
                                            variant="outlined"
                                            className="buyBtn"
                                            // onClick={() => alert(`Added ${quantity} of "${selectedProduct.title}" to your purchase.`)}
                                        >
                                            BUY NOW
                                        </Button>
                                    </Box>
                                </Box>
                            </Box>
                        </>
                    )}
                </Box>

            </Modal>
        </div>
    );
};

export default ProductList;
