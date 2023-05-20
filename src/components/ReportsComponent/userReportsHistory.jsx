import withRouter from "../../services/withRouter";
import { Component } from "react";
import UserLink from "../common/UserLink/userLink";
import { getReports } from "../../services/reportService";

class UserReportsHistory extends Component {
  state = {
    reports: [],
  };

  traducirSigla(sigla) {
    const opciones = [
      ['DF', 'Deliveryfraud'],
      ['SF', 'Suspectfraud'],
      ['DL', 'Dontlike'],
      ['MA', 'Misleadingadvertisement'],
      ['QF', 'Qualityfraud']
    ];
    
    const opcion = opciones.find((item) => item[0] === sigla);
    
    if (opcion) {
      return opcion[1];
    } else {
      return null;
    }
  }

  async componentDidMount() {
    try {
      const {data} = await getReports();
      this.setState({ reports: data.data });
      console.log("reports are ", data.data);
    } catch (error) {
      console.error("Failed to fetch reports:", error);
    }
  }

  render() {
    return (
      <div className="w-100">
        <h1 className = "ofertapp-page-title">
            Mis Reportes
        </h1>
        <table className="reports-table">
          <thead>
            <tr>
              <th className="ofertapp-table-header">Id del reporte</th>
              <th className="ofertapp-table-header">Usuario que reporta</th>
              <th className="ofertapp-table-header">Tipo de reporte</th>
              <th className="ofertapp-table-header">Cuerpo del reporte</th>
              <th className="ofertapp-table-header">Soportes</th>
            </tr>
          </thead>
          <tbody>
            {this.state.reports.map((report) => (
              <tr key={report.id}>
                <td>{report.id}</td>
                <td>
                  {
                    <UserLink
                      fontSize="16"
                      fontColor="#fff"
                      user={report.user}
                    />
                  }
                </td>
                <td>{this.traducirSigla(report.type)}</td>
                <td>{report.body}</td>
                <td>
                  <button
                    onClick={() => this.props.navigate(`/report/${report.id}`)}
                  >
                    Ver Soportes
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default withRouter(UserReportsHistory);
