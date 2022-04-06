
import React from "react";
import { Navbar, Container, Nav, Link } from "react-bootstrap";


const Header = () => {
 
  return (
    <Navbar className="bg-info h6" expand="lg">
      <Container>
        <Navbar.Brand href="/admin">Nestcoin</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">

            <Nav.Link href="/admin">Rewards</Nav.Link>
            <Nav.Link href="/admin/add">New Admin</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
