import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import bfarmLogo from "../assets/bfarm-logo.svg";

const Header = () => {
  return (
    <div className="header">
      <img src={bfarmLogo} alt="bfarm_logo" />
      <Link to="/applications">List</Link> |
      <Link to="/application">Single</Link> |
      <Link to="/application/new">New</Link> |<Link to="/">Home</Link> |
      <Link to="/test">NotFound</Link>
    </div>
  );
};

export default Header;
