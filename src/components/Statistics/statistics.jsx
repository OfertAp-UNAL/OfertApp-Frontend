import React, { Component } from 'react';
import withRouter from "../../services/withRouter";
import { getStatistics } from '../../services/statisticsService';
import StatisticsAccountView from './statisticsViewBalance';
import BarPlot from './barPlot';
import PiePlot from './pieChart';
import LinePlot from './histogram';
import ComboBox from '../common/comboBox';
import CustomButton from '../common/Button/button';
import "./statistics.css";

const monthLabels = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 
    'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

class Statistics extends Component {

    state = {
        data : {
            balance: 0,
            frozenBalance: 0,
            sales: [],
            purchases: [],
            reactions: [],
            offers: [],

            // Histogram options
            financialGroupingBy: "day",
            financialviewBy: "money",

            // Piechart options
            reactionsGroupingBy: "lday",

            // Barchart options
            offersViewBy: "money",
            offersLast: "5"
        },

        // Histogram data
        histogramData : {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'Ventas',
                    data: [1,2,3,4,5,6,7],
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                },
                {
                    label: 'Compras',
                    data: [1,2,3,4,5,6,7],
                    borderColor: 'rgb(53, 162, 235)',
                    backgroundColor: 'rgba(53, 162, 235, 0.5)',
                },
            ],
        },

        // Piechart data
        piechartData : {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [
                {
                    label: '# of Votes',
                    data: [12, 19, 3, 5, 2, 3],
                    borderWidth: 1,
                },
            ] 
        },

        // Barchart data
        barPlotData : {
            labels: ['.', '.', '.', '.', '.', '.', '.'],
            datasets: [
                {
                    label: 'Publicaciones',
                    data: [1,2,3,4,5,6,7],
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                },
            ],
        }
    }

    // Trigger for combobox selection change
    handleComboBoxChange = (id, value) => {

        // Update state
        let currentData = this.state.data;

        if( id === "financialGroupingBy" ){
            currentData.financialGroupingBy = value;
        } else if( id === "financialviewBy" ){
            currentData.financialviewBy = value;
        } else if( id === "reactionsGroupingBy" ){
            currentData.reactionsGroupingBy = value;
        } else if( id === "offersViewBy" ){
            currentData.offersViewBy = value;
        } else if( id === "offersLast" ){
            currentData.offersLast = value;
        }

        // Update state's data
        this.setState({ data: currentData });
    }

    async componentDidMount() {
        await this.updateData();
    }

    // Update histogram data (finantial data)
    updateData = async () => {
        try{
            // Getting user's token
            const token = localStorage.getItem("token");

            // Configuring parameters in order to let backend do the work
            const params = {
                groupFinancialBy: this.state.data.financialGroupingBy,
                viewFinancialBy: this.state.data.financialviewBy,
                viewReactionsBy: this.state.data.reactionsGroupingBy,
                viewOffersBy: this.state.data.offersViewBy,
                viewLastOffersIn: this.state.data.offersLast
            }
            const responseData = await getStatistics( token, params );
            const { data, status } = responseData.data;
            if( status === "success" ){
                this.setState({
                    data : {
                        balance: data.balance,
                        frozenBalance: data.frozenBalance,
                        sales: data.sales,
                        purchases: data.purchases,
                        reactions: data.reactions,
                        offers: data.offers
                    }
                });

                // Update charts data
                this.updateChartsState();
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

    // Separate function for updating charts data
    updateChartsState = () => {
        const { sales, purchases, reactions, offers } = this.state.data;
        const { financialGroupingBy } = this.state.data;

        const financialLabels = sales.map( (sale) => sale[financialGroupingBy] );
        const salesData = sales.map( (sale) => sale.total );
        const purchasesData = purchases.map( (purchase) => purchase.total );

        const reactionsLabels = reactions.map( (reaction) => reaction["type"] );
        const reactionsData = reactions.map( (reaction) => reaction["total"] );

        const offersLabels = offers.map( (offer) => offer["publicationTitle"] );
        const offersData = offers.map( (offer) => offer["total"] );

        const { histogramData, piechartData, barPlotData } = this.state;
        histogramData.labels = financialLabels;
        histogramData.datasets[0].data = salesData;
        histogramData.datasets[1].data = purchasesData;

        piechartData.labels = reactionsLabels;
        piechartData.datasets[0].data = reactionsData;

        barPlotData.labels = offersLabels;
        barPlotData.datasets[0].data = offersData;

        this.setState({
            histogramData: histogramData,
            piechartData: piechartData,
            barPlotData: barPlotData
        });
    }

    render() {

        // Update charts data
        const { histogramData, piechartData, barPlotData } = this.state;
        return (
            <div className="w-100 text-center">
                <h1 className = "ofertapp-page-title">
                    Mi progreso
                </h1>
                <h2 className='ofertapp-statistics-subtitle'>
                    Tu balance
                </h2>
                <StatisticsAccountView
                    balance = {this.state.data.balance}
                    frozenBalance = {this.state.data.frozenBalance}
                />
                <h2 className='ofertapp-statistics-subtitle'>
                    Tus ventas y compras
                </h2>
                <div className='row ofertapp-bottomline justify-content-center'>
                    <div className='col-12 col-sm-3 text-center'>
                        <ComboBox
                            label = "Agrupar por"
                            options = {[
                                { name: "day", label: "Día" },
                                { name: "week", label: "Semana" },
                                { name: "month", label: "Mes" },
                                { name: "year", label: "Año" }
                            ]}
                            value = "day"
                            onChange = {(value) => {this.handleComboBoxChange("financialGroupingBy", value)}}
                        />
                        <br />
                        <ComboBox
                            label = "Ver:"
                            options = {[
                                { name: "money", label: "Monto" },
                                { name: "quantity", label: "Cantidad" },
                            ]}
                            value = "money"
                            onChange={(value) => {this.handleComboBoxChange("financialviewBy", value)}}
                        />
                    </div>
                    <div className='col-12 col-sm-9 text-center'>
                        <LinePlot title = "Tu avance financiero" data={histogramData} />
                    </div>
                </div>
                <h2 className='ofertapp-statistics-subtitle'>
                    Reacciones a tus comentarios
                </h2>
                <div className='row ofertapp-bottomline text-center'>
                    <div className='col-12 col-sm-3'>
                        <ComboBox
                            label = "Ver por:"
                            options = {[
                                { name: "lday", label: "Último día" },
                                { name: "lweek", label: "Última Semana" },
                                { name: "lmonth", label: "Último Mes" },
                                { name: "lyear", label: "Último Año" }
                            ]}
                            value = "day"
                            onChange = {(value) => {this.handleComboBoxChange("reactionsGroupingBy", value)}}
                        />
                    </div>
                    <div className='col-12 col-sm-9 text-center'>
                        <PiePlot title = "Reacciones a tus comentarios" data={piechartData}/>
                    </div>
                </div>
                <h2 className='ofertapp-statistics-subtitle'>
                    Ofertas a tus publicaciones
                </h2>
                <div className='row ofertapp-bottomline text-center'>
                    <div className='col-12 col-sm-3'>
                        <ComboBox
                            label = "Ver por:"
                            options = {[
                                { name: "money", label: "Monto" },
                                { name: "quantity", label: "Cantidad" },
                            ]}
                            value = "money"
                            onChange = {(value) => {this.handleComboBoxChange("offersViewBy", value)}}
                        />
                        <br/>
                        <ComboBox
                            label = "Ultimas:"
                            options = {[
                                { name: "5", label: "5 Publicaciones" },
                                { name: "10", label: "10 Publicaciones" },
                                { name: "20", label: "20 Publicaciones" },
                            ]}
                            value = "money"
                            onChange = {(value) => {this.handleComboBoxChange("offersLast", value)}}
                        />
                    </div>
                    <div className='col-12 col-sm-9 text-center'>
                        <BarPlot title = "Ofertas a tus publicaciones" data={barPlotData}/>
                    </div>
                </div>
                <CustomButton 
                    caption="Actualizar" 
                    type="primary"
                    onClick={ () => {this.updateData()} }
                />
            </div>
        );
    };
}

export default withRouter(Statistics);