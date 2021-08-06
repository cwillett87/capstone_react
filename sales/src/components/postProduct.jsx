import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import useForm from './useForm';
import {withRouter, Redirect} from 'react-router-dom';
import axios from 'axios';
import ImageUploading from "react-images-uploading";
import { Container} from "react-bootstrap";
import './css.css'

function PostProduct(props) {
    const {values, handleChange, handleSubmit} = useForm(addProduct);
    const [redirect,setRedirect] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [newProducts, setNewProducts] = useState(props.allProducts);

    useEffect(() => {
        
    },[newProducts])

    let refresh = (product) =>{
        setNewProducts(newProducts=>[...newProducts, product]);
        props.allProducts.push(product)
        console.log(newProducts)
    }

    async function addProduct() {
        let sPrice = values.price;
        let nPrice = parseInt(sPrice);
        let sRating = values.ave_rating;
        let nRating = parseInt(sRating);
        let sQauntity = values.quantity;
        let nQauntity = parseInt(sQauntity);
        const newProduct = {...values, ['creator_Id']: props.user.id, ['price']: nPrice, ['ave_rating']: nRating, ['quantity']: nQauntity }
        props.createProducts(newProduct)
        console.log(newProduct)
        setRedirect(true);
        refresh(newProduct)
        props.getAllProducts()
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
            
            <div>
                <h2 >Add a product</h2>
                <br/>
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
           
            <Container>
            <Form onSubmit={handleSubmit}>
                
                <br/>
            <label>Product Name:
            <br/>
                    <input
                        type='text'
                        name='name'
                        onChange={handleChange}
                        value={values.name}
                    />
                </label>
                <br/> <br/>
                <label>Description:
                <br/>
                    <input
                        type='text'
                        name='description'
                        onChange={handleChange}
                        value={values.description}
                    />
                </label>
                <br/> <br/>
                <label>Price:
                <br/>
                    <input
                        type='text'
                        name='price'
                        onChange={handleChange}
                        value={values.price}
                    />
                </label>
                <br/> <br/>
                <label>Average Rating:
                <br/>
                    <input
                        type='text'
                        name='ave_rating'
                        onChange={handleChange}
                        value={values.ave_rating}
                    />
                </label>
                <br/> <br/>
                <label>Quantity:
                <br/>
                    <input
                        type='text'
                        name='quantity'
                        onChange={handleChange}
                        value={values.quantity}
                    />
                </label>
                <br/> <br/>
                <label>Main Image Path:
                <br/>
                    <input
                        type='text'
                        name='main_image'
                        onChange={handleChange}
                        value= {values.main_image}
                    />
                </label>
                <h6 className='red' >Ex: images/(name.type)</h6>
                
                <button type='submit' onClick={()=>props.getAllProducts()}>Add Product</button>
                <br/>
            </Form>
            <br/>
            </Container>
            </div>
           
        </div>
    )
}

export default PostProduct;