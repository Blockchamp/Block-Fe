import React, { useState, useEffect, useRef } from "react";
import "./Dashboard.css";
import Message from "../Alert/Alert";
import { BigNumber, ethers } from "ethers";
import erc20 from "../../utils/erc20.json";
import payment from "../../utils/payment.json";

import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
} from "react-bootstrap";

const Dashboard = () => {
  //hold the amount of token to be sent
  //initializing ETH balance
  const erc20ContractAddress = "0x5C672245e1046f4c302dec348f10Df09E45e855b";
  const paymentContractAddress = "0xa838e2A1bD2813E5B3C45DEFaBA6685c069707c5";
  const erc20contractABI = erc20.abi;
  const paymentcontractABI = payment.abi;

  const addressRef = useRef();
  const tokenRef = useRef();

  const [token, setToken] = useState(0);
  const [ethBalance, setEthBalance] = useState(0);
  const [totalReward, setTotalReward] = useState(0);
  const [customers, setCustomer] = useState(0);

  const [show, setShow] = useState(false);
  const [message, setMessage] = useState();
  const [stat, setStat] = useState();

  //mount react
  useEffect(() => {
    setTimeout(() => setShow(false), 3000);
  }, [show]);

  useEffect(() => {
    getTokens();
  }, []);

  const getTokens = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        //setLoading(true);
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const erc20Contract = new ethers.Contract(
          erc20ContractAddress,
          erc20contractABI,
          signer
        );

        const tokens = await erc20Contract.balanceOf(paymentContractAddress, {
          gasLimit: 300000,
        });

        setToken(Number(BigNumber.from(tokens).toString()) / 10 ** 18);
        //setStacked(Number(BigNumber.from(tokenStaked).toString()) / 10 ** 18);
        //setToken(Number(BigNumber.from(tokenBalance).toString()) / 10 ** 18);
        //setLoading(false);
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const sendToken = async () => {
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
        const tokenAmount = tokenRef.current.value;

        const BuyTxn = await paymentContract.sendToken(
          addr,
          ethers.utils.parseEther(tokenAmount),
          {
            gasLimit: 300000,
          }
        );

        addressRef.current.value = "";
        tokenRef.current.value = "";
        console.log("Mining...", BuyTxn.hash);
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      addressRef.current.value = "";
      tokenRef.current.value = "";
      //setLoading3(false);
      console.log(error);
    }
  };

  //handling token amount
  const onTokenChange = (e) => {
    setToken(e.target.value);
  };

  const sendTokens = (e) => {
    e.preventDefault();
    //handle batching function here
    //dummy messages
    setShow(true);
    setMessage("Hello");
    setStat("danger");
  };

  const withdraw = () => {
    //handle ETH withdrawal here
    //dummy messages
    setShow(true);
    setMessage("Success");
    setStat("success");
  };
  return (
    <>
      <Container fluid>
        <Row className="row">
          <Col lg="3" sm="6" xs="12" className="col mb-4">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className=" text-warning bi bi-coin xlg"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <Card.Title as="h6">{token} NST</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer className="card-footer bg-info">
                <hr></hr>
                <div className="card-category">
                  <p>Tokens</p>
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col lg="3" sm="6" xs="12" className="col mb-4">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="bi bi-cash-coin text-success"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <Card.Title as="h6">{ethBalance} ETH</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer className="card-footer bg-info">
                <hr></hr>
                <div className="card-category">
                  <p>Revenue</p>
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col lg="3" sm="6" xs="12" className="col mb-4">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i class="bi bi-coin text-danger"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <Card.Title as="h6">{totalReward} NST</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer className="card-footer bg-info">
                <hr></hr>
                <div className="card-category">
                  <p>Tokens Awarded</p>
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col lg="3" sm="6" xs="12" className="col mb-4">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="bi bi-people text-primary"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <Card.Title as="h6">{customers}</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer className="card-footer bg-info">
                <hr></hr>
                <div className="card-category">
                  <p>Customers</p>
                </div>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
        <hr></hr>
        <Message show={show} stat={stat} message={message} />
        <Row>
          <Col className="reward mb-5">
            <Card className="reward-card">
              <Card.Header className="card-title bg-info text-light mb-3">
                <Card.Title as="h3">AWESOME REWARD</Card.Title>
                <i className="font-italic">
                  Our customers deserve some accolades!
                </i>
              </Card.Header>
              <Card.Body>
                <form className="reward-form">
                  <div className="d-flex flex-column">
                    <label className=" mb-1 form-label">Amount</label>
                    <input
                      className="my-4"
                      ref={tokenRef}
                      type="number"
                      placeholder="NST Token"
                      classNameName="form-control"
                    />
                  </div>
                  <div className="d-flex flex-column">
                    <label className=" mb-1 form-label">Wallet Address</label>
                    <input
                      ref={addressRef}
                      className="my-4"
                      placeholder="Address"
                      classNameName="form-control"
                    />
                  </div>
                  <Button
                    className="mt-4"
                    onClick={sendToken}
                    variant="warning"
                  >
                    Send Reward Token
                  </Button>
                </form>
              </Card.Body>
            </Card>
          </Col>
          <Col className=" withraw mb-5">
            <Card className="withdraw-card">
              <Card.Header className="card-title bg-info text-light mb-3">
                <Card.Title as="h3">PAYOUT</Card.Title>
              </Card.Header>
              <Card.Body className="withdraw-form">
                <div className="d-flex flex-column  justify-content-between">
                  <i className="h5 mb-5">Confirm Payment...</i>
                  <Button
                    className="align-items-end mt-5"
                    onClick={withdraw}
                    variant="success"
                  >
                    Withdraw
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Dashboard;
