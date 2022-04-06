import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Setting from './components/Setting/Settings';
import AdminChange from './components/AdminChange/AdminChange';
import HomePage from './components/HomePage';
import GetTickets from './components/GetTickets';

function App() {

  return (
    <div className="setting_page">
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/get-tickets" component={GetTickets} />
        <Route exact path="/admin" component={Setting} />
        <Route exact path="/admin/add" component={AdminChange} />
      </Switch>     
    </div>
  );
}

export default App;
