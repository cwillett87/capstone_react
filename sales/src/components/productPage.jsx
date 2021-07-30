import React, {useEffect, useState} from 'react';
import {Link, withRouter} from 'react-router-dom';
import Table from "react-bootstrap/Table";
import Image from './image';
import UpdateProduct from './updateProduct';
import { Button } from "react-bootstrap";



function ProductPage(props) {
    const [formVisible, setFormVisible] = useState(false);

let showUpdateForm = () => {
    setFormVisible(!formVisible)
}

    if(props.history.location.query === undefined){
        return null
    }
    else{
    return(
        <div>
            <div>
                <Image productImages={props.productImages} getImages={props.getImages} productId={props.history.location.query.product.id} />
            </div>
          <Table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Ave Rating</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{props.history.location.query.product.name}</td>
                        <td>{props.history.location.query.product.description}</td>
                        <td>${props.history.location.query.product.price}.00</td>
                        <td>{props.history.location.query.product.ave_rating}</td>
                        <td>{props.history.location.query.product.quantity}</td>
                        </tr>
                </tbody>
            </Table>
            <br/>
            <div>
            <Button onClick={()=>{
                showUpdateForm();
            }}>Update</Button><br/><br/>
            {formVisible? (
                <UpdateProduct updateProduct={props.updateProduct} 
                product={props.history.location.query.product} user={props.user}/>
                ):null}
            </div>
        </div>
    );
    }
}
export default withRouter(ProductPage);