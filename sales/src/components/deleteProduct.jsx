import React, { useState } from 'react';
import { Button } from "react-bootstrap";
import {withRouter, Redirect} from 'react-router-dom';

function DeleteProduct(props){
    const [redirect,setRedirect] = useState(false);
    
let handleRemove = () => {
    setRedirect(true);
}

    return(
        <td>
        {!redirect ? 
            <Button variant="danger" type="button" onClick={() =>
                (props.deleteProduct(props.productId), handleRemove())}>Remove</Button>
                : <Redirect to='/'/>}
                </td>
    )
}

export default DeleteProduct;