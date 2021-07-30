import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import useForm from './useForm';
import {withRouter, Redirect} from 'react-router-dom';
import axios from 'axios';
import ImageUploading from "react-images-uploading";

function PostProduct(props) {
    const {values, handleChange, handleSubmit} = useForm(addProduct);
    const [redirect,setRedirect] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);

    async function addProduct() {
        let sPrice = values.price;
        let nPrice = parseInt(sPrice);
        let sRating = values.ave_rating;
        let nRating = parseInt(sRating);
        let sQauntity = values.quantity;
        let nQauntity = parseInt(sQauntity);
        const newProduct = {...values, ['creator_Id']: props.user.id, ['price']: nPrice, ['ave_rating']: nRating, ['quantity']: nQauntity }
        props.createProducts(newProduct);
        console.log(newProduct)
        setRedirect(true);
    }

    // let fileHandler = event => {
    //     setSelectedFile(event.target.files[0])
    //     console.log(event.target.files[0].name)
    // }

    // let fileUploader = () => {
    //     // `public/images${selectedFile.name}`
    // }

      let onChange = (imageList) => {
            const formData = new FormData();
            formData.append(
                'myFile',
                imageList[0].file,
                imageList[0].file.name
            );
            console.log(imageList[0].file);

            axios.post('http://localhost:3000/public/images', formData);
        }

    return(
        <div>
            {!redirect ? 
            <div>
            {/* <input type='file' onChange={fileHandler}/>
            <button onClick={fileUploader} >Upload</button> */}
            <ImageUploading onChange={onChange} 
            >
                {({ imageList, onImageUpload }) => (
                    // write your building UI
          <div className="imageuploader">
          <div className="mainBtns">
          <button className="btn btn-primary mr-1" onClick={onImageUpload}>Upload Image</button>
          
          </div>
          {imageList.map((image) => (
            <div className="imagecontainer" key={image.key}>
              <img src={image.dataURL} />
              
            </div>
          ))}
        </div>
      )}
    </ImageUploading>
    
            <br/>
            <br/>
            <Form onSubmit={handleSubmit}>
                <h2>Add a product</h2>
            <label>Product Name:
                    <input
                        type='text'
                        name='name'
                        onChange={handleChange}
                        value={values.name}
                    />
                </label>
                <label>Description:
                    <input
                        type='text'
                        name='description'
                        onChange={handleChange}
                        value={values.description}
                    />
                </label>
                <label>Price:
                    <input
                        type='text'
                        name='price'
                        onChange={handleChange}
                        value={values.price}
                    />
                </label>
                <label>Average Rating:
                    <input
                        type='text'
                        name='ave_rating'
                        onChange={handleChange}
                        value={values.ave_rating}
                    />
                </label>
                <label>Quantity:
                    <input
                        type='text'
                        name='quantity'
                        onChange={handleChange}
                        value={values.quantity}
                    />
                </label>
                <h6>Ex: images/(name.type)</h6>
                <label>Main Image Path:
                    <input
                        type='text'
                        name='main_image'
                        onChange={handleChange}
                        value= {values.main_image}
                    />
                </label>
                
                <button type='submit'>Add Product</button>
                
            </Form>
            </div>
            : <Redirect to='/'/>}
        </div>
    )
}

export default PostProduct;