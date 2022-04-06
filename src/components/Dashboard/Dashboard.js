import React, {useState, useEffect} from "react";
import './Dashboard.css'
import Message from "../Alert/Alert";

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
  const [token, setToken] = useState(0);
  const [ethBalance, setEthBalance] = useState(0);
  const [totalReward, setTotalReward] = useState(0);
  const [customers, setCustomer] = useState(0);


  const [show, setShow] = useState(false)
  const [message, setMessage] = useState()
  const [stat, setStat] = useState()

  //mount react 
  useEffect(() => {
    setTimeout(() => setShow(false), 3000)
  }, [show])
  

  //handling token amount
  const onTokenChange = (e) => {
      setToken(e.target.value)
  }



  const sendTokens = (e) => {

      e.preventDefault()
      //handle batching function here
      //dummy messages
      setShow(true)
      setMessage("Hello")
      setStat("danger")
  }

  const withdraw = () => {
    //handle ETH withdrawal here
    //dummy messages
    setShow(true)
    setMessage("Success")
    setStat("success")
  }
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
          <Col lg="3" sm="6"  xs="12" className="col mb-4">
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
                <i className="font-italic">Our customers deserve some accolades!</i>
              </Card.Header>
              <Card.Body>
                <form className='reward-form'>
                  <div className="d-flex flex-column">
                      <label className=" mb-1 form-label">Amount</label>
                      <input onChange={onTokenChange} className="my-4" type="number" placeholder="NST Token" value={token} classNameName="form-control"  />
                  </div>
                  <Button className='mt-4' onClick={sendTokens} variant="warning" >
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
              <Card.Body  className='withdraw-form'>
                <div className="d-flex flex-column  justify-content-between">
                  <i className="h5 mb-5">Confirm Payment...</i>
                  <Button className='align-items-end mt-5' onClick={withdraw} variant="success" >
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
}

export default Dashboard;
