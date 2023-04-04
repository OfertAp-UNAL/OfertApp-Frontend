import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/Ofertapp.png";
import "../App.css";
import "./navBar.css";

const NavBar = ({ user }) => {
  return (
    <nav className="navbar navbar-expand-lg" style={{ flexWrap: "nowrap"}}>
      <Link className="navbar-brand" to="/">
        <img className="navbar-logo" src={logo} alt="Nope" />
      </Link>
      <div className="collapse navbar-collapse show" id="navbarNav">
        <ul className="navbar-nav row">
          <li className="nav-item col-12 col-md-1 simple-space">
            <Link className="nav-link">
              
            </Link>
          </li>
          <li className="nav-item col-12 col-md-5">
            <Link className="nav-link" to="/homepage">
              Inicio
            </Link>
          </li>
          <li className="nav-item col-12 col-md-5">
            <Link className="nav-link" to="/subastas">
              Subastas
            </Link>
          </li>
          <li className="nav-item col-12 col-md-1">
            <Link className="nav-link">
              
            </Link>
          </li>
        </ul>
      </div>
      <button
        className="navbar-toggler me-3"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <button className="green-button me-3" type="button">
        Iniciar sesion
      </button>
    </nav>
  );
};

export default NavBar;
