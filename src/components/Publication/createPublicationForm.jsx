import Joi, { create } from "joi-browser";
import withRouter from "../../services/withRouter";
import Form from "../common/form";
import FileUpload from "./../common/FileUpload/fileUpload";
import { createPublication } from "../../services/publicationService";
import { toast } from "react-toastify";

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
    evidenceFile: Joi.any().label("Archivo de evidencia"),
    evidenceDescription: Joi.string()
      .allow("")
      .label("Descripción de la evidencia"),
  };

  getUserId = () => {
    const token = localStorage.getItem("token");
    const jwtParts = token.split(".");
    const decodedPayload = JSON.parse(
      new TextDecoder().decode(
        new Uint8Array(
          atob(jwtParts[1])
            .split("")
            .map((c) => c.charCodeAt(0))
        )
      )
    );
    return decodedPayload.user_id;
  };

  genServiceData = () => {
    const { data } = this.state;

    // Modify name fields that already exist to make them match with what the backend expects
    data.description = data.productDescription;
    delete data.productDescription;

    data.minOffer = data.startingPrice;
    delete data.startingPrice;

    data.supportsFiles = data.evidenceFile;
    delete data.evidenceFile;
    data.supportsDescriptions = data.evidenceDescription;
    delete data.evidenceDescription;

    delete data.auctionDuration;

    data.category = "c2ddcc20-4272-4e77-8de8-d4c775b1bd4d";

    data.user = this.getUserId();
    data.supportsTypes = "IMAGE";

    return data;
  };

  doSubmit = async () => {
    const publicationData = this.genServiceData();
    try {
      await createPublication(publicationData);
    } catch (ex) {
      toast.error("No se pudo realizar la publicación");
    }
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
    data["evidenceFile"] = file;
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
