import React, { useState } from 'react';
import {withRouter, Redirect} from 'react-router-dom';
import useForm from './useForm';
import Form from 'react-bootstrap/Form'
import { Button, Container } from "react-bootstrap";

const CustomerRegister = (props) => {
    const {values, handleChange, handleSubmit} = useForm(createUser);
    const [redirect,setRedirect] = useState(false);

    async function createUser() {
        console.log(values.phone);
        let string = values.phone;
        let number = parseInt(string);
        const addUser = {...values, ['phone']: number, ['role']: 'customer' }
        console.log(addUser);
        props.registerUser(addUser);
    }

    return(
        <div>
            {!redirect ?
            <Container>
                <br/>
            <Form onSubmit={handleSubmit}>
            <label>Username:
            <br/>
                    <input
                        type='text'
                        name='username'
                        onChange={handleChange}
                        value={values.username}
                    />
                </label>
                <br/><br/>
                <label>First Name:
                <br/>
                    <input
                        type='text'
                        name='first_name'
                        onChange={handleChange}
                        value={values.first_name}
                    />
                </label>
                <br/><br/>
                <label>Last Name:
                <br/>
                    <input
                        type='text'
                        name='last_name'
                        onChange={handleChange}
                        value={values.definition}
                    />
                </label>
                <br/><br/>
                <label>Phone:
                <br/>
                    <input
                        type='text'
                        name='phone'
                        onChange={handleChange}
                        value={values.phone}
                    />
                </label>
                <br/><br/>
                <label>Address:
                <br/>
                    <input
                        type='text'
                        name='address'
                        onChange={handleChange}
                        value={values.address}
                    />
                </label>
                <br/><br/>
                <label>Email:
                <br/>
                    <input
                        type='text'
                        name='email'
                        onChange={handleChange}
                        value={values.email}
                    />
                </label>
                <br/><br/>
                <label>Password:
                <br/>
                    <input
                        type='text'
                        name='password'
                        onChange={handleChange}
                        value={values.password}
                    />
                </label>
                <br/><br/>
                <label>Retype Password:
                <br/>
                    <input
                        type='text'
                        name='re_password'
                        onChange={handleChange}
                        value={values.re_password}
                    />
                </label>
                <br/><br/>
                <button type='submit'>Register</button>
            </Form>
            </Container>
            : <Redirect to='/'/>}
        </div>
    )
};

export default withRouter (CustomerRegister);