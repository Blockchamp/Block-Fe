import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import HomePage from "./components/HomePage";
import GetTickets from "./components/GetTickets";
import Setting from "./components/Setting/Settings";
import AdminChange from "./components/AdminChange/AdminChange";

import "./App.css";
import "./App1.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/get-tickets" element={<GetTickets />} />
        <Route exact path="/admin/add" element={<AdminChange />} />
        <Route exact path="/admin" element={<Setting />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
