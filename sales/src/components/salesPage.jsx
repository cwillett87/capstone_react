import React, { useEffect,useState } from 'react';
import {withRouter, Redirect} from 'react-router-dom';
import {Table, Container} from "react-bootstrap";
import {Line} from 'react-chartjs-2'

function DisplaySales(props){
    console.log(props.paidOrders)
    console.log(props.userCarts)
    const [chartData, setChartData] = useState([])

useEffect(() => {
    chart()
},[])

    const chart = () => {
        setChartData({
            labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            datasets: [
                {
                    label: 'Sales',
                    data: [props.sales,props.sales],
                    backgroundColor: [
                        'blue'
                    ],
                    borderWidth:4
                }
            ]
        })
    }

    if(props.paidOrders[0] === undefined){
        return null
    }
    else{
        if(props.paidOrders.length === 1){
            let paid = props.paidOrders[0].shopping_carts.map((order)=>{
                let total = 0
                let sale = order.product_Id.price * order.quantity
                total += sale
                return <tr>
                    <td>{order.product_Id.name}</td>
                    <td>{order.product_Id.price}</td>
                    <td>{order.quantity}</td>
                    <td>${total}.00</td>
                </tr>
            })
            let inventory = props.allProducts.map((product)=>{
                return <tr>
                    <td>{product.name}</td>
                    <td>{product.ave_rating}</td>
                    <td>{product.quantity}</td>
                </tr>
            })

        return(
            <div>
                <br/>
                <center>
                    <div style={{height:'300px',width:'500px'}}>
                        <Line data={chartData} options={{
                            responsive: true
                        }} />
                    </div>
                <h4>Total Sales: ${props.salesTotal}</h4>
                </center>
                 <br/>
                 <Container>
                <h4>Product Sales</h4>
                <Table bordered variant='dark'>
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paid}
                    </tbody>
                </Table>
                </Container>
                <br/>
                <Container>
                <h4>Returns</h4>
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
                    
                    </tbody>
                </Table>
                </Container>
                <br/>
                <Container>
                <h4>Inventory</h4>
                <Table bordered variant='dark'>
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Ave Rating</th>
                            <th>Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {inventory}
                    </tbody>
                </Table>
                </Container>
            </div>
        )
        }
        else{
            
            let totals =[]
            let allQuantitys = []
            for(let i=0;i<props.paidOrders.length;i++)
             props.paidOrders[i].shopping_carts.map((order)=>{
                
                let total = 0
                let sale = order.product_Id.price * order.quantity
                
                total += sale
                totals.push(total)
                allQuantitys.push(order.quantity)
                const combo = {
                    'order': order.product_Id,
                    'total': total,
                    'quantity':order.quantity
                }
                props.productSales.push(combo)
             })
             console.log(totals)
                console.log(props.productSales )
                let divide = props.productSales.length / 2
                let sliced = props.productSales.slice(0,divide)
                console.log(sliced )
                
                let range = sliced.map((product)=>{
                     
                return<tr>
                    <td>{product.order.name}</td>
                    <td>{product.order.price}</td>
                    <td>{product.quantity}</td>
                    <td>${product.total}</td>
                </tr>
        
            })

            let inventory = props.allProducts.map((product)=>{
                return <tr>
                    <td>{product.name}</td>
                    <td>{product.ave_rating}</td>
                    <td>{product.quantity}</td>
                </tr>
            })
            return(
                <div>
                    <br/>
                    <center>
                    <div style={{height:'300px',width:'500px'}}>
                        <Line data={chartData} options={{
                            responsive: true
                        }} />
                    </div>
                <h4>Total Sales: ${props.salesTotal}</h4>
                </center>
                 <br/>
                 <Container>
                <h4>Product Sales</h4>
                <Table bordered variant='dark'>
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {range}
                    </tbody>
                </Table>
                </Container>
                <br/>
                <Container>
                <h4>Returns</h4>
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
                    
                    </tbody>
                </Table>
                </Container>
                <br/>
                <Container>
                <h4>Inventory</h4>
                <Table bordered variant='dark'>
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Ave Rating</th>
                            <th>Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {inventory}
                    </tbody>
                </Table>
                </Container>
                </div>
            )
            
        }
    }
}
export default withRouter(DisplaySales);