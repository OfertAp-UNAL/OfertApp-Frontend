import { Component } from "react";
import withRouter from "../../services/withRouter";
import FileUpload from "../common/FileUpload/fileUpload";
import { getReportSupports, postReportSupport } from "../../services/reportService";
import ReportSupport from "./ReportSupport";
import { toast } from "react-toastify";
import CustomButton from "./../common/Button/button";

class DetailedReport extends Component {
  state = { 
    supports: [], 
    data: "", 
    body: "" 
  };

  async componentDidMount() {
    try {
      const { data: response } = await getReportSupports(
        this.props.params.id
      );
      const { status, data } = response;
      if (status === "success") {
        this.setState({ supports: data });
      } else {
        toast.error("Failed to fetch supports");
      }
    } catch (error) {
      toast.error("Failed to fetch supports:", error);
    }
  }

  handleDataSelection = async (image) => {
    this.setState({ data: image });
  };

  handleTextChange = (event) => {
    this.setState({ body: event.target.value });
  };

  async handleSubmit() {
    const { data, body } = this.state;
    
    const formData = new FormData();
    formData.append("data", data);
    formData.append("body", body);
    formData.append("type", "IMAGE");
    
    const id = this.props.params.id;

    try{
      const { data: result } = await postReportSupport(formData, id);
      const { status, data, error } = result;
      if (status === "success") {
        toast.success("Soporte agregado");

        this.setState({
          data: "",
          body: "",
          supports: [...this.state.supports, data],
        });
      } else {
        toast.error("Error al agregar soporte " + 
          (error ? JSON.stringify(error) : "")
        );
      }
      
    } catch (error) {
      toast.error("Error al agregar soporte " + error);
    }
  }

  render() {
    const { supports } = this.state;
    return (
      <div className="row text-center">
        <button
          type="button"
          className="btn ofertapp-button-primary mb-2"
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
                  Agrega un soporte
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
                <div className = "row">
                  <div className="col-12">
                    <FileUpload
                      label="Imagen de soporte"
                      type="image"
                      onChange={this.handleDataSelection}
                    />
                  </div>
                  <div className="col-12">
                    <textarea
                      name=""
                      id=""
                      cols="30"
                      rows="10"
                      onChange={this.handleTextChange}
                    ></textarea>
                  </div>
                  <div className="col-12">
                    <CustomButton
                      caption="Publicar"
                      type="primary"
                      onClick={() => this.handleSubmit()}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <h3
          className="mb-3"
        >
          Detalles del reporte con ID: <br/> {this.props.params.id}
        </h3>
        {
          supports.length > 0 ?
            <div className="row">
              {
                supports.map((support) => (
                  <ReportSupport 
                    key={support.id}
                    support={support} 
                  />    
                ))
              }
            </div>
          : <p>No hay soportes para este reporte</p>
          }
      </div>
    );
  }
}

export default withRouter(DetailedReport);
