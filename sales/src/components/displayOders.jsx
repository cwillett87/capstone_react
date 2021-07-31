import React, { useEffect,useState } from 'react';
import {withRouter, Redirect} from 'react-router-dom';
import Table from "react-bootstrap/Table";
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
            <h4>Unpaid Orders</h4>
            <Table>
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
            <br/>
            <h4>Orders ready to ship</h4>
            <Table>
                <thead>
                    <tr>
                        <th>User</th>
                        <th>Tracking</th>
                        <th>Total</th>
                        <th>status</th>
                    </tr>
                </thead>
                <tbody>
                        {ready}
                </tbody>
            </Table>
            
            <br/>
            <h4>Shipped Orders</h4>
            <Table>
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
        </div>
    )
    }
}
export default withRouter(DisplayOrders);