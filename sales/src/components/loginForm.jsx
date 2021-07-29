import React, { useState } from 'react';
import {withRouter, Redirect} from 'react-router-dom';
import useForm from './useForm';
import Form from 'react-bootstrap/Form'

const LoginForm = (props) => {
    const {values, handleChange, handleSubmit} = useForm(loginUser);
    const [redirect,setRedirect] = useState(false);

    async function loginUser() {
        const login = {...values}
        props.loginCurrentUser(login);
        setRedirect(true);
    }

    return(
        <div>
            {!redirect ? 
            <Form onSubmit={handleSubmit}>
            <label>Email:
                    <input
                        type='text'
                        name='email'
                        onChange={handleChange}
                        value={values.email}
                    />
                </label>
                <label>Password:
                    <input
                        type='text'
                        name='password'
                        onChange={handleChange}
                        value={values.password}
                    />
                </label>
                
                <button type='submit'>Login</button>
                
            </Form>
            : <Redirect to='/'/>}
        </div>
    )
};

export default withRouter (LoginForm);