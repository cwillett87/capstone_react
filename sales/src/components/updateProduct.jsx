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
                <br/>
            <label>Product Name:
            <br/>
                    <input
                        type='text'
                        name='name'
                        onChange={handleChange}
                        value={values.name}
                    />
                </label>
                <br/>
                <br/>
                <label>Description:
                <br/>
                    <input
                        type='text'
                        name='description'
                        onChange={handleChange}
                        value={values.description}
                    />
                </label>
                <br/>
                <br/>
                <label>Price:
                <br/>
                    <input
                        type='text'
                        name='price'
                        onChange={handleChange}
                        value={values.price}
                    />
                </label>
                <br/>
                <br/>
                <label>Average Rating:
                <br/>
                    <input
                        type='text'
                        name='ave_rating'
                        onChange={handleChange}
                        value={values.ave_rating}
                    />
                </label>
                <br/>
                <br/>
                <label>Quantity:
                <br/>
                    <input
                        type='text'
                        name='quantity'
                        onChange={handleChange}
                        value={values.quantity}
                    />
                </label>
                <br/>
                <br/>
                
                <label>Main Image Path:
                <br/>
                    <input
                        type='text'
                        name='main_image'
                        onChange={handleChange}
                        value= {values.main_image}
                    />
                </label>
                <h6>Ex: images/(name.type)</h6>
                <br/>
                <button type='submit'>Update</button>
                
            </Form>
            </Container>
            : <Redirect to='/'/>}
        </div>
    )
}

export default UpdateProduct;