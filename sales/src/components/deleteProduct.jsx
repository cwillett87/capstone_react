import React, { useState, useEffect } from 'react';
import { Button } from "react-bootstrap";
import {withRouter, Redirect} from 'react-router-dom';

function DeleteProduct(props){
    const [redirect,setRedirect] = useState(false);

    useEffect(() => {
        
    },[props.allProducts])
    
let handleRemove = () => {
    setRedirect(true);
    props.getAllProducts()
}

    return(
        <td>
        {!redirect ? 
            <Button variant="danger" type="button" onClick={() =>
                (props.deleteProduct(props.productId),props.getAllProducts(), handleRemove(), setRedirect(true))}>Remove</Button>
                : <Redirect to='/'/>}
                </td>
    )
}

export default DeleteProduct;