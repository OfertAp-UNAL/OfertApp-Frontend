import Joi, { create } from "joi-browser";
import withRouter from "../../services/withRouter";
import Form from "../common/form";
import FileUpload from "./../common/FileUpload/fileUpload";
import { createPublication } from "../../services/publicationService";
import { toast } from "react-toastify";
import "./publicationView.css";

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
        <h1 className = "ofertapp-page-title">
          Publica un producto
        </h1>
        <form onSubmit={this.handleSubmit} className="row text-center">
          <div className="col-12 col-md-6">
            <h1 className = "ofertapp-inspirational-message">
              !Ponle un título a tu publicación!
            </h1>
            {this.renderInput("title", "Recuerda ser claro, será lo primero que vean tus posibles compradores")}
            <div className="ofertapp-div-hline"></div>
            
            <h1 className = "ofertapp-inspirational-message">
              ¿Qué vas a publicar?
            </h1>
            {this.renderInput("category", "De qué categoría es el producto que quieres vender")}
            <div className="ofertapp-div-hline"></div>

            <h1 className = "ofertapp-inspirational-message">
              Describe tu producto
            </h1>
            {this.renderInput("productDescription",
              "Extiéndete todo lo que necesites, proporciona todos los detalles relevantes que sea necesario conocer")}
            <div className="ofertapp-div-hline"></div>

            <h1 className = "ofertapp-inspirational-message">
              ¿Cuál debe ser el precio mínimo de oferta?
            </h1>
            {this.renderInput("startingPrice", 
              "Recuerda que éste debería ser el valor mínimo que, consideras, vale tu producto", 
              "number")}
            <div className="ofertapp-div-hline"></div>
          </div>
          <div className="col-12 col-md-6">

            <h1 className = "ofertapp-inspirational-message">
              Tiempo de subasta
            </h1>
            {this.renderInput("auctionDuration", 
              "Si eres usuario VIP, puedes cambiar éste tiempo", "number"
            )}
            <div className="ofertapp-div-hline"></div>

            <h1 className = "ofertapp-inspirational-message">
              Publica algunas evidencias que certifiquen la calidad de tu producto
            </h1>

            <FileUpload
              label = {"Puedes adjuntar imágenes y videos, no olvides que tus usuarios querrán estar seguros de la calidad de tu producto ofertado," +
                " ¡Dales todo el soporte que consideres necesario!"}
              type="image"
              onChange={this.handleEvidenceImageSelection}
            />
            {this.renderInput(
              "evidenceDescription",
              "Describe tu evidencia para hacerlo aún más claro"
            )}

            <div className="ofertapp-div-hline"></div>

            <h1 className = "ofertapp-inspirational-message">
              ¡Recuerda verificarlo todo antes de enviar!
            </h1>

            {this.renderButton("Publicar")}
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(CreatePublicationForm);
