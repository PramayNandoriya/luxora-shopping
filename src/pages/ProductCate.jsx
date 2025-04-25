import React, { useEffect, useState } from 'react';
import "../style/XenderProducts.css";
import axios from 'axios';
import { productList } from '../api';
import Rating from '@mui/material/Rating';


const ProductCate = () => {
    const [categoruProduct, setCategoruProduct] = useState("Men");
    const [proData, setProData] = useState([]);

    useEffect(() => {
        axios.get(productList)
            .then((res) => setProData(res.data))
            .catch((error) => console.log("Data not Found"));
    }, []);

    const filterProducts = proData.filter(item => categoruProduct === "Men" ? item.category.toLowerCase() === "men's clothing" : item.category.toLowerCase() === "women's clothing")
    // console.log(filterProducts);
    return (
        <div className='xenderProductWrapper'>
            <div className='categorySelector'>
                <button className={categoruProduct === "Men" ? "active" : ""} onClick={() => setCategoruProduct("Men")}>Men</button>
                <button className={categoruProduct === "WoMen" ? "active" : ""} onClick={() => setCategoruProduct("WoMen")}>Women</button>
            </div>

            <div className='productDisplay'>
                {filterProducts.map((item) =>
                    <div className='categoryproductWarpper' key={item.id}>
                        <img className='categoryImg' src={item.image} alt='' />
                        <div className='cateProInfo'>
                            <p className="title">{item.title}</p>
                            <p>£ : {item.price}</p>
                            <Rating name="half-rating" value={item.rating.rate} readOnly /> <p>FeedBack's : ({item.rating.count})</p>
                        </div>

                    </div>
                )}
            </div>
        </div>
    );
}

export default ProductCate;
