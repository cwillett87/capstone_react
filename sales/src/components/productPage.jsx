import React, {useEffect, useState} from 'react';
import {Link, withRouter} from 'react-router-dom';
import Table from "react-bootstrap/Table";
import Image from './image';
import UpdateProduct from './updateProduct';
import { Button } from "react-bootstrap";
import Review from './reviews'


function ProductPage(props) {
    const [formVisible, setFormVisible] = useState(false);

let showUpdateForm = () => {
    setFormVisible(!formVisible)
}

    if(props.history.location.query === undefined){
        return null
    }
    else{
        if(props.history.location.query.product.quantity === 0){
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
                                <td>${props.history.location.query.product.price}</td>
                                <td>{props.history.location.query.product.ave_rating}</td>
                                <td>Out of Stock</td>
                                </tr>
                        </tbody>
                    </Table>
                    <br/>
                    <Review user={props.user} updateProduct={props.updateProduct} reviews={props.reviews} product={props.history.location.query.product} createReview={props.createReview} />
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
        }else{
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
                        <td>${props.history.location.query.product.price}</td>
                        <td>{props.history.location.query.product.ave_rating}</td>
                        <td>{props.history.location.query.product.quantity}</td>
                        </tr>
                </tbody>
            </Table>
            <br/>
                <Review user={props.user} updateProduct={props.updateProduct} reviews={props.reviews} product={props.history.location.query.product} createReview={props.createReview} />
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
}
export default withRouter(ProductPage);