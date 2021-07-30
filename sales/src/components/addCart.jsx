import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import useForm from './useForm';
import {withRouter, Redirect} from 'react-router-dom';

function AddCart(props) {
    const {values, handleChange, handleSubmit} = useForm(addToCart);
    const [redirect,setRedirect] = useState(false);

    async function addToCart() {
        console.log(props)
        let sQauntity = values.quantity;
        let nQauntity = parseInt(sQauntity);
        const newCart = {...values, ['user_Id']: props.user.id, ['product_Id']: props.history.location.query.product.id, ['quantity']: nQauntity }
        props.createCart(newCart);
        setRedirect(true);
        console.log(newCart)
    }


    return(
        <div>
            {!redirect ? 
            <div>
                <img src={props.history.location.query.product.main_image}  width="150" height="100"/>
                <h3>{props.history.location.query.product.name}</h3>
                <h3>${props.history.location.query.product.price}.00</h3>
                <h3>{props.history.location.query.product.ave_rating}</h3>
            <Form onSubmit={handleSubmit}>
                <h2>Please select size, color and Qty</h2>
                <label>Color:
                    <input
                        type='text'
                        name='color_Id'
                        onChange={handleChange}
                        value={values.color_Id}
                    />
                </label>
                <label>Size:
                    <input
                        type='text'
                        name='size_Id'
                        onChange={handleChange}
                        value={values.size_Id}
                    />
                </label>
                <label>Quantity:
                    <input
                        type='text'
                        name='quantity'
                        onChange={handleChange}
                        value={values.quantity}
                    />
                </label>

                <button type='submit'>Add</button>
                
            </Form>
            </div>
            : <Redirect to='/'/>}
        </div>
    )
}

export default AddCart;