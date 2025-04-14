import React from 'react';
import "../style/feature.css"
import fast from "../asserts/img/fastDelivery.png"
import no1 from "../asserts/img/no1.png"
import pngegg from "../asserts/img/pngegg.png";
import qualityProduct from "../asserts/img/qualityProduct.png";

const Features = () => {
    return (
       <div className='featureBox'>
        <img src={fast}></img>
        <img src={pngegg}></img>
        <img src={qualityProduct}></img>
        <img src={no1} className='img4'></img>
       </div>
    );
}

export default Features;
