import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import './AdminChange.css';
import NavBar from '../Navbar/Header'
import Footer from "../Footer/Footer";

const AdminChange = () => {
    return(
        <div>
                    <div className="admin-container bg-light">
            <NavBar />
            <Form className="admin-form">
                
                <Form.Group className="mb-3 mx-3" >
                    <p className=" h3">ADMINISTRATOR</p>
                    <hr className="mb-5"></hr>
                    <Form.Label className="mb-4 h6">New Admin?</Form.Label>
                    <div className=" d-flex mb-5">
                        <Form.Control type="text" className="mr-2" placeholder="Public Address" />
                        <Button className="mx-1" variant="primary" type="submit">
                            Add 
                        </Button>
                    </div>
                    <Form.Text className="text-danger  h4">
                        NB: Be careful who you give access to admin, they can access your funds.
                    </Form.Text>
                </Form.Group>

               
                <Form.Group className="mb-3" >

                </Form.Group>
                
            </Form>
            
        </div>
        <Footer />
        </div>

    )
}

export default AdminChange;