import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import bfarmLogo from "../assets/bfarm-logo.svg";

const Header = () => {
  return (
    <div className="header">
      <img src={bfarmLogo} alt="bfarm_logo" />
      <div className="tabs tabs-length">
        <ul>
          <li className="is-active">
            <Link to="/applications">List</Link>
          </li>
          <li>
            <Link to="/status">Status</Link>
          </li>
          <li>
            <Link to="/application/new">New</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/test">NotFound</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
