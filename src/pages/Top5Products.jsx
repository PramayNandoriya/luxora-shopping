import React, { useEffect, useState } from 'react';
import "../style/top5Pro.css";
import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Chip from '@mui/joy/Chip';
import Link from '@mui/joy/Link';
import Typography from '@mui/joy/Typography';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { productList } from '../api';
import axios from 'axios';
import { Rating } from '@mui/material';


const Top5Products = () => {
    const [products, setProdcts] = useState([])

    useEffect(() => {
        axios.get(productList)
            .then((res) => setProdcts(res.data))
            .catch((error) => console.error(error));
    }, []);
    return (
        <div className='top5ProWrapper'>
            <div className="clientText">
                <h1 className='FirstText'>Exclusive</h1> <h1 className='secondText'>Products</h1>
            </div>

            <div className='top5ProductBox'>
                {
                    products.slice(14, 18)?.map((products) => (
                        <Card key={products.id} sx={{ width: 300, maxWidth: '80%', boxShadow: 'lg' }}>
                            <CardOverflow>
                                <AspectRatio sx={{ Width: 200 }}>
                                    <div className='imgesOf5'>
                                        <img
                                            src={products.image}
                                            loading="lazy"
                                            alt=""
                                            style={{ height: "", width: "40%", background: "none" }}
                                        />
                                    </div>
                                </AspectRatio>
                            </CardOverflow>
                            <CardContent>
                                <Typography level="body-xs">
                                    {products.category}
                                </Typography>
                                <Link
                                    href="#product-card"
                                    color="neutral"
                                    textColor="text.primary"
                                    overlay
                                    endDecorator={<ArrowOutwardIcon />}
                                    sx={{ fontWeight: 'md' }}
                                >
                                    {products.title}
                                </Link>
                                <Typography level="title-lg" sx={{ mt: 1, fontWeight: 'xl' }}>
                                    £ {products.price}
                                </Typography>
                                {products.rating && products.rating.rate !== undefined ? (
                                    <Rating name="half-rating" value={products.rating.rate} readOnly />
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
