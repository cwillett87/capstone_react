import React, { useEffect,useState } from 'react';
import {withRouter, Redirect} from 'react-router-dom';
import {Table, Container} from "react-bootstrap";
import Tracking from './updateTrackking'

function DisplayOrders(props){
    console.log(props.allOrders)
    if(props.allOrders === undefined){
        return null
    }
    else{
        let ready = props.readyOrders.map((order)=>{
            return <tr>
                <td>{order.user_Id.username}</td>
                <td>{order.tracking_number}</td>
                <td>{order.total}</td>
                <td>Paid</td>
                <Tracking updateOrder ={props.updateOrder} order={order} />
            </tr>
        })
        let shipped = props.shippedOrders.map((order)=>{
            return <tr>
                <td>{order.user_Id.username}</td>
                <td>{order.tracking_number}</td>
                <td>{order.total}</td>
                <td>Shipped</td>
            </tr>
        })
        let unpaid = props.unpaidOrders.map((order)=>{
            return <tr>
                <td>{order.user_Id.username}</td>
                <td>{order.tracking_number}</td>
                <td>{order.total}</td>
                <td>Not Paid</td>
            </tr>
        })
    return(
        <div>
             <br/>
             <Container>
            <h4>Unpaid Orders</h4>
            <Table bordered variant='dark'>
                <thead>
                    <tr>
                        <th>User</th>
                        <th>Tracking</th>
                        <th>Total</th>
                        <th>status</th>
                    </tr>
                </thead>
                <tbody>
                        {unpaid}
                </tbody>
            </Table>
            </Container>
            <br/>
            <Container>
            <h4>Orders ready to ship</h4>
            <Table bordered variant='dark'>
                <thead>
                    <tr>
                        <th>User</th>
                        <th>Tracking</th>
                        <th>Total</th>
                        <th>status</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                        {ready}
                </tbody>
            </Table>
            </Container>
            <br/>
            <Container>
            <h4>Shipped Orders</h4>
            <Table bordered variant='dark'>
                <thead>
                    <tr>
                        <th>User</th>
                        <th>Tracking</th>
                        <th>Total</th>
                        <th>status</th>
                    </tr>
                </thead>
                <tbody>
                        {shipped}
                </tbody>
            </Table>
            </Container>
        </div>
    )
    }
}
export default withRouter(DisplayOrders);