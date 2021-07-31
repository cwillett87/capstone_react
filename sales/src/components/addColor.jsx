import React, { useState } from 'react';
import {withRouter, Redirect} from 'react-router-dom';
import useForm from './useForm';
import Form from 'react-bootstrap/Form';
import { Table } from 'react-bootstrap';

const AddColor = (props) => {
    const {values, handleChange, handleSubmit} = useForm(colorAdd);
    const [redirect,setRedirect] = useState(false);

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
            <Form onSubmit={handleSubmit}>
                <Table>
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
                    <input
                        type='text'
                        name='color'
                        onChange={handleChange}
                        value={values.color}
                    />
                </label>
                
                <button type='submit'>Add</button>
                
            </Form>
            : <Redirect to='/'/>}
        </div>
    )
}

export default withRouter (AddColor);