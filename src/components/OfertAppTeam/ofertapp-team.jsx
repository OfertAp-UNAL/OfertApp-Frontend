import { Component } from 'react';
import InfoOverlay from './info-overlay';
import { Link } from 'react-router-dom';
import "./ofertapp-team.css"

class OfertAppTeam extends Component {
    render() {
        return (
            <div className = "row ofertapp-team-div text-center">
                <div className = "col-12">
                    <h1 className = "ofertapp-title">
                        Hecho con ♥ por el equipo OfertApp
                    </h1>
                </div>
                <div className = "col-12 col-md-4 ofertapp-column">
                    <h1 className='ofertapp-subtitle'>
                        Nuestro equipo
                    </h1>
                    <div className="row">
                        <div className = "col-12 col-sm-6">
                            <p className = "ofertapp-item">
                                José Luis Ávila Guzmán
                            </p>
                        </div>
                        <div className = "col-12 col-sm-6">
                            <p className = "ofertapp-item">
                                Diego Nicolás Rubio Lopez
                            </p>
                        </div>
                        <div className = "col-12 col-sm-6">
                            <p className = "ofertapp-item">
                                Daniel Echeverri Jimenez
                            </p>
                        </div>
                        <div className = "col-12 col-sm-6">
                            <p className = "ofertapp-item">
                                Edgar Daniel González Díaz
                            </p>
                        </div>
                    </div>
                </div>
                <div className = "col-12 col-md-4 ofertapp-column">
                    <h1 className='ofertapp-subtitle'>
                        Sobre nosotros
                    </h1>
                    <div className = "ofertapp-item">
                        <InfoOverlay
                            source={"Nuestra Misión"}
                            target={
                                "Facilitar y flexibilizar la venta y compra de bienes muebles, " +
                                "nuevos y usados, entre los vendedores y los consumidores residentes en Colombia."}
                        />
                    </div>
                    <div className = "ofertapp-item">
                        <InfoOverlay
                            source={"Nuestra Visión"}
                            target={
                                "Desarrollar una plataforma web de comercio electrónico innovadora " + 
                                "y confiable reconocida a nivel Nacional, donde los emprendedores subasten " + 
                                "sus productos y los consumidores puedan ofertar por los de su interés."}
                        />
                    </div>
                    <div className = "ofertapp-item">
                        <InfoOverlay
                            source={"Principios y valores"}
                            target={
                                "Confiablidad - " + 
                                "Transparencia - " + 
                                "Soporte al cliente"}
                        />
                    </div>
                </div>
                <div className = "col-12 col-md-4 ofertapp-column">
                    <h1 className='ofertapp-subtitle'>
                        Mantente al tanto
                    </h1>
                    <div>
                        <img
                            className = "ofertapp-img"
                            src = "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
                            alt = "OfertApp"
                            style = {{
                                width: "30px", height: "30px", borderRadius: "50%"
                            }}
                        /> &nbsp;    
                        <Link 
                            to = "https://github.com/OfertAp-UNAL/OfertApp-Frontend"
                        >
                            Síguenos en GitHub    
                        </Link>
                    </div>
                    
                </div>
            </div>
        )
    }
}

export default OfertAppTeam;