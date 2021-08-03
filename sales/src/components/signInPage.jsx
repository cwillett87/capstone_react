import React, {useEffect, useState} from "react";
import {withRouter} from "react-router-dom";
import RegisterForm from './registerForm';
import LoginForm from "./loginForm";
import { Container, Button, Alert, Card } from "react-bootstrap";
import CustomerRegister from "./customerRegister";

function SignIn(props){
    console.log(props)
    const [visible, setVisible] = useState(false);

let showForm = () =>{
    setVisible(!visible);
}
if(props.loggedIn===false){
    return(
        <div>
            <br/>
            <br/>
            <center>
            <Container>
            <h1>Please register if you don't have an account</h1>
            <br/>
            <Button onClick={()=>{
                showForm();
            }}>Register</Button><br/>
            {visible? (
                <CustomerRegister registerUser={props.registerUser} users={props.users}/>
            ):null}
            <br/>
            <h1>Login</h1>
            <LoginForm loginCurrentUser={props.loginCurrentUser} currentuser={props.getCurrentUser} />
            </Container>
            </center>
        </div>
    )
}
else{
    return(
        <div>
            <br/>
            <br/>
            <center>
            <Container>
            <h1>Click to register a new employee</h1>
            <br/>
            <Button onClick={()=>{
                showForm();
            }}>Register</Button><br/>
            {visible? (
                <RegisterForm registerUser={props.registerUser} users={props.users}/>
            ):null}
            </Container>
            </center>
        </div>
    )
            }
}

export default withRouter(SignIn);