import React, { useState, useEffect, useRef } from "react";
import "./Dashboard.css";
import Message from "../Alert/Alert";
import { BigNumber, ethers } from "ethers";
import erc20 from "../../utils/erc20.json";
import payment from "../../utils/payment.json";
import readXlsxFile from "read-excel-file";

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
  const paymentContractAddress = "0xC8289ddCD0648985BA43d8b043Bf14c124E07B5d";
  const erc20contractABI = erc20.abi;
  const paymentcontractABI = payment.abi;

  const addressRef = useRef();
  const addressRef1 = useRef();
  const tokenRef1 = useRef();
  const tokenRef2 = useRef();
  const tokenRef = useRef();
  const excelRef = useRef();

  const [token, setToken] = useState(0);
  const [ethBalance, setEthBalance] = useState(0);
  const [totalReward, setTotalReward] = useState(0);
  const [customers, setCustomer] = useState(0);

  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);
  const [show4, setShow4] = useState(false);
  const [message, setMessage] = useState("");
  const [message1, setMessage1] = useState("");
  const [message2, setMessage2] = useState("");
  const [message3, setMessage3] = useState("");
  const [message4, setMessage4] = useState("");
  const [stat, setStat] = useState();

  //mount react
  useEffect(() => {
    setTimeout(() => setShow(false), 3000);
  }, [show1]);

  useEffect(() => {
    getTokens();
    getEth();
    getTokenAwarded();
    getCustomersAwarded();
    checkAdmin();
  }, []);

  useEffect(() => {
    const { ethereum } = window;
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const paymentContract = new ethers.Contract(
      paymentContractAddress,
      paymentcontractABI,
      signer
    );

    const tokenSent = () => {
      setShow1(false);
      setMessage1("");
      window.alert("Token sent successfully");
      getTokens();
      getEth();
      getTokenAwarded();
      getCustomersAwarded();
      checkAdmin();
    };

    const tokenSentMany = () => {
      setShow2(false);
      setShow3(false);
      setMessage2("");
      setMessage3("");
      tokenRef1.current.value = "";
      tokenRef2.current.value = "";
      addressRef1.current.value = "";
      window.alert("Token sent successfully");
      getTokens();
      getEth();
      getTokenAwarded();
      getCustomersAwarded();
      checkAdmin();
    };

    paymentContract.on("SendToken", tokenSent);
    paymentContract.on("SendManyToken", tokenSentMany);

    return () => {
      if (paymentContract) {
        paymentContract.off("SendToken", tokenSent);
        paymentContract.off("SendManyToken", tokenSentMany);
      }
    };
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
        setShow1(true);
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
        setMessage1("Transaction in Progress", BuyTxn.hash);
      } else {
        setShow1(false);
        window.alert("An error occured, unable to send token");
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      addressRef.current.value = "";
      tokenRef.current.value = "";
      window.alert("An error occured, unable to send token");
      //setLoading3(false);
      console.log(error);
    }
  };

  const getEth = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        //setLoading(true);
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const paymentContract = new ethers.Contract(
          paymentContractAddress,
          paymentcontractABI,
          signer
        );

        const eth = await paymentContract.getEthAmount();

        setEthBalance(Number(BigNumber.from(eth).toString()) / 10 ** 18);
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

  const getTokenAwarded = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        //setLoading(true);
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const paymentContract = new ethers.Contract(
          paymentContractAddress,
          paymentcontractABI,
          signer
        );

        const tokens = await paymentContract.getTokenAwarded();

        setTotalReward(Number(BigNumber.from(tokens).toString()) / 10 ** 18);
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

  const getCustomersAwarded = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        //setLoading(true);
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const paymentContract = new ethers.Contract(
          paymentContractAddress,
          paymentcontractABI,
          signer
        );

        const tokens = await paymentContract.getCustomersAwarded();

        setCustomer(Number(BigNumber.from(tokens).toString()));
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

  const ex = async (evt) => {
    setShow2(true);
    evt.preventDefault();
    let addrList = [];
    readXlsxFile(excelRef.current.files[0]).then(async (rows) => {
      console.log(rows);
      rows.map((item, index) => {
        if (index > 0) {
          addrList.push(item[1]);
        }
      });

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

          const tokenAmount = tokenRef2.current.value;

          const BuyTxn = await paymentContract.sendToMultiple(
            addrList,
            ethers.utils.parseEther(tokenAmount),
            {
              gasLimit: 300000,
            }
          );

          console.log("Mining...", BuyTxn.hash);
          setMessage2("Transaction in progress", BuyTxn.hash);
        } else {
          console.log("Ethereum object doesn't exist!");
        }
      } catch (error) {
        //setLoading3(false);
        setShow2(false);
        tokenRef2.current.value = "";
        window.alert("An error occurred, unable to send token");
        console.log(error);
      }
      // `rows` is an array of rows
      // each row being an array of cells.
    });
  };

  const sendCommaTokens = async (evt) => {
    evt.preventDefault();
    setShow3(true);
    const addresses = addressRef1.current.value;
    const addList = addresses.split(",");
    console.log(addList);
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

        const tokenAmount = tokenRef1.current.value;
        console.log(tokenAmount);

        const BuyTxn = await paymentContract.sendToMultiple(
          addList,
          ethers.utils.parseEther(tokenAmount),
          {
            gasLimit: 300000,
          }
        );

        console.log("Mining...", BuyTxn.hash);
        setMessage3("Transaction in progress", BuyTxn.hash);
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      //setLoading3(false);
      setShow3(false);
      window.alert("An error occured, unable to send token");
      tokenRef1.current.value = "";
      addressRef1.current.value = "";
      console.log(error);
    }
  };

  const checkAdmin = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        //setLoading(true);
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const paymentContract = new ethers.Contract(
          paymentContractAddress,
          paymentcontractABI,
          signer
        );

        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });

        const check = await paymentContract.adminAddresses(accounts[0]);

        if (check === false) {
          window.alert("You are not an admin");
          window.location.href = "/";
        }

        //setTotalReward(Number(BigNumber.from(tokens).toString()) / 10 ** 18);
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

  const withdraw = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        //setLoading(true);
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const paymentContract = new ethers.Contract(
          paymentContractAddress,
          paymentcontractABI,
          signer
        );

        const eth = await paymentContract.withdraw();
        console.log(eth);
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const withdraw1 = () => {
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
                <Card.Title as="h3">Send Token to Address</Card.Title>
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
                  <div style={{ color: "green" }}>
                    {show1 === true ? message1 : ""}
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
          <Col className="reward mb-5">
            <Card className="reward-card">
              <Card.Header className="card-title bg-info text-light mb-3">
                <Card.Title as="h3">
                  Send Token to Multiple Address (EXCEL)
                </Card.Title>
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
                      ref={tokenRef2}
                      type="number"
                      placeholder="NST Token"
                      classNameName="form-control"
                    />
                  </div>
                  <div className="d-flex flex-column">
                    <label className=" mb-1 form-label">Wallet Addresses</label>
                    <input
                      type="file"
                      name="upload"
                      id="upload"
                      ref={excelRef}
                    />
                  </div>
                  <div style={{ color: "green" }}>
                    {show2 === true ? message2 : ""}
                  </div>
                  <Button className="mt-4" onClick={ex} variant="warning">
                    Send Reward Token
                  </Button>
                </form>
              </Card.Body>
            </Card>
          </Col>
          <Col className="reward mb-5">
            <Card className="reward-card">
              <Card.Header className="card-title bg-info text-light mb-3">
                <Card.Title as="h3">
                  Send Token to Multiple Address (comma sperated)
                </Card.Title>
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
                      ref={tokenRef1}
                      type="number"
                      placeholder="NST Token"
                      classNameName="form-control"
                    />
                  </div>
                  <div className="d-flex flex-column">
                    <label className=" mb-1 form-label">Wallet Addresses</label>

                    <textarea
                      ref={addressRef1}
                      className="my-4"
                      placeholder="Address"
                      classNameName="form-control"
                      style={{ height: "100px" }}
                    ></textarea>
                  </div>
                  <div style={{ color: "green" }}>
                    {show3 === true ? message3 : ""}
                  </div>
                  <Button
                    className="mt-4"
                    onClick={sendCommaTokens}
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
