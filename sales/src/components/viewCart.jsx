import React, {useEffect, useState} from 'react';
import { Button } from 'react-bootstrap';
import {Table, Container} from "react-bootstrap";
import DeleteFromCart from './deleteCart';
import Stripe from 'stripe';
import emailjs from 'emailjs-com';
import{ init } from 'emailjs-com';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function ViewCart(props){
    console.log(props)
    const [values, setValues] = useState([]);
    const [redirect,setRedirect] = useState(false);
    
    toast.configure()
        const notify = () => toast("Order Received");

    if (props.userCarts === undefined) {
        return(
            null
        );
    }
    else {

        let order = props.userCarts.map((cart)=>{
            return`
                Product:${cart.product_Id.name},
                Price:${cart.product_Id.price},
                Color:${cart.color_Id},
                Size:${cart.size_Id},
                Quantity:${cart.quantity}`
        
        })
        console.log(order)
        const mail ={
            'order': order,
            'address': props.user.address,
           'username':props.user.username,
            "subject":'Recieved New Order!',
        }

    let notifyCustomer = (em) =>{
        init("user_AayPwVuPYxIALHTDxcrLt");
        emailjs.send('gmail', 'template_hjjzkxr', em)
      .then((result) => {
          console.log(result.text)
          console.log('email sent')
      }, (error) => {
          console.log(error.text)
      })
    }

        async function addOrder() {
            const order = {...values, ['user_Id']:props.user.id , 
            ['tracking_number']: "0", 
            ['total']:props.orderTotal, 
            ['checked_Out']:false,
            ['shopping_carts']: props.cartIds
        }
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
                    <Container>
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
                <Button onClick={()=>(addOrder(), notify(), notifyCustomer(mail))} >Order</Button>
                </Container>
                </div>
            </div>
        )
    }
}

export default ViewCart;