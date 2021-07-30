import React, { useState } from 'react';
import { Button } from "react-bootstrap";
import {withRouter, Redirect} from 'react-router-dom';

function DeleteProduct(props){
    const [redirect,setRedirect] = useState(false);
    
let handleRemove = () => {
    setRedirect(true);
}

    return(
        <div>
            {!redirect ? 
        <td>
            <Button variant="danger" type="button" onClick={() =>
                (props.deleteProduct(props.productId), handleRemove())}>Remove</Button>
            </td>
            : <Redirect to='/'/>}
        </div>
    )
}

export default DeleteProduct;