import React, { useState } from 'react';
import {withRouter, Redirect} from 'react-router-dom';
import useForm from './useForm';
import Form from 'react-bootstrap/Form'
import { Button, Container } from "react-bootstrap";

const RegisterForm = (props) => {
    const {values, handleChange, handleSubmit} = useForm(createUser);
    const [redirect,setRedirect] = useState(false);

    async function createUser() {
        console.log(values.phone);
        let string = values.phone;
        let number = parseInt(string);
        const addUser = {...values, ['phone']: number}
        console.log(addUser);
        props.registerUser(addUser);
    }

    return(
        <div>
            {!redirect ?
            <Container>
            <Form onSubmit={handleSubmit}>
            <label>Username:
                    <input
                        type='text'
                        name='username'
                        onChange={handleChange}
                        value={values.username}
                    />
                </label>
                <label>First Name:
                    <input
                        type='text'
                        name='first_name'
                        onChange={handleChange}
                        value={values.first_name}
                    />
                </label>
                <label>Last Name:
                    <input
                        type='text'
                        name='last_name'
                        onChange={handleChange}
                        value={values.definition}
                    />
                </label>
                <label>Phone:
                    <input
                        type='text'
                        name='phone'
                        onChange={handleChange}
                        value={values.phone}
                    />
                </label>
                <label>Address:
                    <input
                        type='text'
                        name='address'
                        onChange={handleChange}
                        value={values.address}
                    />
                </label>
                <label>Role:
                    <input
                        type='text'
                        name='role'
                        onChange={handleChange}
                        value={values.role}
                    />
                </label>
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
                <label>Retype Password:
                    <input
                        type='text'
                        name='re_password'
                        onChange={handleChange}
                        value={values.re_password}
                    />
                </label>
                
                <button type='submit'>Register</button>
            </Form>
            </Container>
            : <Redirect to='/'/>}
        </div>
    )
};

export default withRouter (RegisterForm);