import withRouter from "../../services/withRouter";
import React, { Component } from "react";

class UserReportsHistory extends Component {
  state = {
    reports: [],
  };

  async componentDidMount() {
    try {
      const response = await fetch("http://localhost:3001/reportsA");
      const reports = await response.json();
      this.setState({ reports });
    } catch (error) {
      console.error("Failed to fetch reports:", error);
    }
  }

  render() {
    return (
      <table className="reports-table">
        <thead>
          <tr>
            <th className="ofertapp-table-header">Id del reporte</th>
            <th className="ofertapp-table-header">Usuario que reporta</th>
            <th className="ofertapp-table-header">Tipo de reporte</th>
            <th className="ofertapp-table-header">Fecha de creación</th>
            <th className="ofertapp-table-header">Cuerpo del reporte</th>
            <th className="ofertapp-table-header">Añadir soporte</th>
          </tr>
        </thead>
        <tbody>
          {this.state.reports.map((report) => (
            <tr key={report.id}>
              <td>{report.id}</td>
              <td>{report.creatorUser}</td>
              <td>{report.type}</td>
              <td>{report.creationDate}</td>
              <td>{report.body}</td>
              <td><button>Hola</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default withRouter(UserReportsHistory);
