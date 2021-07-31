import React, { useEffect,useState } from 'react';
import Form from 'react-bootstrap/Form';
import useForm from './useForm';
import {withRouter, Redirect} from 'react-router-dom';
import Table from "react-bootstrap/Table";

function Review(props){

    const {values, handleChange, handleSubmit} = useForm(addReview);
    const [redirect,setRedirect] = useState(false);
    const [ratings,setRatings] = useState([]);


    async function addReview(){
        let sRating = values.rating;
        let nRating= parseInt(sRating);
        const newReview = {...values, ['product_Id']: props.product.id, ['rating']: nRating}
        props.createReview(newReview)
        if(props.product.ave_rating ===0){
            const newProduct = {['creator_Id']: props.user.id, 
                ['name']: props.product.name,
                ['description']: props.product.description,
                ['price']: props.product.price, 
                ['ave_rating']: nRating, 
                ['quantity']: props.product.quantity,
                ['main_image']:props.product.main_image}
                console.log(newProduct)
            props.updateProduct(props.product.id, newProduct);
        }
        else{
            let total = 0 + nRating
            let ratings = props.reviews.map((review)=>
            (review.rating))
            setRatings(ratings)
            for(let i=0;i<ratings.length;i++)
            total += ratings[i]
            let length = ratings.length + 1
            let average = total/length
            console.log(average)
            const newProduct = {['creator_Id']: props.user.id, 
            ['name']: props.product.name,
            ['description']: props.product.description,
            ['price']: props.product.price, 
            ['ave_rating']: average, 
            ['quantity']: props.product.quantity,
            ['main_image']:props.product.main_image}
            console.log(newProduct)
        props.updateProduct(props.product.id, newProduct); 
        }
    }

    if(props.reviews.length === 1){
        return(
            <div>
                {!redirect ?
                <div>
                <Table>
                <thead>
                    <tr>
                        <th>Rating</th>
                        <th>Review</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{props.reviews[0].rating}</td>
                        <td>{props.reviews[0].review}</td>
                    </tr>
                </tbody>
            </Table>
            <br/>
            <br/>
            <Form onSubmit={handleSubmit}>
                <h2>Please write a review</h2>
                <label>Rating:
                    <input
                        type='text'
                        name='rating'
                        onChange={handleChange}
                        value={values.rating}
                    />
                </label>
                <label>Review:
                    <input
                        type='text'
                        name='review'
                        onChange={handleChange}
                        value={values.review}
                    />
                </label>

                <button type='submit'>Submit</button>
                
            </Form>
            </div>
            : <Redirect to='/'/>}
            </div>
        )
    }
    else{
        let reviews = props.reviews.map((review)=>{
            return <tr>
                <td>{review.rating}</td>
                <td>{review.review}</td>
            </tr>
        })
    return(
        <div>
            {!redirect ?
                <div>
            <Table>
                <thead>
                    <tr>
                        <th>Rating</th>
                        <th>Review</th>
                    </tr>
                </thead>
                <tbody>
                    {reviews}
                </tbody>
            </Table>
            <br/>
            <br/>
            <Form onSubmit={handleSubmit}>
                <h2>Please write a review</h2>
                <label>Rating:
                    <input
                        type='text'
                        name='rating'
                        onChange={handleChange}
                        value={values.rating}
                    />
                </label>
                <label>Review:
                    <input
                        type='text'
                        name='review'
                        onChange={handleChange}
                        value={values.review}
                    />
                </label>

                <button type='submit'>Submit</button>
                
            </Form>
            </div>
            : <Redirect to='/'/>}
        </div>
    )
    }
}
export default Review;