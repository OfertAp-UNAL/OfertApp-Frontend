import React, { Component } from 'react';
import Offer from '../common/Offer/offer';
import '../common/Offer/offerForm';
import CustomButton from '../common/Button/button';
import './publicationView.css';
import { addOffer } from "../../services/offerService";
import OfferForm from '../common/Offer/offerForm';

class PublicationViewOffers extends Component {

    state = {
        offers : []
    }

    async componentDidMount(){
        const { publication } = this.props;
        this.setState({offers: publication.offers});
    }

    handleOffer = async (amount) => {
        const { publication } = this.state;
        const offer = {
            amount: amount
        }

        await addOffer(publication.id, offer);
    }
    
    render(){

        // Useful vars
        let mainOfferAssigned = false;
        const { publication } = this.props;

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
                                <OfferForm publication={publication}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default PublicationViewOffers;