import React from 'react';
import "../style/promotions.css"
import { female, manAndWoman } from '../api';
import { Button } from '@mui/material';

const Promotions = () => {
    return (
        <div className='promoWrapper'>

            <div className='promoBox1'>

                <img src={female} alt='female' />


                <div className='pormoDetails'>
                    <p>Super Sale</p>
                    <h3>New Collection</h3>
                    <Button>ShopNow</Button>
                </div>
            </div>

            <div className='promoBox2'>
                <img src={manAndWoman} alt='manandwoman' />
                <div className='pormoDetails'>
                    <p>New Season</p>
                    <h3>Up To 40% Off</h3>
                    <Button>ShopNow</Button>
                </div>
            </div>

        </div>
    );
}

export default Promotions;
