import React, {useEffect, useState} from "react";
import Table from "react-bootstrap/Table";
import {withRouter, Switch, Link, Redirect} from 'react-router-dom';


function ProductTable(props) {
        console.log(props);
        
        let products = props.allProducts.map((product) => {
            console.log(product)
            return <tr key={product.id}>
                <img src={product.main_image}  width="150" height="100"/>
                <td>{product.name}</td>
                <td>${product.price}.00</td>
                <Link to={{pathname: '/product', query:{product:product}}}>Details</Link>
            </tr>
        });
        return (
            <div>
                <Table>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products}
                    </tbody>
                </Table>
            </div>
        )
    
}

export default withRouter (ProductTable);