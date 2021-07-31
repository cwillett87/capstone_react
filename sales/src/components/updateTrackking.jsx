import React, { useState } from 'react';
import {withRouter, Redirect} from 'react-router-dom';
import useForm from './useForm';
import Form from 'react-bootstrap/Form';

const Tracking = (props) => {
    const {values, handleChange, handleSubmit} = useForm(addTracking);
    const [redirect,setRedirect] = useState(false);

    async function addTracking() {
        const order = {...values, ['user_Id']:props.order.user_Id.id, ['total']:props.order.total, ['checked_Out']:true }
        props.updateOrder(props.order.id, order);
        setRedirect(true);
        console.log(order)
    }

    return(
        <div>
            {!redirect ? 
            <Form onSubmit={handleSubmit}>
            <label>Tracking:
                    <input
                        type='text'
                        name='tracking_number'
                        onChange={handleChange}
                        value={values.tracking_number}
                    />
                </label>
                
                <button type='submit'>Add</button>
                
            </Form>
            : <Redirect to='/'/>}
        </div>
    )
};

export default withRouter (Tracking);