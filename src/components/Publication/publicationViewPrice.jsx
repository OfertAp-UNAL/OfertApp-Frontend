import React, { Component } from 'react';
import './publicationView.css';

class PublicationViewPrice extends Component {
    render() {
        const { publication } = this.props;
        return (
            <div className = "row text-center">
                <h3 className = "ofertapp-label">Oferta mínima*</h3>
                <div className = "ofertapp-min-offer">
                    COP $ {publication.minOffer.toLocaleString()}
                </div>
                <p>*Recuerda que las ofertas de posibles compradores serán todas mayores o iguales a éste precio</p>
            </div>
        )
    }
}

export default PublicationViewPrice;