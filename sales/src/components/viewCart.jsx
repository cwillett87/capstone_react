import React from 'react';
import Table from "react-bootstrap/Table";
import DeleteFromCart from './deleteCart';


function ViewCart(props){
    if (props.userCarts === undefined) {
        return(
            null
        );
    }
    else {
        let carts = props.userCarts.map((cart) => {
            console.log(cart);
            return <tr key={cart.id}>
                <td>{cart.product_Id}</td>
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
                        <tr><th>Product</th>
                            <th>Color</th>
                            <th>Size</th>
                            <th>Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {carts}
                    </tbody>
                </Table>
                </div>
            </div>
        )
    }
}

export default ViewCart;