import React, {useEffect, useState} from "react";
import Table from "react-bootstrap/Table";
import {withRouter, Switch, Link, Redirect} from 'react-router-dom';
import PostProduct from "./postProduct";
import DeleteProduct from "./deleteProduct";
import { Button, Container } from "react-bootstrap";
import ViewCart from "./viewCart";
import AddColor from "./addColor";
import AddSize from "./addSize";

function ProductTable(props) {
        console.log(props);

        useEffect(() => {
            props.getAllSizes()
        },[])

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

    if(props.loggedIn===false){
        let products = props.allProducts.map((product) => {
            console.log(product)
            if(product.quantity === 0){
                return <tr key={product.id}>
                <td><center><img src={product.main_image}  width="150" height="100"/></center></td>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td><center><Button active ><Link style={{textDecoration:'none', color: 'white'}} onClick={()=>{
                    props.getProductReviews(product.id)
                }} to={{pathname: '/product', query:{product:product}}}>Details</Link></Button></center></td>
                <td><center><Button active variant="danger">(Out of Stock)</Button></center></td>
            </tr>
          
            }else{
            return <tr key={product.id}>
                <td><center><img src={product.main_image}  width="150" height="100"/></center></td>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td><center><Button active ><Link style={{textDecoration:'none', color: 'white'}} onClick={()=>{
                    props.getProductReviews(product.id)
                }} to={{pathname: '/product', query:{product:product}}}>Details</Link></Button></center></td>
                <td></td>
            </tr>
        }
    })
        return (
            <div>
                <br/>
                <br/>
                <Container>
                <Table bordered variant='dark'>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Price</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {products}
                    </tbody>
                </Table>
                </Container>
                <br/>
            </div>
        )  
    }

    if(props.user.role==='customer'){
        let products = props.allProducts.map((product) => {
            console.log(product)
            if(product.quantity === 0){
                return <tr key={product.id}>
                <td><center><img src={product.main_image}  width="150" height="100"/></center></td>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td><center><Button active ><Link style={{textDecoration:'none', color: 'white'}} onClick={()=>{
                    props.getProductReviews(product.id)
                }} to={{pathname: '/product', query:{product:product}}}>Details</Link></Button></center></td>
                <td><center><Button active variant="danger">(Out of Stock)</Button></center></td>
            </tr>
          
            }else{
            return <tr key={product.id}>
                <td><center><img src={product.main_image}  width="150" height="100"/></center></td>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td><center><Button active ><Link style={{textDecoration:'none', color: 'white'}} onClick={()=>{
                    props.getProductReviews(product.id)
                }} to={{pathname: '/product', query:{product:product}}}>Details</Link></Button></center></td>
                <td><center><Button active ><Link style={{textDecoration:'none', color: 'white'}} to={{pathname: '/cart', query:{product:product}}}>Add</Link></Button></center></td>
            </tr>
        }
    })
        return (
            <div>
                <br/>
                <h2>Welcome {props.user.first_name}!</h2>
                <Container>
                <Table bordered variant='dark'>
                    <thead>
                        <tr>
                        <th></th>
                            <th>Name</th>
                            <th>Price</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {products}
                    </tbody>
                </Table>
                </Container>
                <br/>
            </div>
        )
    }
    else{
        let products = props.allProducts.map((product) => {
            console.log(product)
            if(product.quantity === 0){
                return <tr key={product.id}>
               <td><center><img src={product.main_image}  width="150" height="100"/></center></td>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td><center><Button active ><Link style={{textDecoration:'none', color: 'white'}} onClick={()=>{
                    props.getProductReviews(product.id)
                }} to={{pathname: '/product', query:{product:product}}}>Details</Link></Button></center></td>
                <td><center><Button active variant="danger">(Out of Stock)</Button></center></td>
                <td><center><DeleteProduct deleteProduct={props.deleteProduct} productId={product.id} /></center></td>
            </tr>
          
            }else{
            return <tr key={product.id}>
                <td><center><img src={product.main_image}  width="150" height="100"/></center></td>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td><center><Button active ><Link style={{textDecoration:'none', color: 'white'}} onClick={()=>{
                    props.getProductReviews(product.id)
                }} to={{pathname: '/product', query:{product:product}}}>Details</Link></Button></center></td>
                <td><center><Button active ><Link style={{textDecoration:'none', color: 'white'}} to={{pathname: '/cart', query:{product:product}}}>Add</Link></Button></center></td>
                <td><center><DeleteProduct deleteProduct={props.deleteProduct} productId={product.id} /></center></td>
            </tr>
        }
    })
        return (
            <div>
                <br/>
                <h2>Welcome {props.user.first_name}!</h2>
                <br/>
                <h4>Mode: {props.user.role}</h4>
                <Container>
                <Table bordered variant='dark'>
                    <thead>
                        <tr>
                        <th></th>
                            <th>Name</th>
                            <th>Price</th>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {products}
                    </tbody>
                </Table>
                </Container>
                <center>
                <br/>
                <Button onClick={()=>{
                showSizeForm()
            }}>Add Size</Button><br/><br/><br/>
            {sizeVisible? (
                    <AddSize getAllSizes={props.getAllSizes} allSizes={props.allSizes} createSize={props.createSize} />
                    ):null}
                    <Button onClick={()=>{
                showColorForm();
            }}>Add Color</Button><br/><br/><br/>
            {colorVisible? (
                    <AddColor createColor={props.createColor} allColors={props.allColors} />
                    ):null}
                    </center>
                <div>
                    <center>
                <Button onClick={()=>{
                showPostForm();
            }}>Add Product</Button><br/><br/><br/>
            {postVisible? (
                    <PostProduct user={props.user} createProducts={props.createProducts} />
                    
                    ):null}
                    </center>
                </div>
            </div>
        )
    }
}

export default withRouter (ProductTable);