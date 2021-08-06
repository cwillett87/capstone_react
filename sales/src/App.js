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
import DisplayOrders from './components/displayOders';
import DisplaySales from './components/salesPage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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
  const [orderTotal, setOrderTotal] = useState([]);
  const [productIds, setProductIds] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [allOrders, setAllOrders] = useState([]);
  const [readyOrders, setReadyOrders] = useState([]);
  const [shippedOrders, setShippedOrders] = useState([]);
  const [unpaidOrders, setUnpaidOrders] = useState([]);
  const [paidOrders, setPaidOrders] = useState([]);
  const [allSizes, setAllSizes] = useState([]);
  const [allColors, setAllColors] = useState([]);
  const [sales, setSales] = useState([]);
  const [salesTotal, setSalesTotal] = useState([]);
  const [productSales, setProductSales] = useState([]);
  const [cartIds, setCartIds] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [newKey, setNewKey] = useState([]);
  const [newOrder, setNewOrder] = useState(false);

  useEffect(() => {
    getAllUsers();
    getToken();
    getAllProducts();
    getCartsByUserId(user.id);
    getAllOrders();
    getAllSizes();
    getAllColors();
    getKey();
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
      setLoggedIn(true)
      getKey()
      console.log(newKey)
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
      console.log(newOrder)
      if(newOrder === true){
        toast.configure()
        const notify = () => toast("New Order Received");
        notify()
        setNewOrder(false)
    }
    }
    catch(err) {
      console.log(err);
    }
  }

  let productIdToList = (carts) => {
    let total = 0
    let productIds = carts.map((product) => 
      ({price:product.product_Id.price * product.quantity}))
      setFilteredProductIds(productIds)
      console.log(productIds[0].price)
      for(let i =0; i < productIds.length;i++)
      total += productIds[i].price
      console.log(total)
      setOrderTotal(total)
  }

  let cartsToList = (carts) =>{
    let ids = carts.map((id)=>
    (id.id))
    setCartIds(ids)
}

  let cartProductIds = (carts) => {
    let productIds = carts.map((product) =>
    (product.product_Id.id));
    setProductIds(productIds)
    console.log(productIds)
  }

  let logoutUser = () =>{
    localStorage.removeItem('token');
    setLoggedIn(false)
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
        cartProductIds(response.data)
        cartsToList(response.data) 
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

  let updateCart = async (id, cart) => {
    try{
      let response = await axios.put(`http://127.0.0.1:8000/sales/shopping-carts-update/${id}/`, cart);
      console.log("updated"+response.data)
    }
    catch(err) {
      console.log(err);
    }
  }

  let createOrder = async (order) => {
    try{
      let response = await axios.post(`http://127.0.0.1:8000/sales/orders/`, order);
      console.log(response.data)
      console.log("created order")
    }
    catch(err) {
      console.log(err);
    }
  }

  let getProductReviews = async (productId) => {
    try{
      let response = await axios.get(`http://127.0.0.1:8000/sales/reviews/${productId}/`);
      setReviews(response.data);
      console.log(response.data)
    }
    catch(err) {
      console.log(err);
    }
  }

  let createReview = async (review) => {
    try{
      let response = await axios.post(`http://127.0.0.1:8000/sales/reviews/`, review);
      console.log(response.data)
      console.log("created review")
    }
    catch(err) {
      console.log(err);
    }
  }

  let getAllOrders = async () => {
    try{
      let response = await axios.get(`http://127.0.0.1:8000/sales/orders/`);
      setAllOrders(response.data);
      console.log(response.data)
      getReadyOrders(response.data)
      getShippedOrders(response.data)
      getUnpaidOrders(response.data)
      gePaidOrders(response.data)
    }
    catch(err) {
      console.log(err);
    }
  }

  let getReadyOrders =(orders) =>{
    let filtered = orders.filter(order => order.checked_Out == true && 
    order.tracking_number == 0)
    setReadyOrders(filtered)
  }

  let getShippedOrders =(orders) =>{
    let filtered = orders.filter(order => order.tracking_number > 0)
    setShippedOrders(filtered)
  }

  let getUnpaidOrders =(orders) =>{
    let filtered = orders.filter(order => order.checked_Out == false)
    setUnpaidOrders(filtered)
  }

  let gePaidOrders =(orders) =>{
    let filtered = orders.filter(order => order.checked_Out == true)
    setPaidOrders(filtered)
    totalSales(filtered)
  }

  let totalSales = (orders) => {
    let total = 0
    
    let orderTotals = orders.map((order) => 
      (order.total))
      let result = orderTotals.map(Number);
      setSales(result)
      console.log(result)
      for(let i =0; i < result.length;i++)
      total += result[i]
      console.log(total)
      setSalesTotal(total)
  }

  let updateOrder = async (id, order) => {
    try{
      let response = await axios.put(`http://127.0.0.1:8000/sales/orders/${id}/`, order);
      console.log("updated"+response.data)
    }
    catch(err) {
      console.log(err);
    }
  }

  let getAllSizes = async () => {
    try{
      let response = await axios.get(`http://127.0.0.1:8000/sales/sizes/`);
      setAllSizes(response.data);
      console.log(response.data)
    }
    catch(err) {
      console.log(err);
    }
  }

  let createSize = async (size) => {
    try{
      let response = await axios.post(`http://127.0.0.1:8000/sales/sizes/`, size);
      console.log(response.data)
      console.log("created")
    }
    catch(err) {
      console.log(err);
    }
  }

  let getAllColors = async () => {
    try{
      let response = await axios.get(`http://127.0.0.1:8000/sales/colors/`);
      setAllColors(response.data);
      console.log(response.data)
    }
    catch(err) {
      console.log(err);
    }
  }
  let createColor = async (color) => {
    try{
      let response = await axios.post(`http://127.0.0.1:8000/sales/colors/`, color);
      console.log(response.data)
      console.log("created")
    }
    catch(err) {
      console.log(err);
    }
  }

  let getKey = async () =>{
    try{
      let response = await axios.get(`http://127.0.0.1:8000/sales/config/`);
      setNewKey(response.data);
      console.log(response.data.publicKey)
    }
    catch(err) {
      console.log(err);
    }
  }
  

  if(loggedIn===false){
    return (
      <div>
        <div>
          <NavbarOne logoutUser={logoutUser} getCartsByUserId={getCartsByUserId} user={user} loggedIn={loggedIn} />
          <Switch>
          <Route path='/login' render={props => <SignIn {...props} user={user} loggedIn={loggedIn} registerUser={registerUser} users={users}
          loginCurrentUser={loginCurrentUser} currentuser={getCurrentUser}/>}/>
          <Route path='/product' render={props => <ProductPage {...props} allProducts={allProducts}  getProductReviews={getProductReviews}  setAllProducts={setAllProducts} allProducts={allProducts}  loggedIn={loggedIn} createReview={createReview} getProductById={getProductById} productById={productById} 
          productImages={filteredImages} getImages={getImageByProductId} updateProduct={updateProduct} user={user} reviews={reviews} />}/>
           <Route path='/' render={props => <ProductTable {...props} allProducts={allProducts} setAllProducts={setAllProducts} getAllProducts={getAllProducts} getAllColors={getAllColors} getAllSizes={getAllSizes} loggedIn={loggedIn} createSize={createSize} createColor={createColor} allSizes={allSizes} allColors={allColors} allProducts={allProducts} getProductReviews={getProductReviews} 
           getCartsByUserId={getCartsByUserId} user={user} userCarts={userCarts} deleteCart={deleteCart}
           createProducts={createProducts} deleteProduct={deleteProduct} createCart={createCart} />}/>
          </Switch>
        </div>
      </div>
    );
  }
  else{
  return (
    <div>
      <div>
        <NavbarOne logoutUser={logoutUser} getCartsByUserId={getCartsByUserId} user={user} loggedIn={loggedIn} />
        <Switch>
        <Route path='/sales' render={props => <DisplaySales {...props} setSales={setSales} sales={sales} setProductSales={setProductSales} productSales={productSales} userCarts={userCarts} allProducts={allProducts} salesTotal={salesTotal} paidOrders={paidOrders} allOrders={allOrders} />}/>
        <Route path='/orders' render={props => <DisplayOrders {...props} getAllOrders={getAllOrders} updateOrder ={updateOrder} unpaidOrders={unpaidOrders} readyOrders={readyOrders} shippedOrders={shippedOrders} allOrders={allOrders} />}/>
    <Route path='/show-cart' render={props => <DisplayCartPage {...props} setNewOrder={setNewOrder} getCartsByUserId={getCartsByUserId} newKey={newKey} cartIds={cartIds} productSales={productSales}  createOrder={createOrder} orderTotal={orderTotal} filteredProductIds={filteredProductIds} allProducts={allProducts}  user={user} userCarts={userCarts} deleteCart={deleteCart} />}/>
      <Route path='/cart' render={props => <AddCart {...props} getCartsByUserId={getCartsByUserId} newKey={newKey} updateProduct={updateProduct} userCarts={userCarts} updateCart={updateCart} productIds={productIds} user={user} createCart={createCart} />}/>
        <Route path='/login' render={props => <SignIn {...props}registerUser={registerUser} users={users}
        loginCurrentUser={loginCurrentUser} currentuser={getCurrentUser}/>}/>
        <Route path='/product' render={props => <ProductPage {...props} createReview={createReview}  setAllProducts={setAllProducts} allProducts={allProducts} getProductById={getProductById} productById={productById} 
        productImages={filteredImages} getImages={getImageByProductId} updateProduct={updateProduct} user={user} reviews={reviews}  getProductReviews={getProductReviews}  />}/>
         <Route path='/' render={props => <ProductTable {...props}setNewOrder={setNewOrder} neworder={newOrder} allProducts={allProducts} setAllProducts={setAllProducts} getAllProducts={getAllProducts} getAllColors={getAllColors} getAllSizes={getAllSizes} createSize={createSize} createColor={createColor} allSizes={allSizes} allColors={allColors} allProducts={allProducts} getProductReviews={getProductReviews} 
         getCartsByUserId={getCartsByUserId} user={user} userCarts={userCarts} deleteCart={deleteCart}
         createProducts={createProducts} deleteProduct={deleteProduct} createCart={createCart} />}/>
        </Switch>
      </div>
    </div>
  );
  }
}

export default App;
