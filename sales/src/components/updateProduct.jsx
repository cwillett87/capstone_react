import React, { useState } from 'react';
import {Form, Container } from 'react-bootstrap';
import useForm from './useForm';
import {withRouter, Redirect} from 'react-router-dom';

function UpdateProduct(props) {
    const {values, handleChange, handleSubmit} = useForm(updateProduct);
    const [redirect,setRedirect] = useState(false);

    async function updateProduct() {
        let sPrice = values.price;
        let nPrice = parseInt(sPrice);
        let sRating = values.ave_rating;
        let nRating = parseInt(sRating);
        let sQauntity = values.quantity;
        let nQauntity = parseInt(sQauntity);
        const newProduct = {...values, ['creator_Id']: props.user.id, ['price']: nPrice, ['ave_rating']: nRating, ['quantity']: nQauntity }
        props.updateProduct(props.product.id, newProduct);
        console.log(newProduct)
        setRedirect(true);
    }


    return(
        <div>
            {!redirect ? 
            <Container>
            <Form onSubmit={handleSubmit}>
                <h2>Update product</h2>
            <label>Product Name:
                    <input
                        type='text'
                        name='name'
                        onChange={handleChange}
                        value={values.name}
                    />
                </label>
                <label>Description:
                    <input
                        type='text'
                        name='description'
                        onChange={handleChange}
                        value={values.description}
                    />
                </label>
                <label>Price:
                    <input
                        type='text'
                        name='price'
                        onChange={handleChange}
                        value={values.price}
                    />
                </label>
                <label>Average Rating:
                    <input
                        type='text'
                        name='ave_rating'
                        onChange={handleChange}
                        value={values.ave_rating}
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
                <h6>Ex: images/(name.type)</h6>
                <label>Main Image Path:
                    <input
                        type='text'
                        name='main_image'
                        onChange={handleChange}
                        value= {values.main_image}
                    />
                </label>
                
                <button type='submit'>Update</button>
                
            </Form>
            </Container>
            : <Redirect to='/'/>}
        </div>
    )
}

export default UpdateProduct;