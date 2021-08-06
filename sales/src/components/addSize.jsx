import React, { useState,  useEffect } from 'react';
import {withRouter, Redirect} from 'react-router-dom';
import useForm from './useForm';
import Form from 'react-bootstrap/Form';
import {Table, Container} from "react-bootstrap";

const AddSize = (props) => {
    const {values, handleChange, handleSubmit} = useForm(sizeAdd);
    const [redirect,setRedirect] = useState(false);

    useEffect(() => {
        
    },[props.allSizes])

    async function sizeAdd() {
        const size = {...values}
        props.createSize(size);
        setRedirect(true);
        console.log(size)
        props.getAllSizes()
    }

        let items = props.allSizes.map((size)=>{
            return <tr>
                <td>{size.size}</td>
            </tr>
        })


    return(
        <div>
            
            <Container>
            <Form onSubmit={handleSubmit}>
            <Table bordered variant='dark'>
            <thead >
                <tr>
                    <th>Sizes</th>
                </tr>
            </thead>
            <tbody>
                    {items}
            </tbody>
            </Table>
            <label>New Size:
            <br/>
                    <input
                        type='text'
                        name='size'
                        onChange={handleChange}
                        value={values.size}
                    />
                </label>
                <br/><br/>
                <button type='submit' onClick={()=>props.getAllSizes()}>Add</button>
                
            </Form>
            <br/>
            </Container>
            
        </div>
    )
}

export default withRouter (AddSize);