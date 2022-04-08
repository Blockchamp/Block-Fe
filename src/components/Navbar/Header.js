
import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from 'react-router-dom';
import './Header.css'


export const Header = () => {
 
  return (
    <Navbar className="bg-info h5" expand="lg">
      <Container>
        <Navbar.Brand href="/">Nestcoin</Navbar.Brand>
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

export const NavbarHomepage = ({connected, connectWallet, disconnectWallet, account, isAdmin}) => {

  const newAccount = () => {
    if(account !== undefined) {
      return (`${account.slice(0, 8)}.. `)
    }
    
  }


  return (
    <div data-collapse="medium" data-animation="default" data-duration="400" data-easing="ease" data-easing2="ease" role="banner" className="navigation-bar w-nav"><img src="/images/Nestcoin-1024x726.jpg" loading="lazy" width="0" sizes="100vw" srcSet="images/Nestcoin-1024x726-p-500.jpeg 500w, images/Nestcoin-1024x726-p-800.jpeg 800w, images/Nestcoin-1024x726.jpg 1024w" alt="" /><img src="images/Nestcoin-1024x726.jpg" loading="lazy" width="120" height="90" srcSet="images/Nestcoin-1024x726-p-500.jpeg 500w, images/Nestcoin-1024x726-p-800.jpeg 800w, images/Nestcoin-1024x726.jpg 1024w" sizes="120px" alt="" className="image-2" />
          <Link to="/" className="brand-link w-nav-brand "> <img src="/images/nestcoin-logo-big-N.jpg" width="0" alt="Nestcoin Logo" className="image" /> </Link>
          
          <div className="container w-container">
              <div className='d-flex flex-row justify-content-around'>
                  <Link to="/" className="brand-link w-nav-brand "> <img src="/images/nestcoin-logo-big-N.jpg" width="0" alt="Nestcoin Logo" className="image" /> </Link>
                  {
                    connected? <div className='account'><span className="bg-primary text-white p-1">User:</span> <span className="address p-1 text-primary">{newAccount()}</span> </div> : null
                  }
                  
              </div>

              <nav role="navigation" className="navigation-menu w-nav-menu">
              
                  <Link to="/" className="navigation-link w-nav-link">Home</Link>
                  <Link to="/get-tickets" className="navigation-link w-nav-link ">Get Tickets</Link>
                  {
                      //expose admin link only user is an admin
                      connected ? <Link to="/admin" className="navigation-link w-nav-link ">Admin</Link>
                      : null
                  }
                  {
                      //managing displays depending on if connected
                      connected ? 
                          <Link to="#" className="button-2 w-button bg-success">Connected
                      </Link>
                      

                      : <Link to="#" onClick={connectWallet} className="button-2 w-button">Connect Wallet</Link>
                  }
                  
              </nav>
              <div className="hamburger-button w-nav-button">
                  <div className="w-icon-nav-menu"></div>
              </div>
          </div>
    </div>
  )
}

