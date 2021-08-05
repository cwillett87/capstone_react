import React, {useEffect, useState} from 'react';
import { Button } from 'react-bootstrap';
import {Table, Container} from "react-bootstrap";
import DeleteFromCart from './deleteCart';
import StripeCheckout from 'react-stripe-checkout';
import emailjs from 'emailjs-com';
import{ init } from 'emailjs-com';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function ViewCart(props){
    console.log(props)
    const [values, setValues] = useState([]);
    const [redirect,setRedirect] = useState(false);

    useEffect(() => {
        props.getCartsByUserId(props.user.id);
      },[]);
    
    toast.configure()
        const notify = () => toast("Order Received");

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
            ['checked_Out']:true,
            ['shopping_carts']: props.cartIds
        }
        console.log(order)
            props.createOrder(order);
            setRedirect(true);
            
        }

        let handleToken = (token, addresses) =>{
            console.log({token, addresses})
            addOrder()
             notify()
            notifyCustomer(mail)
        }
    
        
        

        let carts = props.userCarts.map((cart) => {
            console.log(cart);
            return <tr key={cart.id}>
                <td><center><img src={cart.product_Id.main_image}  width="150" height="100"/></center></td>
                <td>{cart.product_Id.name}</td>
                <td>{cart.product_Id.price}</td>
                <td>{cart.product_Id.ave_rating}</td>
                <td>{cart.color_Id}</td>
                <td>{cart.size_Id}</td>
                <td>{cart.quantity}</td>
                <td><center><DeleteFromCart getCartsByUserId={props.getCartsByUserId} user={props.user} cartid={cart.id} deleteCart={props.deleteCart}/></center></td>
                </tr>
        })
        return(
            <div>
                <div>
                <br/>
                <br/>
                <br/>
                    <Container>
                    <Table bordered variant='dark'>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Ave Rating</th>
                            <th>Color</th>
                            <th>Size</th>
                            <th>Quantity</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {carts}
                    </tbody>
                </Table>
                <br/>
                <center>
                <h1>Total:${props.orderTotal}</h1>
                <StripeCheckout stripeKey={props.newKey.publicKey} token={handleToken} billingAddress 
                shippingAddress
                amount={props.orderTotal * 100}
                
                />
                </center>
                </Container>
                </div>
            </div>
        )
    
}

export default ViewCart;