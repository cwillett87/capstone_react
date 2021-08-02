import React from 'react'
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { Link} from 'react-router-dom';

const NavbarOne = (props) => (
    <Navbar bg="light" expand="lg">
    <Navbar.Brand as={Link} to="/">Home</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
        <Nav.Link href="/login">Login</Nav.Link>
        <Nav.Link href="/" onClick={()=>{props.logoutUser()}}>Logout</Nav.Link>
        <Nav.Link as={Link} to="/show-cart">View Cart</Nav.Link>
        <Nav.Link as={Link} to="/orders">Orders</Nav.Link>
        <Nav.Link as={Link} to="/sales">Sales</Nav.Link>
      </Nav>
    </Navbar.Collapse>
</Navbar>
  )
  
export default NavbarOne