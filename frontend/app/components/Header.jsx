import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import bfarmLogo from "../assets/bfarm-logo.svg";

const Header = (props) => {
  return (
    <div className="header">
      <img src={bfarmLogo} alt="bfarm_logo" />
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            <Link className="navbar-item" to="/applications">
              Anträge
            </Link>

            <div className="navbar-item has-dropdown is-hoverable">
              <a className="navbar-link">More</a>

              <div className="navbar-dropdown">
                <a className="navbar-item">About</a>
                <a className="navbar-item">Jobs</a>
                <a className="navbar-item">Contact</a>
              </div>
            </div>
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              <button
                className="button is-small is-outlined"
                onClick={props.logout}
              >
                <span>Abmelden</span>
                <span className="icon is-small">
                  <i className="fa fa-sign-out-alt"></i>
                </span>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
