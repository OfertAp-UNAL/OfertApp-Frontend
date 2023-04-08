import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "../images/Ofertapp.png";
import { getUserInfo } from "./../services/userService";
import withRouter from "./../services/withRouter";
import config from "./../config.json";
import "../App.css";
import "./navBar.css";

const { mediaUrl } = config;

class NavBar extends Component {

  state = {
    userIsLoggedIn: false,
    user: {},
  }

  async componentDidMount() {
    try{
      const token = localStorage.getItem("token");
      const responseData = await getUserInfo( token );
      const { data, status } = responseData.data;
      if( status === "success" ){
        this.setState({
            userIsLoggedIn: true,
            user: data,
          });
        return;
      }
    } catch( e ){
      console.log("Error: ", e);
    }
    
    this.setState({ userIsLoggedIn: false, user: {} });
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg static-top" >
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img className="navbar-logo" src={logo} alt="OfertApp Logo" />
          </Link>
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
          <div className="collapse navbar-collapse show ofertapp-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto align-middle text-center">
              <li className="nav-item ofertapp-item text-center">
                <Link className="nav-link text-center" to="/homepage">
                  Inicio
                </Link>
              </li>
              <li className="nav-item ofertapp-item">
                <Link className="nav-link text-center" to="/homepage">
                  Mis Reportes
                </Link>
              </li>
              <li className="nav-item ofertapp-item">
                <Link className="nav-link text-center" to="/homepage">
                  Mis Transacciones
                </Link>
              </li>
              <li className="nav-item ofertapp-item">
                <Link className="nav-link text-center" to="/homepage">
                  Mis Subastas
                </Link>
              </li>
              <li className= {"nav-item flex-row text-center" + (
                this.state.userIsLoggedIn ? " dropdown" : ""
              )}>
              {
                !this.state.userIsLoggedIn ?
                <button className="green-button" type="button" onClick={
                  () => {
                    this.props.navigate("/login")
                  }
                }>
                  Iniciar sesión
                </button>
                :
                <React.Fragment>
                <a 
                  className="nav-link dropdown-toggle" 
                  href="/"
                  id="navbarDropdown" 
                  role="button" 
                  data-bs-toggle="dropdown" 
                  aria-expanded="false"
                >
                  <img
                    className="ofertapp-navbar-profile-picture"
                    alt = "Avatar"
                    src = {mediaUrl + this.state.user.profilePicture}
                  />
              
                  <p className="ofertapp-navbar-profile-name">
                    {this.state.user.username}
                  </p>
                </a>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="navbarDropdown"
                >
                  <li>
                    <hr className="dropdown-divider"/>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/profile">Mi perfil</a>
                  </li>
                  <li>
                    <hr className="dropdown-divider"/>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/logout">Cerrar sesión</a>
                  </li>
                </ul>
                </React.Fragment>
              }
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
  
};

export default withRouter(NavBar);
