import React, {useEffect, useState} from 'react';
import {Link, withRouter} from 'react-router-dom';
import { Button } from "react-bootstrap";
import AddCart from './addCart';



function CartPage(props) {
    console.log(props)
    if(props.history.location.query === undefined){
        return null
    }
    else{
    return(
        <div>
            <AddCart product={props.history.location.query.product} />
        </div>
    );
    }
}
export default withRouter(CartPage);