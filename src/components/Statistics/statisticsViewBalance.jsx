import { Component } from 'react';
import "./statistics.css";

class StatisticsAccountView extends Component {
    
    render() { 
        const { balance, frozenBalance } = this.props;    
        return ( 
            <div className='row ofertapp-bottomline text-center'>
                <h3 className='col-12 ofertapp-label mb-3'>
                    Tu balance actual es:
                </h3>
                <h3 className='col-12 ofertapp-stats-value mb-3'>
                    COP $ {balance.toLocaleString()}
                </h3>
                <h3 className='col-12 ofertapp-label mb-3'>
                    Tu saldo congelado actual es:
                </h3>
                <h3 className='col-12 ofertapp-stats-value mb-3'>
                    COP $ {frozenBalance.toLocaleString()}
                </h3>
            </div>
         );
    }
}

export default StatisticsAccountView;