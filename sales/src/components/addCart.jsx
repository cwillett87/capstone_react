import React, { useEffect,useState } from 'react';
import Form from 'react-bootstrap/Form';
import useForm from './useForm';
import {withRouter, Redirect} from 'react-router-dom';

function AddCart(props) {
    const {values, handleChange, handleSubmit} = useForm(addToCart);
    const [redirect,setRedirect] = useState(false);
    const [updateFilter,setUpdateFilter] = useState([]);

    useEffect(() => {
        filterUserCarts(props.history.location.query.product.id);
        props.getCartsByUserId(props.user.id)
      },[]);

    async function addToCart() {
        console.log(props.productIds)
        let sQauntity = values.quantity;
        let nQauntity = parseInt(sQauntity);
        filterUserCarts(props.history.location.query.product.id);
        if(props.productIds.includes(props.history.location.query.product.id)){
            const newCart = {...values, ['user_Id']: props.user.id, ['product_Id']: props.history.location.query.product.id, ['quantity']:updateFilter[0].quantity += nQauntity }
            console.log("Hit If")
            console.log(updateFilter[0])
            props.updateCart(updateFilter[0].id, newCart);
            const newProduct = {...values, ['creator_Id']: props.user.id, 
                ['name']: props.history.location.query.product.name,
                ['description']: props.history.location.query.product.description,
                ['price']: props.history.location.query.product.price, 
                ['ave_rating']: props.history.location.query.product.ave_rating, 
                ['quantity']: props.history.location.query.product.quantity -= newCart.quantity,
                ['main_image']:props.history.location.query.product.main_image}
            props.updateProduct(props.history.location.query.product.id, newProduct);

        }else{
            const newCart = {...values, ['user_Id']: props.user.id, ['product_Id']: props.history.location.query.product.id, ['quantity']: nQauntity }
            console.log("Hit Else")
            props.createCart(newCart);
            console.log(newCart)
            const newProduct = {...values, ['creator_Id']: props.user.id,
                ['name']: props.history.location.query.product.name,
                ['description']: props.history.location.query.product.description,
                ['price']: props.history.location.query.product.price, 
                ['ave_rating']: props.history.location.query.product.ave_rating, 
                ['quantity']: props.history.location.query.product.quantity -= newCart.quantity,
                ['main_image']:props.history.location.query.product.main_image}
            props.updateProduct(props.history.location.query.product.id, newProduct);
        }
        setRedirect(true);
    }

    let filterUserCarts = (product_Id) =>{
        let filtered = props.userCarts.filter(cart => cart.product_Id.id === product_Id) 
        setUpdateFilter(filtered)
        console.log(filtered)
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