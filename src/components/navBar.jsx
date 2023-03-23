import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/Ofertapp.png";

const NavBar = ({ user }) => {
  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-light">
      <Link className="navbar-brand" to="/">
        <img
          className="d-inline-block align-top"
          src={logo}
          alt="Nope"
          style={{ width: "25%" }}
        />
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/homepage">
              Inicio
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/subastas">
              Subastas
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
