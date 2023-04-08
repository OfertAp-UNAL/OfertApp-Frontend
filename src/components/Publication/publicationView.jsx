//import Joi from "joi-browser";
import withRouter from "../../services/withRouter";
import React, { Component } from "react";
import { getPublication } from "../../services/publicationService";

import PublicationViewHeader from "./publicationViewHeader";
import PublicationViewMedia from "./publicationViewMedia";
import PublicationViewDescription from "./publicationViewDescription";
import PublicationViewPrice from "./publicationViewPrice";
import PublicationViewOffers from "./publicationViewOffers";
import PublicationViewComments from "./publicationViewComments";

import CustomButton from "../common/Button/button";

import "./publicationView.css";

import { toast } from "react-toastify";

class PublicationView extends Component {
  state = {
    publication : null
  };

  async componentDidMount() {

    try{
      // Getting publication data from server
      const { data } = await getPublication(this.props.params.id);

      // A custom success message will be send by server
      const { status, data : publication } = data;
      
      if( status === "success" ){
        this.setState({ publication });
      }
      else{
        toast.error("Error al cargar la publicación: Bad Status");
      }
        
    } catch (ex) {
      console.log(ex);
      toast.error("Error al cargar la publicación");
    }
  }

  render() {
    // Getting publication data (which was read as soon this component mounted)
    const { publication } = this.state;

    return (
      <div className="w-100">
        <h1 className = "ofertapp-page-title">Visualización de Publicación</h1>
        {
          publication && publication.reportable &&
            (<CustomButton 
              onClick = { () => console.log("Reporte") }
              caption = "Reportar"
              type = "report"
            />)
        }
        <h2 className = "ofertapp-base-subtitle">{
          publication ? (    
            <p className = "align-middle" style={{"margin" : "auto"}}>
              {(publication.priority ? "👑" : "") + publication.title} &nbsp;
              <span className = "badge bg-primary ofertapp-category"> {publication.category.name} </span>
            </p>
          ) : "Cargando..."
        }</h2>
        
        {
          // Render conditionally further elements if there is a publication
          publication && 
          <div>
            <PublicationViewHeader publication = {publication} />
            <div className = "row ofertapp-bottomline">
              <div className = "col-12 col-md-7 align-middle">
                <PublicationViewMedia publication = {publication} />
              </div>
              <div className = "col-12 col-md-4 offset-md-1">
                <PublicationViewDescription publication = {publication} />
                <PublicationViewPrice publication = {publication} />
              </div>
            </div>
            <div className = "row ofertapp-bottomline">
              <div className = "col-12 col-md-7">
                <PublicationViewOffers publication = {publication} />
              </div>
              <div className = "col-12 col-md-4 offset-md-1">
                <PublicationViewComments publication = {publication} />
              </div>
            </div>
          </div>
        }
      </div>
    );
  }
}

export default withRouter(PublicationView);
