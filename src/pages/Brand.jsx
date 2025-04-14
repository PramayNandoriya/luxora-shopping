import React from 'react';
import "../style/brand.css"
import { motion } from "framer-motion";
import zara from "../asserts/img/zara.png"
import raymond from "../asserts/img/raymond.png"
import northface from "../asserts/img/northface.png"
import ms from "../asserts/img/ms.png"
import lacoste from "../asserts/img/lacoste.png"
import hm from "../asserts/img/hm.png"
import fils from "../asserts/img/fils.png"
import dg from "../asserts/img/dg.png"
import ck from "../asserts/img/ck.png"
import champion from "../asserts/img/champion.png"
import Burberry from "../asserts/img/Burberry.png"
import adidas from "../asserts/img/adidas.png"

const Brand = () => {
    const images = [zara, raymond, northface, ms, lacoste, hm, fils, dg, ck, champion, Burberry, adidas];
    
    return (
        <div className='brandPartners'>
            <h1 style={{ textAlign: "center",fontSize:"1.5rem" }}>Trusted <span className='productText'>By</span></h1>
            <div className="imgBoxs">
                <motion.div
                    className="imgs"
                    initial={{ x: "50%" }}
                    animate={{ x: ["50%", "-100%"] }}
                    transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                >
                    {[...images, ...images].map((img, index) => (
                        <img
                            key={index}
                            src={img}
                            alt="carousel"
                            className="eachImgs"
                        />
                    ))}
                </motion.div>
            </div>
        </div>
    );
}

export default Brand;
