import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";
import AddMember from "./pages/AddMember";
import MemberDetails from "./pages/MemberDetails";
import ViewMembers from "./pages/ViewMembers";
import './App.css';

const App = () => (
  <Router>
    <div>
      <nav className="navbar">
        <h1 className="navbar-title">Team Member Directory</h1>
        <div>
          <Link to="/" className="navbar-link">Home</Link>
          <Link to="/view" className="navbar-link">View Members</Link>
          <Link to="/add" className="navbar-link">Add Member</Link>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/view" element={<ViewMembers />} />
        <Route path="/add" element={<AddMember />} />
        <Route path="/member/:id" element={<MemberDetails />} />
      </Routes>
    </div>
  </Router>
);

export default App;
