import React from 'react';
import "../style/threeModelsAds.css"
import {threeModels} from "../api" 
import { Button } from '@mui/joy';
const ThreeModelsAd = () => {
    return (
        <div className='threeModelsWrapper'>
            <img src={threeModels} alt=''/>
            <div className='threeModelsDetails'>
                <p>New Arrived Products</p>
                <h3>Best Summer Collection</h3>
                <h5>Sales Get Up To 50% Discount...!</h5>
                <Button>Shop Now</Button>
            </div>
        </div>
    );
}

export default ThreeModelsAd;
