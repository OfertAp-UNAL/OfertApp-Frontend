import React, { Component } from 'react';
import Offer from '../common/Offer/offer';
import CustomButton from '../common/Button/button';
import './publicationView.css';
import Form from "../common/form";
import Joi from "joi-browser";

class PublicationViewOffers extends Component {

    state = {
        data: {
            bid: 0
        },
        offers : []
    }

    async componentDidMount(){
        const { publication } = this.props;
        this.setState({offers: publication.offers});
    }

    render(){

        // Useful vars
        let mainOfferAssigned = false;

        return (
            <div className = "row align-middle text-center">
                <h3 className = "ofertapp-label">Ofertas</h3>
                {
                    this.state.offers.length > 0 ? <div 
                        className = "col-12 ofertapp-overflow"
                        style = {{"--height": "480px"}}
                    >
                    {
                        this.state.offers.map( offer => (
                        <Offer offer={offer} key = {offer.id} main={(
                            () => {
                            // Assign main class to first item
                            const toReturn = !mainOfferAssigned;
                            mainOfferAssigned = true;
                            return toReturn;
                            }
                        )()} />
                        ))
                    }
                    </div>
                    :
                    <p className = "ofertapp-label">No hay ofertas</p>
                }
<<<<<<< HEAD
                </div>
                <button type="button" className="btn ofertapp-button-primary" data-toggle="modal" data-target="#modalOferta">
                    Crear oferta
                </button>
                <div className="modal fade" id="modalOferta" tabIndex="-1" role="dialog" aria-labelledby="modalOfertaLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Oferta</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <div className="row">
                                    <div className="col-6">
                                        <label htmlFor='bid' className="form-label">Cantidad a ofertar</label>
                                    </div>
                                    <div className="col-6">
                                        <input name="bid" id="bid" className="form-control" />
                                    </div>
                                </div>
                                <div className="row align-right pt-3">
                                    <button type="button" className="btn ofertapp-button-primary">
                                        Postular oferta
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
=======
                <CustomButton onClick = {() => console.log("Crear Oferta")} caption = "Crear Oferta" type = "primary"/>
>>>>>>> 94c74112306b7884afc17ef0f3f185135e201e3f
            </div>
        )
    }
}

export default PublicationViewOffers;