import React, { Component } from 'react';
import withRouter from "../../services/withRouter";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

import Pagination from '../common/pagination';
import { paginate } from '../../utils/paginate';

import { getTransactions } from "../../services/transactionService";
import { getDatetimeFormatted } from '../../utils/getTime';
import "./transactionHistory.css";

const pageSize = 10;

class TransactionHistory extends Component {

    state = {
        data : {
            rawTransactions: [],
        },
        transactions: [],
        currentPage: 1,
    }

    // Give transaction type a proper format
    getTransactionType( transaction ){
        switch( transaction.type ){
            case "BP" :
                return "Puja";
            case "BC" :
                return "Cancelación de Puja";
            case "CS":
                return "Costo por venta";
            case "AR":
                return "Recarga de saldo";
            case "AW":
                return "Retiro de saldo";
            case "AA":
                return "Ajuste de administrador";
            default:
                return "Otro";
        }
    }

    // Get transaction flow formatted
    getTransactionFlow( transaction ){

        // Define display colors
        let balanceChange = transaction.postBalance - transaction.prevBalance;
        let frozenChange = transaction.postFrozen - transaction.prevFrozen;

        // Define display text
        return (
            <p>
                <p
                    style = {{
                        color: balanceChange > 0 ? "green" : balanceChange < 0 ? "red" : "black",
                    }}
                >
                    Balance: {" COP $ " + ((balanceChange > 0 ? "+" : "") + balanceChange.toLocaleString())}
                </p>
                <p
                    style = {{
                        color: frozenChange > 0 ? "blue" : frozenChange < 0 ? "orange" : "black",
                    }}
                >
                    Congelado: {" COP $ " + ((frozenChange > 0 ? "+" : "") + frozenChange.toLocaleString())}
                </p>
            </p>
        )
    }

    // Renders a tooltip with transaction's additional information
    renderAdditionalInfo(transaction, props) {  
        return (
            <Tooltip
                id = {"transaction-info-tooltip"} {...props}
                className="ofertapp-transaction-info-tooltip"
            >
                <div className = "row">
                    <div className = "col-12">
                        {transaction.id}
                    </div>
                </div>
            </Tooltip>
        )
    }

    // Get user's transactions
    async componentDidMount() {
        try{
            const token = localStorage.getItem("token");
            if( !token ){
                this.props.navigate("/login");
                return;
            }
            const responseData = await getTransactions( token );
            const { data, status } = responseData.data;
            if( status === "success" ){

                // Paginate data with first page data
                const transactions = paginate( data, this.state.currentPage, pageSize );
                this.setState(
                    {
                        transactions: transactions,
                        data: {
                            rawTransactions: data,
                        }
                    }
                );
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
    
    handlePageChange = page => {
        this.setState({ 
            currentPage: page,
            transactions: paginate( this.state.data.rawTransactions, page, pageSize )
        });
    };

    render() {
        const transactions = this.state.transactions;
        return (
            <div className="w-100">
                <h1 className = "ofertapp-page-title">
                    Mis Transacciones
                </h1>
                {
                    transactions &&
                    <div>
                        <table className="ofertapp-table w-100 text-center">
                            <thead>
                                <tr>
                                    <th className="ofertapp-table-header">Fecha</th>
                                    <th className="ofertapp-table-header">Tipo</th>
                                    <th className="ofertapp-table-header">Descripción</th>
                                    <th className="ofertapp-table-header">Monto</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.transactions.map( transaction => {
                                        return (
                                            <OverlayTrigger
                                                key = {transaction.id}
                                                placement="auto"
                                                delay={{ show: 250, hide: 400 }}
                                                overlay={(props) => this.renderAdditionalInfo(transaction, props)}
                                            >
                                                <tr key = {transaction.id}>
                                                    <td className="ofertapp-table-item">
                                                        {getDatetimeFormatted(transaction.timestamp)}
                                                    </td>
                                                    <td className="ofertapp-table-item">
                                                        {this.getTransactionType(transaction)}
                                                    </td>
                                                    <td className="ofertapp-table-item">
                                                        {transaction.description}
                                                    </td>
                                                    <td className="ofertapp-table-item">
                                                        {this.getTransactionFlow(transaction)}
                                                    </td>
                                                </tr>
                                            </OverlayTrigger>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                        <Pagination
                            itemsCount={this.state.data.rawTransactions.length}
                            pageSize={pageSize}
                            currentPage={this.state.currentPage}
                            onPageChange={this.handlePageChange}
                        />
                    </div>
                }
            </div>
        );
    };
}

export default withRouter(TransactionHistory);