import React, { Component } from "react";
import config from "./../../../config.json";
import UserLink from "../UserLink/userLink";
import { getTimeLeft } from "./../../../utils/getTime";
import "./offer.css";

const apiUrl = config.apiUrl;

// user: object
// base: boolean

class Offer extends Component {

  // Creates a link to user's profile
  render() {
    const offer = this.props.offer;
    const user = offer.user;

    // Whether this offer is the main one (the highest bid)
    const main = this.props.main;

    return (
      // Conditional class name
        offer && user && 
        <div 
        key = { offer.id }
        className = {
            "col-12 ofertapp-offer-base" +
            (main ? " ofertapp-offer-main" : "")
        }>
            {
                main &&
                <p className = "ofertapp-offer-main-text">
                    Oferta más alta actual
                </p>
            }
            <div className = "row align-middle ofertapp-offer-container">
                <div className = "col-12 col-md-3 text-center">
                    <UserLink user = {user} base = {false} fontSize={20}/>
                </div>
                <div className = "col-12 col-md-4 text-center">
                    <p className = "ofertapp-offer-text">
                        hizo una oferta de
                    </p>
                </div>
                
                <div className = "col-12 col-md-5 text-center">
                    <p className = "ofertapp-offer-price">
                        COP $ {offer.amount.toLocaleString()}
                    </p>
                </div>
                <div className = "col-12 text-center">
                    <p className = "ofertapp-offer-time">
                        Hace {getTimeLeft(offer.createdAt, true)}
                    </p>
                </div>
            </div>
        </div>
      
    );
  }
}

export default Offer;
