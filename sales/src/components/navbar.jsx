import React from 'react'
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { Link} from 'react-router-dom';

const NavbarOne = (props) => {
  if(props.loggedIn===false){
    return(
      <Navbar bg="danger" expand="lg">
      <Navbar.Brand style={{textDecoration: 'none', color: 'white'}} as={Link} to="/">Home</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link style={{textDecoration: 'none', color: 'white'}}as={Link} to="/login">Login</Nav.Link>
        </Nav>
      </Navbar.Collapse>
  </Navbar>
    )
  }
  if(props.loggedIn===true && props.user.role==='customer'){
    return(
      <Navbar bg="danger" expand="lg">
      <Navbar.Brand style={{textDecoration: 'none', color: 'white'}} as={Link} to="/">Home</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link style={{textDecoration: 'none', color: 'white'}} as={Link} to="/show-cart">View Cart</Nav.Link>
          <Nav.Link style={{textDecoration: 'none', color: 'white'}} as={Link} to="/" onClick={()=>{props.logoutUser()}}>Logout</Nav.Link>
        </Nav>
      </Navbar.Collapse>
  </Navbar>
    )
  }
  else{
  return(
    <Navbar bg="danger" expand="lg">
    <Navbar.Brand style={{textDecoration: 'none', color: 'white'}} as={Link} to="/">Home</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
        <Nav.Link style={{textDecoration: 'none', color: 'white'}} as={Link} to="/login">Register</Nav.Link>
        <Nav.Link style={{textDecoration: 'none', color: 'white'}} as={Link} to="/show-cart">View Cart</Nav.Link>
        <Nav.Link style={{textDecoration: 'none', color: 'white'}} as={Link} to="/orders">Orders</Nav.Link>
        <Nav.Link style={{textDecoration: 'none', color: 'white'}} as={Link} to="/sales">Sales</Nav.Link>
        <Nav.Link style={{textDecoration: 'none', color: 'white'}} as={Link} to="/" onClick={()=>{props.logoutUser()}}>Logout</Nav.Link>
      </Nav>
    </Navbar.Collapse>
</Navbar>
  )
  }
}

export default NavbarOne