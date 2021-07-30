import React, {useEffect, useState} from 'react';
import { Button } from 'react-bootstrap';
import Table from "react-bootstrap/Table";
import DeleteFromCart from './deleteCart';


function ViewCart(props){
    console.log(props.userCarts)
    const [values, setValues] = useState([]);
    const [redirect,setRedirect] = useState(false);
    if (props.userCarts === undefined) {
        return(
            null
        );
    }
    else {
        async function addOrder() {
            const order = {...values, ['user_Id']:props.user.id , ['tracking_number']: "0", ['total']:props.orderTotal, ['checked_Out']:false }
            props.createOrder(order);
            setRedirect(true);
        }

        let carts = props.userCarts.map((cart) => {
            console.log(cart);
            return <tr key={cart.id}>
                <img src={cart.product_Id.main_image}  width="150" height="100"/>
                <td>{cart.product_Id.name}</td>
                <td>{cart.product_Id.price}</td>
                <td>{cart.product_Id.ave_rating}</td>
                <td>{cart.color_Id}</td>
                <td>{cart.size_Id}</td>
                <td>{cart.quantity}</td>
                <DeleteFromCart cartid={cart.id} deleteCart={props.deleteCart}/>
                </tr>
        });
        return(
            <div>
                <div>
                <Table>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Ave Rating</th>
                            <th>Color</th>
                            <th>Size</th>
                            <th>Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {carts}
                    </tbody>
                </Table>
                <h1>Total:${props.orderTotal}</h1>
                <Button onClick={()=>{addOrder()}} >Order</Button>
                </div>
            </div>
        )
    }
}

export default ViewCart;