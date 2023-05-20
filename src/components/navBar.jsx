import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "../images/Ofertapp.png";
import { getUserInfo } from "./../services/userService";
import { getNotifications } from "./../services/notificationService";
import withRouter from "./../services/withRouter";
import config from "./../config.json";
import "../App.css";
import "./navBar.css";
import Notification from "./common/Notification/notification";

const { mediaUrl } = config;

class NavBar extends Component {

  state = {
    userIsLoggedIn: false,
    user: {},
    notifications: []
  }

  async componentDidMount() {
    try{
      const token = localStorage.getItem("token");
      const notifications = await getNotifications();
      console.log(notifications.data);
      const responseData = await getUserInfo( token );
      const { data, status } = responseData.data;

      // Update app's userData globally
      const { OnUpdateUserData } = this.props;
      if( status === "success" ){
        this.setState({
            userIsLoggedIn: true,
            user: data,
            notifications: notifications.data
          });
        OnUpdateUserData( data );
        return;
      }
    } catch( e ){
      console.log("Error: ", e);

      // Delete token for future actions
      localStorage.removeItem("token");
    }
    
    this.setState({ userIsLoggedIn: false, user: {}, notifications: [] });
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg static-top" >
        <div className="container">
          <Link className="navbar-brand" to="/homepage">
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
              {
                this.state.userIsLoggedIn &&
                <React.Fragment>
                  <li className="nav-item ofertapp-item">
                  <Link className="nav-link text-center" to="/homepage">
                    Mis Reportes
                  </Link>
                </li>
                <li className="nav-item ofertapp-item">
                  <Link className="nav-link text-center" to="/transaction-history">
                    Mis Transacciones
                  </Link>
                </li>
                <li className="nav-item ofertapp-item">
                  <Link className="nav-link text-center" to="/statistics">
                    Mis Estadísticas
                  </Link>
                </li>
                <li className="nav-item ofertapp-item">
                  <Link className="nav-link text-center" to="/my-publications">
                    Mis Subastas
                  </Link>
                </li>
                <li className="nav-item ofertapp-item">
                  <Link className="nav-link text-center" to="/createPublication">
                    Crear Publicación
                  </Link>
                </li>
                <li className="nav-item flex-row text-center dropdown">
                <a 
                  className="nav-link dropdown-toggle" 
                  href="/profile"
                  id="notificationDropdown" 
                  alt="Notifications"
                  role="button" 
                  data-bs-toggle="dropdown" 
                  aria-expanded="false"
                >
                  <i className="fas fa-bell" alt="Notifications">
                    
                  </i>
                </a>
                <ul
                  className="dropdown-menu notification-holder"
                  aria-labelledby="notificationDropdown"
                >
                  <div style = {{"textAlign": "center"}}>
                    Notificaciones
                  </div>
                  {
                  this.state.notifications.length > 0 ? 
                  <div>
                    
                  {
                    this.state.notifications.map( notification => (
                      <Notification notification={notification}/>
                    ))
                  }
                  </div>
                  :
                  <p className = "ofertapp-label">No hay notificaciones</p>
                  }
                </ul>
                </li>
                </React.Fragment>
              }
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
                  href="/profile"
                  id="navbarDropdown" 
                  role="button" 
                  data-bs-toggle="dropdown" 
                  aria-expanded="false"
                >
                  <div className="row align-middle">
                    <div className="col-12 col-sm-6 text-center">
                      <img
                        className="img-responsive ofertapp-navbar-profile-picture"
                        alt = "Avatar"
                        src = {mediaUrl + this.state.user.profilePicture}
                      />
                    </div>
                    
                    <div className="col-12 col-sm-6 text-center">
                      <p className="ofertapp-navbar-profile-name">
                        {this.state.user.username}
                      </p>
                    </div>
                  </div>
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
