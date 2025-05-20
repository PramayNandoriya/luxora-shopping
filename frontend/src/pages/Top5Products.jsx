import React, { useEffect, useState } from 'react';
import "../style/top5Pro.css";
import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Link from '@mui/joy/Link';
import Typography from '@mui/joy/Typography';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { productList } from '../api';
import axios from 'axios';
import { Rating } from '@mui/material';
import ProductDetailPage from './ProductDetailPage';

const Top5Products = () => {
    const [products, setProdcts] = useState([]);
    const [openProDetails, setOpenProDetails] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    // Quantity state for product detail
    const [quantity, setQuantity] = useState(1);

    const handleProductDetails = (product) => {
        setSelectedProduct(product);
        setQuantity(1); // Reset quantity whenever new product opens
        setOpenProDetails(true);
    };

    const handleCloseDetails = () => {
        setOpenProDetails(false);
        setSelectedProduct(null);
    };

    useEffect(() => {
        axios.get(productList)
            .then((res) => setProdcts(res.data))
            .catch((error) => console.error(error));
    }, []);

    useEffect(()=>{
        document.body.style.overflow = openProDetails ? "hidden" : "auto"
    },[openProDetails])

    return (
        <div className='top5ProWrapper'>
            <div className="clientText">
                <h1 className='FirstText'>Exclusive</h1> <h1 className='secondText'>Products</h1>
            </div>

            <div className='top5ProductBox'>
                {/* Product Detail Page Modal */}
                {openProDetails && selectedProduct && (
                    <ProductDetailPage
                        product={selectedProduct}
                        onClose={handleCloseDetails}
                        quantity={quantity}
                        setQuantity={setQuantity}
                    />
                )}

                {/* Product cards */}
                {products.slice(14, 18)?.map((product) => (
                    <Card
                        key={product.id}
                        sx={{ width: 300, maxWidth: '80%', boxShadow: 'lg', cursor: 'pointer' }}
                        onClick={() => handleProductDetails(product)}
                    >
                        <CardOverflow>
                            <AspectRatio sx={{ width: 200 }}>
                                <div className='imgesOf5'>
                                    <img
                                        src={product.image}
                                        loading="lazy"
                                        alt={product.title}
                                        style={{ width: "40%", background: "none", display: "block", margin: "0 auto" }}
                                    />
                                </div>
                            </AspectRatio>
                        </CardOverflow>
                        <CardContent>
                            <Typography level="body-xs">{product.category}</Typography>
                            <Link
                                color="neutral"
                                textColor="text.primary"
                                overlay
                                endDecorator={<ArrowOutwardIcon />}
                                sx={{ fontWeight: 'md' }}
                            >
                                {product.title}
                            </Link>
                            <Typography level="title-lg" sx={{ mt: 1, fontWeight: 'xl', color: "red" }}>
                                £ {product.price}
                            </Typography>
                            {product.rating && product.rating.rate !== undefined ? (
                                <Rating name="half-rating" value={product.rating.rate} readOnly />
                            ) : (
                                <p>No ratings available</p>
                            )}
                        </CardContent>
                        <CardOverflow>
                            <Button variant="solid" color="primary" size="lg">Add to cart</Button>
                        </CardOverflow>
                    </Card>
                ))}
            </div>
        </div>
    );
}

export default Top5Products;
