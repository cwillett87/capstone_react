import React, { useState } from 'react';
import {withRouter, Redirect} from 'react-router-dom';
import useForm from './useForm';
import Form from 'react-bootstrap/Form';
import {Table, Container} from "react-bootstrap";

const AddSize = (props) => {
    const {values, handleChange, handleSubmit} = useForm(sizeAdd);
    const [redirect,setRedirect] = useState(false);

    async function sizeAdd() {
        const size = {...values}
        props.createSize(size);
        setRedirect(true);
        console.log(size)
    }

        let items = props.allSizes.map((size)=>{
            return <tr>
                <td>{size.size}</td>
            </tr>
        })


    return(
        <div>
            {!redirect ? 
            <Container>
            <Form onSubmit={handleSubmit}>
                <Table>
            <thead>
                <tr>
                    <th>Sizes</th>
                </tr>
            </thead>
            <tbody>
                    {items}
            </tbody>
            </Table>
            <label>New Size:
                    <input
                        type='text'
                        name='size'
                        onChange={handleChange}
                        value={values.size}
                    />
                </label>
                
                <button type='submit'>Add</button>
                
            </Form>
            </Container>
            : <Redirect to='/'/>}
        </div>
    )
}

export default withRouter (AddSize);