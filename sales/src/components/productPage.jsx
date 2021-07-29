import React, {useEffect, useState} from 'react';
import {Link, withRouter} from 'react-router-dom';
import Table from "react-bootstrap/Table";



function ProductPage(props) {
console.log(props.history.location.query.product)

    return(
        <div>
          <Table>
                <thead>
                    <tr>
                        <th> </th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Ave Rating</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><img src="images/hat.jpg"  width="150" height="100"/></td>
                        <td>{props.history.location.query.product.name}</td>
                        <td>{props.history.location.query.product.description}</td>
                        <td>${props.history.location.query.product.price}.00</td>
                        <td>{props.history.location.query.product.ave_rating}</td>
                        <td>{props.history.location.query.product.quantity}</td>
                        </tr>
                </tbody>
            </Table>
        </div>
    );

}
export default withRouter(ProductPage);