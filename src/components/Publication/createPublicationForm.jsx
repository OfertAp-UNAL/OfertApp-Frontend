import Joi from "joi-browser";
import withRouter from "../../services/withRouter";
import Form from "../common/form";
import FileUpload from "./../common/FileUpload/fileUpload";
import { createPublication, getCategories } from "../../services/publicationService";
import { toast } from "react-toastify";
import ComboBox from "../common/comboBox";
import CheckBox from "../common/checkBox";
import CustomButtom from "../common/Button/button";

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
      boostProduct: false,
    },
    errors: {},
    categories: [],
    defaultAuctionDuration: ""
  };

  async componentDidMount() {
    const { data: requestData } = await getCategories();
    const { status, data } = requestData;
    if( status === "success" ){

      // Gen default value for auction duration
      const dateDuration = new Date( Date.now() + 1000 * 60 * 60 * 24 ); // One day
      const defaultAuctionDuration = dateDuration.toISOString().split("T")[0];

      this.setState({
          data : {
            ...this.state.data,
            category: data[0].name,
            auctionDuration: defaultAuctionDuration
          },
         categories: data,
          defaultAuctionDuration
        });
    }

    
  }

  schema = {
    title: Joi.string().required().label("Título"),
    category: Joi.string().required().label("Categoría"),
    productDescription: Joi.string()
      .required()
      .label("Descripción del producto"),
    startingPrice: Joi.number().required().label("Precio inicial"),
    auctionDuration: Joi.date().label("Tiempo de subasta"),
    evidenceFile: Joi.any().required().label("Archivo de evidencia"),
    evidenceDescription: Joi.string()
      .allow("")
      .label("Descripción de la evidencia"),
    boostProduct: Joi.boolean().label("Boosteable"),
  };

  genServiceData = () => {
    const { 
      productDescription, startingPrice, evidenceFile, evidenceDescription,
      category, auctionDuration, boostProduct
     } = this.state.data;

    // Find category ID
    const categoryId = this.state.categories.find((e) => e.name === category).id;

    // Modify name fields that already exist to make them match with what the backend expects
    let requestData = {
      description : productDescription,
      minOffer : startingPrice,
      supportsFiles : evidenceFile,
      supportsDescriptions : evidenceDescription,
      category : categoryId,
      supportsTypes: "IMAGE"
    };

    if( auctionDuration !== "" ){
      requestData.endDate = new Date(auctionDuration).toISOString();
    }

    if( boostProduct ){
      requestData.priority = true;
    }

    return requestData;
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
    toast.error(errors);
    if (errors) return;
    this.doSubmit();
  };

  handleEvidenceImageSelection = async (file) => {
    const { data } = this.state;
    data["evidenceFile"] = file;
    this.setState({ data });
  };

  handleBoosteableChange = async (checked) => {
    const { data } = this.state;
    data["boostProduct"] = checked;
    this.setState({ data });
  };

  handleCategorySelection = async (category) => {
    const { data } = this.state;
    data["category"] = category;
    this.setState({ data });
  };

  render() {
    const { userData } = this.props;
    const { categories, defaultAuctionDuration } = this.state;

    // Check if user has VIP State
    // Don't worry, backend will verify this as well
    let isVIP = false, vipPubCount = 0;
    if (userData) {
      isVIP = userData.isVIP;
      vipPubCount = userData.vipPublicationsCount;
    }

    // Check if this publication can be boosteable
    const pubIsBoosteable = isVIP && vipPubCount > 0;

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
            {
              <ComboBox
                name="category"
                label="De qué categoría es el producto que quieres vender"
                value = {categories.length > 0 ? categories[0].name : ""}
                options={ (() => {
                  return categories.map((category) => {
                    return {
                      name: category.id,
                      label: category.name,
                    };
                  });
                })() }
                onChange={ this.handleCategorySelection }
              />
            }
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
              "Recuerda que éste debería ser el valor mínimo que, consideras, vale tu producto (COP $)", 
              "number")}
            <div className="ofertapp-div-hline"></div>
          </div>
          <div className="col-12 col-md-6">

            <h1 className = "ofertapp-inspirational-message">
              Tiempo de subasta
            </h1>
            {this.renderInput(
              "auctionDuration",
              "Si eres usuario VIP, puedes cambiar éste tiempo", "date",
              !isVIP, "", defaultAuctionDuration
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

            
            {pubIsBoosteable && 
              <div>
                <div className="ofertapp-div-hline"></div>
                <CheckBox
                  name = "boostProduct"
                  label = "¿Quieres que tu publicación sea boosteada?"
                  onChange = {this.handleBoosteableChange}
                />
                <div className="ofertapp-div-hline"></div>
              </div>
            }
            
            {
              <CustomButtom
                caption = "Publicar"
                type = "primary"
                disabled = { !this.validate() }
                onClick = {this.handleSubmit}
              />
            }
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(CreatePublicationForm);
