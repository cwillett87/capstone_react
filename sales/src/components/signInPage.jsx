import React, {useEffect, useState} from "react";
import {withRouter} from "react-router-dom";
import RegisterForm from './registerForm';
import LoginForm from "./loginForm";
import { Container, Button, Alert, Card } from "react-bootstrap";

function SignIn(props){
    console.log(props)
    const [visible, setVisible] = useState(false);

let showForm = () =>{
    setVisible(!visible);
}

    return(
        <div>
            <Container>
            <h1>Please register if you don't have an account</h1>
            <Button onClick={()=>{
                showForm();
            }}>Register</Button><br/>
            {visible? (
                <RegisterForm registerUser={props.registerUser} users={props.users}/>
            ):null}
            
            <h1>Login</h1>
            <LoginForm loginCurrentUser={props.loginCurrentUser} currentuser={props.getCurrentUser} />
            </Container>
        </div>
    )
}

export default withRouter(SignIn);