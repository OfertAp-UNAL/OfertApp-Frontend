import { Component } from "react";
import withRouter from "../../services/withRouter";

class DetailedReport extends Component {
  state = { supports: [] };

  async componentDidMount() {
    try {
      const response = await fetch("http://localhost:3002/supports");
      const supports = await response.json();
      this.setState({ supports });
      console.log("supports", supports);
    } catch (error) {
      console.error("Failed to fetch supports:", error);
    }
  }

  handleClick() {
    const reportId = this.props.params.id;
    this.props.navigate(`/report/${reportId}/addSupport`);
  }

  render() {
    const { supports } = this.state;
    return (
      <div>
        <button onClick={() => this.handleClick()}>Agregar Soporte</button>
        <h3>Detalles del reporte con id {this.props.params.id}</h3>
        {supports.map((support) => (
          <div style={{ border: "2px solid red" }}>
            <p>{support.data}</p>
            <p>{support.body}</p>
            <p>{support.createdAt}</p>
          </div>
        ))}
      </div>
    );
  }
}

export default withRouter(DetailedReport);
