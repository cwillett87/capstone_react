import React, {useEffect, useState} from "react";
import Table from "react-bootstrap/Table";
import {withRouter, Switch, Link, Redirect} from 'react-router-dom';
import PostProduct from "./postProduct";
import DeleteProduct from "./deleteProduct";
import { Button } from "react-bootstrap";

function ProductTable(props) {
        console.log(props);

        const [postVisible, setPostVisible] = useState(false);

        let showPostForm = () =>{
            setPostVisible(!postVisible);
        }
        
        let products = props.allProducts.map((product) => {
            console.log(product)
            return <tr key={product.id}>
                <img src={product.main_image}  width="150" height="100"/>
                <td>{product.name}</td>
                <td>${product.price}.00</td>
                <Button><Link to={{pathname: '/product', query:{product:product}}}>Details</Link></Button>
                <DeleteProduct deleteProduct={props.deleteProduct} productId={product.id} />
            </tr>
        });
        return (
            <div>
                <Table>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products}
                    </tbody>
                </Table>
                <br/>
                <div>
                <Button onClick={()=>{
                showPostForm();
            }}>Add Product</Button><br/><br/><br/>
            {postVisible? (
                    <PostProduct user={props.user} createProducts={props.createProducts} />
                    ):null}
                </div>
            </div>
        )
    
}

export default withRouter (ProductTable);