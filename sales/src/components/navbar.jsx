import React from 'react'
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";


const NavbarOne = () => (
    <Navbar bg="light" expand="lg">
    <Navbar.Brand href="/">Home</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
        <Nav.Link href="/login">Login</Nav.Link>
      </Nav>
    </Navbar.Collapse>
</Navbar>
  )
  
export default NavbarOne