import React, {useState} from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Setting from './components/Setting/Settings';
import AdminChange from './components/AdminChange/AdminChange';
import HomePage from './components/HomePage';
import GetTickets from './components/GetTickets';
import { isAddress } from 'ethers/lib/utils';


function App() {
  const [userAccount, setUserAccount] = useState();
  const [connected, setConnected] = useState(false);
  const [isAdmin, setIsAdmin] = useState(true);


  const connectWallet = () => {
    if(window.ethereum) {
      window.ethereum.request({
        method: 'eth_requestAccounts'
      })
      .then(res => {
        
        setUserAccount(res[0])
        setConnected(true)

        //checks if address is an admin
        // if(aaray of isAddress.includes(account[0])) {
        //   setIsAdmin(true)
        // } else {
        //   setIsAdmin(false)
        // }
  
      })
      
      .catch(err => console.err)
    } else {
      console.log("install metamask")
    }
  }

  //disconnect the wallet
  //not working yet
  const disconnectWallet = () => {
    setUserAccount('')
    setConnected(false)
  }

  return (
    <div className="setting_page">
      <Switch>
        <Route exact path="/">
          <HomePage connected={connected} isAdmin={isAdmin} account ={userAccount} disconnectWallet={disconnectWallet}  connectWallet={connectWallet}/>
        </Route>
        <Route exact path="/get-tickets" >
          <GetTickets connected={connected} isAdmin={isAdmin} account ={userAccount} disconnectWallet={disconnectWallet}  connectWallet={connectWallet}/>
        </Route>
        <Route exact path="/admin" component={Setting} />
        <Route exact path="/admin/add" component={AdminChange} />
      </Switch>     
    </div>
  );
}

export default App;
