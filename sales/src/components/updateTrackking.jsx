import React, { useState } from 'react';
import {withRouter, Redirect} from 'react-router-dom';
import useForm from './useForm';
import {Form, Container} from 'react-bootstrap';
import emailjs from 'emailjs-com';
import{ init } from 'emailjs-com';

const Tracking = (props) => {
    const {values, handleChange, handleSubmit} = useForm(addTracking);
    const [redirect,setRedirect] = useState(false);

    async function addTracking() {
        const order = {...values, ['user_Id']:props.order.user_Id.id, ['total']:props.order.total, ['checked_Out']:true }
        props.updateOrder(props.order.id, order);
        setRedirect(true);
        console.log(order)
        const mail ={
            'email':props.order.user_Id.email,
           'name':props.order.user_Id.username,
            "tracking_number":order.tracking_number,
            "subject":'Your Order is on its way!',
        }
        notifyCustomer(mail)
    }

    
    
    let notifyCustomer = (em) =>{
        init("user_AayPwVuPYxIALHTDxcrLt");
        emailjs.send('gmail', 'template_dcqqta9', em)
      .then((result) => {
          console.log(result.text)
          console.log('email sent')
      }, (error) => {
          console.log(error.text)
      })
    }

    return(
        <div>
            {!redirect ? 
            <Container>
                <center>
            <Form onSubmit={handleSubmit}>
            <label>Tracking:
                    <input
                        type='text'
                        name='tracking_number'
                        onChange={handleChange}
                        value={values.tracking_number}
                    />
                </label>
                
                <button className="move" type='submit' onClick={()=>props.getAllOrders()}>Add</button>
                
            </Form>
            </center>
            </Container>
            : <Redirect to='/'/>}
        </div>
    )
};

export default withRouter (Tracking);