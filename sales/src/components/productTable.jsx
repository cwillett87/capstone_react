import React, {useEffect, useState} from "react";
import Table from "react-bootstrap/Table";
import {Route, Switch, Link, Redirect} from 'react-router-dom';
import Image from "./image";


function ProductTable(props) {
        console.log(props);
        
        let products = props.allProducts.map((product) => {
            return <tr key={product.id}>
                <Image productImages={props.productImages} getImages={props.getImages} productId={product.id} />
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

export default ProductTable;