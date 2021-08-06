import React, { useState, useEffect } from 'react';
import {withRouter, Redirect} from 'react-router-dom';
import useForm from './useForm';
import Form from 'react-bootstrap/Form';
import {Table, Container} from "react-bootstrap";

const AddColor = (props) => {
    const {values, handleChange, handleSubmit} = useForm(colorAdd);
    const [redirect,setRedirect] = useState(false);

    useEffect(() => {
        props.getAllColors()
    },[])

    async function colorAdd() {
        const color = {...values}
        props.createColor(color);
        setRedirect(true);
        console.log(color)
    }

        let items = props.allColors.map((color)=>{
            return <tr>
                <td>{color.color}</td>
            </tr>
        })


    return(
        <div>
            {!redirect ? 
            <Container>
            <Form onSubmit={handleSubmit}>
            <Table bordered variant='dark'>
            <thead>
                <tr>
                    <th>Colors</th>
                </tr>
            </thead>
            <tbody>
                    {items}
            </tbody>
            </Table>
            <label>New Color:
            <br/>
                    <input
                        type='text'
                        name='color'
                        onChange={handleChange}
                        value={values.color}
                    />
                </label>
                <br/><br/>
                <button type='submit'>Add</button>
                
            </Form>
            <br/>
            </Container>
            : <Redirect to='/'/>}
        </div>
    )
}

export default withRouter (AddColor);