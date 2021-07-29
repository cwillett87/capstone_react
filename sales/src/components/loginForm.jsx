import React, { useState } from 'react';
import {withRouter} from 'react-router-dom';
import useForm from './useForm';
import Form from 'react-bootstrap/Form'

const LoginForm = (props) => {
    const {values, handleChange, handleSubmit} = useForm(loginUser);
    

    async function loginUser() {
        const login = {...values}
        props.loginCurrentUser(login);
    }

    return(
        <div>
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
        </div>
    )
};

export default withRouter (LoginForm);