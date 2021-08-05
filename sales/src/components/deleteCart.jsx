import React, {useEffect, useState} from 'react';
import { Button } from "react-bootstrap";
import {withRouter, Redirect} from 'react-router-dom';

function DeleteFromCart(props){
    console.log(props)   // test

    const [redirect,setRedirect] = useState(false);

    useEffect(() => {
        props.getCartsByUserId(props.user.id);
      },[]);
    
    return(
        <div>
            {!redirect ?
        <td>
            <Button variant="danger" type="button" onClick={() =>
                (props.deleteCart(props.cartid), props.getCartsByUserId(props.user.id), setRedirect(true))}>Remove</Button>
        </td>
        : <Redirect to='/'/>}
        </div>
    )
}

export default DeleteFromCart;