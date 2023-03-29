import React, { Component } from 'react';
import Offer from '../common/Offer/offer';
import CustomButton from '../common/Button/button';
import './publicationView.css';

class PublicationViewOffers extends Component {

    state = {
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
            <div className = "row align-middle">
                <h3 className = "ofertapp-label">Ofertas</h3>
                <div 
                    className = "col-12 ofertapp-overflow"
                    style = {{"--height": "425px"}}
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
                <CustomButton onClick = {() => console.log("Crear Oferta")} caption = "Crear Oferta" type = "primary"/>
            </div>
        )
    }
}

export default PublicationViewOffers;