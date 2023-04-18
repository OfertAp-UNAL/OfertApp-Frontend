import Joi from "joi-browser";
import withRouter from "../../services/withRouter";
import Form from "../common/form";
import FileUpload from "./../common/FileUpload/fileUpload";

class CreatePublicationForm extends Form {
  state = {
    data: {
      title: "jose",
      category: "",
      productDescription: "",
      startingPrice: "",
      auctionDuration: "",
      evidenceFile: "",
      evidenceDescription: "",
    },
    errors: {},
  };

  async componentDidMount() {}

  schema = {
    title: Joi.string().required().label("Título"),
    category: Joi.string().required().label("Categoría"),
    productDescription: Joi.string()
      .required()
      .label("Descripción del producto"),
    startingPrice: Joi.number().required().label("Precio inicial"),
    auctionDuration: Joi.number().required().label("Tiempo de subasta"),
    evidenceFile: Joi.string().allow("").label("Archivo de evidencia"),
    evidenceDescription: Joi.string()
      .allow("")
      .label("Descripción de la evidencia"),
  };

  doSubmit = async () => {
    alert("Doing submit");
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;
    this.doSubmit();
  };

  handleEvidenceImageSelection = async (file) => {
    const { data } = this.state;
    data["profilePicture"] = file;
    this.setState({ data });
  };

  render() {
    return (
      <div>
        <h1>Publica un producto</h1>
        <form onSubmit={this.handleSubmit} className="row text-center">
          <div className="col-12 col-md-6">
            {this.renderInput("title", "Título")}
            {this.renderInput("category", "Categoría")}
            {this.renderInput("productDescription", "Descripción del producto")}
          </div>
          <div className="col-12 col-md-6">
            {this.renderInput("startingPrice", "Precio inicial", "number")}
            {this.renderInput("auctionDuration", "Tiempo de subasta", "number")}
            <FileUpload
              label="Sporte"
              type="image"
              onChange={this.handleEvidenceImageSelection}
            />
            {this.renderInput(
              "evidenceDescription",
              "Descripción de la evidencia"
            )}
            {this.renderButton("Publicar")}
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(CreatePublicationForm);
