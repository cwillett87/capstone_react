import './App.css';
import axios from 'axios'
import React, {useEffect, useState} from 'react';
import jwtDecode from "jwt-decode";
import NavbarOne from './components/navbar';
import { Container, Button, Alert, Card } from "react-bootstrap";
import {Route, Switch, Link, Redirect} from 'react-router-dom';
import SignIn from './components/signInPage';
import ProductTable from './components/productTable';
import ProductPage from './components/productPage';
import AddCart from './components/addCart';
import DisplayCartPage from './components/viewCartPage';

function App() {
  const [users, setUsers] = useState([]);
  const [regUsers, setRegUsers] = useState([]);
  const [user, setUser] = useState([]);
  const [token, setToken] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [productById, setProductById] = useState([]);
  const [filteredImages, setFilteredImages] = useState([]);
  const [userCarts, setUserCarts] = useState([]);
  const [filteredProductIds, setFilteredProductIds] = useState([]);

  useEffect(() => {
    getAllUsers();
    getToken();
    getAllProducts();
    getCartsByUserId(user.id);
  },[]);

  let getToken = () => {
    const jwt = localStorage.getItem('token');
    try{
      let user = jwtDecode(jwt);
      setToken(jwt);
      setUser(user);
      console.log(jwt)
    }
    catch(err){
      console.log(err);
    }
  }

  let getAllUsers = async () => {
    try{
      let response = await axios.get(`http://127.0.0.1:8000/sales/user/`);
      console.log(response.data)
      setUsers(response.data)
    }
    catch(err) {
      console.log(err);
    }
  }

  let registerUser = async (user) => {
    try{
      let response = await axios.post(`http://127.0.0.1:8000/sales/users/`, user);
      console.log(response.data)
      setRegUsers(response.data)
    }
    catch(err) {
      console.log(err);
    }
  }

  let loginCurrentUser = async (login) => {
    try{
      let response = await axios.post(`http://127.0.0.1:8000/sales/token/login/`, login);
      console.log(response.data)
      setToken(response.data.auth_token);
      localStorage.setItem('token', response.data.auth_token);
      console.log(token)
      getCurrentUser();
    }
    catch(err) {
      console.log(err);
    }
    
  }

  let getCurrentUser = async () => {
    try{
      const jwt = localStorage.getItem('token');
      console.log(jwt)
      let response = await axios.get(`http://127.0.0.1:8000/sales/users/me/`, {headers: {Authorization: 'Token ' + jwt}});
      setUser(response.data);
      console.log(response.data)
      getCartsByUserId(response.data.id);
    }
    catch(err) {
      console.log(err);
    }
  }

  let productIdToList = (carts) => {
    let productIds = carts.map((product) => 
      (product.id));
      setFilteredProductIds(productIds)
      console.log(productIds)
  }

  let logoutUser = () =>{
    localStorage.removeItem('token');
    setUser(null);
  }

  let getAllProducts = async () => {
    try{
      let response = await axios.get(`http://127.0.0.1:8000/sales/products/`);
      setAllProducts(response.data);
      console.log(response.data)
    }
    catch(err) {
      console.log(err);
    }
  }

  let getProductById = async (productId) => {
    try{
        let response = await axios.get(`http://127.0.0.1:8000/sales/products/${productId}/`);
        console.log(response.data)
        setProductById(response.data)
        
      }
      catch(err) {
        console.log(err);
      } 
  }

  let getImageByProductId = async (productId) => {
    try{
        let response = await axios.get(`http://127.0.0.1:8000/sales/images/${productId}/`);
        console.log(response.data)
        setFilteredImages(response.data)
        
      }
      catch(err) {
        console.log(err);
      } 
  }

  let createProducts = async (product) => {
    try{
      let response = await axios.post(`http://127.0.0.1:8000/sales/products/`, product);
      console.log(response.data)
    }
    catch(err) {
      console.log(err);
    }
  }

  let deleteProduct = async (id) => {
    try{
      await axios.delete(`http://127.0.0.1:8000/sales/products/${id}/`)
    }
    catch(err) {
      console.log(err);
    }
  }

  let updateProduct = async (id, product) => {
    try{
      await axios.put(`http://127.0.0.1:8000/sales/products/${id}/`, product)
    }
    catch(err) {
      console.log(err);
    }
  }

  let getCartsByUserId = async (userId) => {
    try{
        let response = await axios.get(`http://127.0.0.1:8000/sales/shopping-carts/${userId}/`);
        console.log(response.data)
        setUserCarts(response.data)
        productIdToList(response.data); 
      }
      catch(err) {
        console.log(err);
      }
  }

  let deleteCart = async (id) => {
    try{
      await axios.delete(`http://127.0.0.1:8000/sales/shopping-carts-update/${id}/`)
    }
    catch(err) {
      console.log(err);
    }
  }

  let createCart = async (cart) => {
    try{
      let response = await axios.post(`http://127.0.0.1:8000/sales/shopping-carts/`, cart);
      console.log(response.data)
    }
    catch(err) {
      console.log(err);
    }
  }

  return (
    <div>
      <div>
        <NavbarOne logoutUser={logoutUser} getCartsByUserId={getCartsByUserId} user={user} />
        <Switch>
      <Route path='/show-cart' render={props => <DisplayCartPage {...props} filteredProductIds={filteredProductIds} allProducts={allProducts}  user={user} userCarts={userCarts} deleteCart={deleteCart} />}/>
        <Route path='/cart' render={props => <AddCart {...props} user={user} createCart={createCart} />}/>
        <Route path='/login' render={props => <SignIn {...props}registerUser={registerUser} users={users}
        loginCurrentUser={loginCurrentUser} currentuser={getCurrentUser}/>}/>
        <Route path='/product' render={props => <ProductPage {...props} getProductById={getProductById} productById={productById} 
        productImages={filteredImages} getImages={getImageByProductId} updateProduct={updateProduct} user={user}/>}/>
         <Route path='/' render={props => <ProductTable {...props} allProducts={allProducts} 
         getCartsByUserId={getCartsByUserId} user={user} userCarts={userCarts} deleteCart={deleteCart}
         createProducts={createProducts} deleteProduct={deleteProduct} createCart={createCart} />}/>
        </Switch>
      </div>
    </div>
  );
}

export default App;
