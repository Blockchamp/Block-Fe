import React, { useState, useRef, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import "./AdminChange.css";
import { Header } from "../Navbar/Header";
import Footer from "../Footer/Footer";
import Message from "../Alert/Alert";
import { ethers } from "ethers";
import payment from "../../utils/payment.json";

const AdminChange = () => {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState();
  const [stat, setStat] = useState();

  const paymentContractAddress = "0xC8289ddCD0648985BA43d8b043Bf14c124E07B5d";
  const paymentcontractABI = payment.abi;

  const addressRef = useRef();

  // const [_addr, setAddress] = useState()
  useEffect(() => {
    const { ethereum } = window;
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const paymentContract = new ethers.Contract(
      paymentContractAddress,
      paymentcontractABI,
      signer
    );

    const addAdmin = () => {
      setMessage("");
      setShow(false);
      window.alert("Address is now an admin");
    };

    const removeAdmin = () => {
      setMessage("");
      setShow(false);
      window.alert("Address is no longer an admin");
    };

    paymentContract.on("AddAdmin", addAdmin);
    paymentContract.on("RemoveAdmin", removeAdmin);

    return () => {
      if (paymentContract) {
        paymentContract.off("AddAdmin", addAdmin);
        paymentContract.off("RemoveAdmin", removeAdmin);
      }
    };
  }, []);

  const addAdmin = async (evt) => {
    evt.preventDefault();
    setShow(true);
    try {
      const { ethereum } = window;

      if (ethereum) {
        //setLoading3(true);
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const paymentContract = new ethers.Contract(
          paymentContractAddress,
          paymentcontractABI,
          signer
        );

        const addr = addressRef.current.value;

        const BuyTxn = await paymentContract.addAdmin(addr, {
          gasLimit: 300000,
        });

        addressRef.current.value = "";

        console.log("Mining...", BuyTxn.hash);
        setMessage("Transaction in progress", String(BuyTxn.hash));
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      addressRef.current.value = "";
      setShow(false);
      //setLoading3(false);
      console.log(error);
    }
  };

  const removeAdmin = async (evt) => {
    setShow(true);
    evt.preventDefault();
    try {
      const { ethereum } = window;

      if (ethereum) {
        //setLoading3(true);
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const paymentContract = new ethers.Contract(
          paymentContractAddress,
          paymentcontractABI,
          signer
        );

        const addr = addressRef.current.value;

        const BuyTxn = await paymentContract.removeAdmin(addr, {
          gasLimit: 300000,
        });

        addressRef.current.value = "";

        console.log("Mining...", BuyTxn.hash);
        setMessage("Transaction in progress");
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      addressRef.current.value = "";
      setShow(false);
      //setLoading3(false);
      console.log(error);
    }
  };

  return (
    <div>
      <div className="admin-container bg-light">
        <Header />
        <Message show={show} stat={stat} message={message} />
        <Form className="admin-form">
          <Form.Group className="mb-3 mx-3">
            <p className=" h3">ADMINISTRATOR</p>
            <hr className="mb-5"></hr>
            <Form.Label className="mb-4 h6">New Admin?</Form.Label>
            <div className=" d-flex mb-5">
              <Form.Control
                type="text"
                className="mr-2"
                placeholder="Public Address"
                ref={addressRef}
              />
              <div style={{ color: "green" }}></div>
              <Button
                onClick={addAdmin}
                className="mx-1"
                variant="success"
                type="submit"
              >
                Add
              </Button>
              <Button
                onClick={removeAdmin}
                className="mx-1"
                variant="danger"
                type="submit"
              >
                Delete
              </Button>
            </div>
            <Form.Text className="text-danger  h4">
              NB: Be careful who you give access to admin, they can access your
              funds.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3"></Form.Group>
        </Form>
      </div>
      <Footer />
    </div>
  );
};

export default AdminChange;
