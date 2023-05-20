import withRouter from "../../services/withRouter";
import React, { Component } from "react";
import UserLink from "../common/UserLink/userLink";
import { getReports } from "../../services/reportService";

class UserReportsHistory extends Component {
  state = {
    reports: [],
  };

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
      <table className="reports-table">
        <thead>
          <tr>
            <th className="ofertapp-table-header">Id del reporte</th>
            <th className="ofertapp-table-header">Usuario que reporta</th>
            <th className="ofertapp-table-header">Tipo de reporte</th>
            <th className="ofertapp-table-header">Cuerpo del reporte</th>
            <th className="ofertapp-table-header">Añadir soporte</th>
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
              <td>{report.type}</td>
              <td>{report.body}</td>
              <td>
                <button
                  onClick={() => this.props.navigate(`/report/${report.id}`)}
                >
                  Hola
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default withRouter(UserReportsHistory);
