import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Logout from '../Signout';

function NavBars() {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/home">Navbar</Navbar.Brand>
          <Nav className="me-right">
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/myform">Sign In</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
             <Nav.Link ><Logout /></Nav.Link> 
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBars;

