import React, { Component } from 'react';
import config from '../../config';
import './publicationView.css';

const { mediaUrl } = config;

class PublicationViewMedia extends Component {
    
    render() {
        
        const { publication } = this.props;
        
        // Useful variables
        let carouselActiveAssigned = false;

        return (
            <div className = "row text-center">
                <h3 className = "ofertapp-label">Multimedia</h3>
                <div className = "col-12 ofertapp-media-container">
                    { publication.supports.length > 0 ?
                    // List all supports
                        <div id="mediaCarousel" className = "col-12 carousel slide align-middle" data-ride="carousel">
                            <div className = "carousel-inner">
                            {
                                publication.supports.map( support => (
                                <div 
                                    key = {support.id}
                                    className = {"carousel-item ofertapp-item text-center" + (
                                        () => {
                                            // Assign active class to first item
                                            const toReturn = carouselActiveAssigned ? "" : " active";
                                            carouselActiveAssigned = true;
                                            return toReturn;
                                        }
                                    )()}>
                                    {
                                        support.type === "IMAGE" ?
                                        // Image
                                        <img className = "ofertapp-media"
                                            src = {mediaUrl + support.data}
                                            alt='Publication support'
                                        />
                                        :
                                        // Video
                                        <video className = "ofertapp-media"
                                            controls
                                            src = {mediaUrl + support.data}
                                        />
                                    }
                                    <div>
                                        <p className="ofertapp-description">{support.description}</p>
                                    </div>
                                </div>
                                ))
                            }
                            </div>
                                <a className = "carousel-control-prev ofertapp-carousel-navigator align-middle" href = "#mediaCarousel" role = "button" data-slide = "prev">
                                <span className = "carousel-control-prev-icon ofertapp-navigator-symbol" aria-hidden = "true"></span>
                            </a>
                                <a className = "carousel-control-next ofertapp-carousel-navigator align-middle" href = "#mediaCarousel" role = "button" data-slide = "next">
                                <span className = "carousel-control-next-icon ofertapp-navigator-symbol" aria-hidden = "true"></span>
                            </a>
                        </div>
                        // NO supports available
                        : <p className = "ofertapp-label">No hay multimedia</p>
                    }
                </div>
            </div>
        )
    }
}

export default PublicationViewMedia;