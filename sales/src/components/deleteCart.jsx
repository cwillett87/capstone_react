import React from 'react';
import { Button } from "react-bootstrap";

function DeleteFromCart(props){
    console.log(props)   // test
    
    return(
        <td>
            <Button variant="danger" type="button" onClick={() =>
                props.deleteCart(props.cartid)}>Remove</Button>
        </td>
    )
}

export default DeleteFromCart;