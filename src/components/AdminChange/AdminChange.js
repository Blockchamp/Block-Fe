import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import './AdminChange.css';
import NavBar from '../Navbar/Header'
import Footer from "../Footer/Footer";
import Message from "../Alert/Alert";

const AdminChange = () => {

    const [show, setShow] = useState(false)
    const [message, setMessage] = useState()
    const [stat, setStat] = useState()

    // const [_addr, setAddress] = useState()
    
    const addAdmin = async () => {

        try {

        //contract
        //contract.addAdmins(_addr) function
        // setMessage('success');
        // setShow(true);
        // setStat('success')
        
        } catch (error) {
        // setMessage("failed");
        // setShow(true);
        // setStat('danger')
        }
    }

    const deleteAdmin = async () => {
        try {

            //contract
            //contract.deleteAdmins(_addr) function
            // setMessage('success');
            // setShow(true);
            // setStat('success')
            
            } catch (error) {
            // setMessage("failed");
            // setShow(true);
            // setStat('danger')
            }
    }
    return(
        <div>
            <div className="admin-container bg-light">
                <NavBar />
                <Message show={show} stat={stat} message={message} />
                <Form className="admin-form">
                    
                    <Form.Group className="mb-3 mx-3" >
                        <p className=" h3">ADMINISTRATOR</p>
                        <hr className="mb-5"></hr>
                        <Form.Label className="mb-4 h6">New Admin?</Form.Label>
                        <div className=" d-flex mb-5">
                            <Form.Control type="text" className="mr-2" placeholder="Public Address" />
                            <Button onClick={addAdmin} className="mx-1" variant="success" type="submit">
                                Add 
                            </Button>
                            <Button onClick={deleteAdmin} className="mx-1" variant="danger" type="submit">
                                Delete 
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