import React, { useState, useEffect } from 'react';
import { Button } from "react-bootstrap";
import {withRouter, Redirect} from 'react-router-dom';

function DeleteProduct(props){
    const [redirect,setRedirect] = useState(false);

    useEffect(() => {
        props.getAllProducts()
    },[props.allProducts])
    
let handleRemove = () => {
    setRedirect(true);
}

    return(
        <td>
        {!redirect ? 
            <Button variant="danger" type="button" onClick={() =>
                (props.deleteProduct(props.productId), handleRemove(), setRedirect(true))}>Remove</Button>
                : <Redirect to='/'/>}
                </td>
    )
}

export default DeleteProduct;