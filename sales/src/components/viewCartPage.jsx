import React, {useEffect, useState} from 'react';
import {Link, withRouter} from 'react-router-dom';
import { Button } from "react-bootstrap";
import ViewCart from './viewCart';



function DisplayCartPage(props) {
    console.log(props.key)
    if(props.user === undefined){
        return null
    }
    else{
    return(
        <div>
            <ViewCart setNewOrder={props.setNewOrder} user={props.user} getCartsByUserId={props.getCartsByUserId}  newKey={props.newKey} cartIds={props.cartIds} productSales={props.productSales} getSales={props.getSales} createOrder={props.createOrder}  orderTotal={props.orderTotal} filteredProductIds={props.filteredProductIds} user={props.user} products={props.allProducts} userCarts={props.userCarts} deleteCart={props.deleteCart} />
        </div>
    );
    }
}
export default withRouter(DisplayCartPage);