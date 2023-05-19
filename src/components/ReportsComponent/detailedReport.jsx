import { Component } from "react";
import withRouter from "../../services/withRouter";
import FileUpload from "../common/FileUpload/fileUpload";

class DetailedReport extends Component {
  state = { supports: [], data: "", body: "" };

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

  handleDataSelection = async (image) => {
    this.setState({ data: image });
  };

  handleTextChange = (event) => {
    this.setState({ body: event.target.value });
  };

  handleSubmit() {
    const support = { ...this.state, type: "IMAGE" };
    delete support.supports; // Get only the new support data
    const id = this.props.params.id;
    alert("Here comes a call to backend!");
    console.log("support is ", support);
    this.props.navigate(`/report/${id}`);
  }

  render() {
    const { supports } = this.state;
    return (
      <div>
        <button
          type="button"
          className="btn ofertapp-button-primary"
          data-toggle="modal"
          data-target="#modalOferta"
        >
          Agregar Soporte
        </button>
        <div
          className="modal fade"
          id="modalOferta"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="modalOfertaLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Agrega el soporte
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div>
                  <FileUpload
                    label="Imagen de soporte"
                    type="image"
                    onChange={this.handleDataSelection}
                  />
                  <textarea
                    name=""
                    id=""
                    cols="30"
                    rows="10"
                    onChange={this.handleTextChange}
                  ></textarea>
                  <button type="submit" onClick={() => this.handleSubmit()}>
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
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
