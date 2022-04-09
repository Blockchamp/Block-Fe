import React, { useRef, useState, useEffect } from "react";
import { NavbarHomepage } from "./Navbar/Header";
import { ethers } from "ethers";
import payment from "../utils/payment.json";

function GetTickets() {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const paymentContractAddress = "0xC8289ddCD0648985BA43d8b043Bf14c124E07B5d";
  const paymentcontractABI = payment.abi;

  const nameRef = useRef();
  const amountRef = useRef();

  useEffect(() => {
    const { ethereum } = window;

    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const paymentContract = new ethers.Contract(
      paymentContractAddress,
      paymentcontractABI,
      signer
    );

    const buyTicket = () => {
      setMessage("");
      setShow(false);
      window.alert("Ticket bought successfully");
    };

    paymentContract.on("BuyTicket", buyTicket);

    return () => {
      if (paymentContract) {
        paymentContract.off("BuyTicket", buyTicket);
      }
    };
  }, [setShow]);

  const buyTicket = async (evt) => {
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

        const name = nameRef.current.value;
        const etherAmount = amountRef.current.value;

        const BuyTxn = await paymentContract.buyTicket(name, {
          gasLimit: 300000,
          value: ethers.utils.parseEther(etherAmount),
        });

        amountRef.current.value = "";
        nameRef.current.value = "";
        console.log("Mining...", BuyTxn.hash);
        setMessage("Transaction in progress");
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      amountRef.current.value = "";
      nameRef.current.value = "";
      //setLoading3(false);
      setShow(false);
      console.log(error);
    }
  };
  return (
    <div>
      {/* Nav */}
      <NavbarHomepage />
      {/* End Nav */}

      <div className="section wf-section">
        <div className="w-container">
          <div className="section-title-group">
            <h2 className="section-heading centered">BUY A TICKET</h2>
          </div>
          <div className="form-wrapper w-form">
            <form>
              <input
                type="text"
                className="form-field w-input"
                maxlength="256"
                ref={nameRef}
                placeholder="Name"
              />
              <input
                type="text"
                className="form-field w-input"
                maxlength="256"
                name="Ticket-Amount"
                data-name="Ticket Amount"
                placeholder="Amount due "
                id="Ticket-Amount"
                ref={amountRef}
              />
              <div style={{ color: "green" }}>
                {show === true ? message : ""}
              </div>
              <button
                onClick={buyTicket}
                className="button full-width w-button"
              >
                GET TICKETS
              </button>
            </form>
            <div className="w-form-done">
              <p>Thank you!</p>
            </div>
            <div className="w-form-fail">
              <p>Oops! Something went wrong while submitting the form :(</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}

      <div className="footer wf-section">
        <div className="w-container">
          <div className="w-row">
            <div className="spc w-col w-col-6">
              <h5>NESTCOIN CINEMAS</h5>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse varius enim in eros elementum tristique. Duis
                cursus, mi quis viverra ornare, eros dolor interdum nulla, ut
                commodo diam libero vitae erat.
              </p>
            </div>
            <div className="spc w-col w-col-6">
              <h5>useful links</h5>
              <a href="#" className="footer-link">
                Advertise with us
              </a>
              <a href="#" className="footer-link">
                Tickets
              </a>
              <a href="#" className="footer-link">
                Link
              </a>
              <a href="#" className="footer-link">
                Link
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="footer center wf-section">
        <div className="w-container">
          <div className="footer-text">Copyright © Nestcoin Cinemas 2022.</div>
        </div>
      </div>
    </div>
  );
}

export default GetTickets;
