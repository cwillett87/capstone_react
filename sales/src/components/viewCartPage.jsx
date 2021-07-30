import React, {useEffect, useState} from 'react';
import {Link, withRouter} from 'react-router-dom';
import { Button } from "react-bootstrap";
import ViewCart from './viewCart';



function DisplayCartPage(props) {
    console.log(props)
    if(props.user === undefined){
        return null
    }
    else{
    return(
        <div>
            <ViewCart filteredProductIds={props.filteredProductIds} user={props.user} products={props.allProducts} userCarts={props.userCarts} deleteCart={props.deleteCart} />
        </div>
    );
    }
}
export default withRouter(DisplayCartPage);