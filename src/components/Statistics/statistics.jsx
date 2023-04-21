import React, { Component } from 'react';
import withRouter from "../../services/withRouter";
import { getStatistics } from '../../services/statisticsService';
import StatisticsAccountView from './statisticsViewBalance';
import BarPlot from './barPlot';
import PiePlot from './pieChart';
import LinePlot from './histogram';
import "./statistics.css";

class Statistics extends Component {

    state = {
        balance: 0,
        frozenBalance: 0,
        sales: [],
        purchases: [],
        reactions: [],
        offers: []
    }

    async componentDidMount() {
        try{
            const token = localStorage.getItem("token");
            const responseData = await getStatistics( token );
            const { data, status } = responseData.data;
            if( status === "success" ){
                console.log( data );
                this.setState({
                    balance: data.balance,
                    frozenBalance: data.frozenBalance,
                    sales: data.sales,
                    purchases: data.purchases,
                    reactions: data.reactions,
                    offers: data.offers
                });
                return;
            } else {
                console.log("Error: ", data);
                this.props.navigate("/login");
            }
        } catch( e ){
            console.log("Error: ", e);
            this.props.navigate("/login");
        }
    }

    render() {
        return (
            <div className="w-100">
                <h1 className = "ofertapp-page-title">
                    Mi progreso
                </h1>
                <h2 className='ofertapp-base-subtitle'>
                    Tu balance
                </h2>
                <StatisticsAccountView
                    balance = {this.state.balance}
                    frozenBalance = {this.state.frozenBalance}
                />
                <h2 className='ofertapp-base-subtitle'>
                    Tus ventas y compras
                </h2>
                <div className='row ofertapp-bottomline text-center'>
                    <div className='col-12 col-sm-3'>
                        ola
                    </div>
                    <div className='col-12 col-sm-9 text-center'>
                        <LinePlot />
                    </div>
                </div>
                <h2 className='ofertapp-base-subtitle'>
                    Reacciones a tus comentarios
                </h2>
                <div className='row ofertapp-bottomline text-center'>
                    <div className='col-12 col-sm-3'>
                        ola
                    </div>
                    <div className='col-12 col-sm-9 text-center'>
                        <PiePlot />
                    </div>
                </div>
                <h2 className='ofertapp-base-subtitle'>
                    Ofertas a tus publicaciones
                </h2>
                <div className='row ofertapp-bottomline text-center'>
                    <div className='col-12 col-sm-3'>
                        ola
                    </div>
                    <div className='col-12 col-sm-9 text-center'>
                        <BarPlot title = "Ofertas a tus publicaciones"/>
                    </div>
                </div>
            </div>
        );
    };
}

export default withRouter(Statistics);