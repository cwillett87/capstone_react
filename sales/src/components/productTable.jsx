import React, {useEffect, useState} from "react";
import Table from "react-bootstrap/Table";
import {withRouter, Switch, Link, Redirect} from 'react-router-dom';
import PostProduct from "./postProduct";
import DeleteProduct from "./deleteProduct";
import { Button } from "react-bootstrap";
import ViewCart from "./viewCart";
import AddColor from "./addColor";
import AddSize from "./addSize";

function ProductTable(props) {
        console.log(props);

        const [postVisible, setPostVisible] = useState(false);
        const [cartVisible, setCartVisible] = useState(false);
        const [colorVisible, setColorVisible] = useState(false);
        const [sizeVisible, setSizeVisible] = useState(false);

        let showPostForm = () =>{
            setPostVisible(!postVisible);
        }

        let showSizeForm = () =>{
            setSizeVisible(!sizeVisible);
        }

        let showColorForm = () =>{
            setColorVisible(!colorVisible);
        }

        let showCart = () =>{
            setCartVisible(!cartVisible);
            props.getCartsByUserId(props.user.id);
        }
        
        let products = props.allProducts.map((product) => {
            console.log(product)
            if(product.quantity === 0){
                return <tr key={product.id}>
                <img src={product.main_image}  width="150" height="100"/>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <Button><Link onClick={()=>{
                    props.getProductReviews(product.id)
                }} to={{pathname: '/product', query:{product:product}}}>Details</Link></Button>
                <Button active variant="danger">(Out of Stock)</Button>
                <DeleteProduct deleteProduct={props.deleteProduct} productId={product.id} />
            </tr>
          
            }else{
            return <tr key={product.id}>
                <img src={product.main_image}  width="150" height="100"/>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <Button><Link onClick={()=>{
                    props.getProductReviews(product.id)
                }} to={{pathname: '/product', query:{product:product}}}>Details</Link></Button>
                <Button><Link to={{pathname: '/cart', query:{product:product}}}>Add</Link></Button>
                <DeleteProduct deleteProduct={props.deleteProduct} productId={product.id} />
            </tr>
        }
    })
        return (
            <div>
                <div>
                <Button onClick={()=>{
                showCart();
            }}>View Cart</Button><br/><br/><br/>
            {cartVisible? (
                    <ViewCart user={props.user} products={props.allProducts} userCarts={props.userCarts} deleteCart={props.deleteCart} />
                    ):null}
                </div>
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
                <Button onClick={()=>{
                showSizeForm();
            }}>Add Size</Button><br/><br/><br/>
            {sizeVisible? (
                    <AddSize allSizes={props.allSizes} createSize={props.createSize} />
                    ):null}
                    <Button onClick={()=>{
                showColorForm();
            }}>Add Color</Button><br/><br/><br/>
            {colorVisible? (
                    <AddColor createColor={props.createColor} allColors={props.allColors} />
                    ):null}
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