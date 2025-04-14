import React from 'react';
import '../style/homePage.css';
import Carousel from 'react-bootstrap/Carousel';
import { childModel, femaleModel, manModel, womenModel } from '../api';

const HomePage = () => {
    return (
        <div style={{ marginTop: "8vh" }}>
            <Carousel slide={true} fade>
                <Carousel.Item interval={1000} >
                    <img
                        className="d-block carousel-img"
                        src={manModel}
                        alt="First slide"
                    />
                    <div className="carousel-caption custom-caption right">
                        <h2 className='manmodelH2'>Step Into Style <br /> —
                            Discover Our Premium " Men's Collection "</h2>
                        <p><button className='manBtn'>Explore More..</button></p>
                    </div>
                </Carousel.Item>

                <Carousel.Item interval={1000}>
                    <div>

                    <img
                        // className="d-block carousel-img"
                        className="womenModelImg"
                        src={womenModel}
                        alt="Second slide"
                        />
                        </div>
                    <div className="carousel-caption custom-caption left">
                        <h2 className='manmodelH2'>Elegance in Every Stitch<br /> — Discover the " Woman Fashion "</h2>
                        <p><button className='womanBtn'>Explore More..</button></p>

                    </div>
                </Carousel.Item>

                <Carousel.Item interval={1000}>
                    <img
                        className="womenModelImg"
                        src={childModel} alt="Child" />

                    <div className="carousel-caption custom-caption left">
                        <h2 className='childmodelH2'>Style That Grows With Them <br /> — Shop Our " Kids' Collection "</h2>
                        <p><button className='childBtn'>Explore More..</button></p>

                    </div>
                </Carousel.Item>

                <Carousel.Item interval={1000}>
                    <img
                        className="d-block carousel-img"
                        src={femaleModel}
                        alt="Third slide"
                    />
                    <div className="carousel-caption custom-caption right">
                        <h2 className='femaleH2'>50% Off + Free Shipping on<br /> All Men’s, Women’s & Kids’ Clothing! <br /> And Extra 10% Off on Orders Over $100!</h2>
                        <p><button className='cleanBlueBtn'>Explore More..</button></p>

                    </div>
                </Carousel.Item>
            </Carousel>
        </div>
    );
};

export default HomePage;
