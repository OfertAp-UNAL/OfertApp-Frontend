import Form from "../form";
import Joi from "joi-browser";
import withRouter from "../../../services/withRouter";
import { getDepartments } from "../../../services/municipioDepartamentosService.js";
import { getMunicipalitiesByDepartment } from "../../../services/municipioDepartamentosService.js";
import { updateUserData } from "./../../../services/userService";
import FileUpload from "../FileUpload/fileUpload";
import { toast } from "react-toastify";
import "./updateRegistration.css";

class UpdateUserDataForm extends Form {
  state = {
    data: {
      firstName: "",
      lastName: "",
      phone: "",
      department: "",
      municipality: "",
      address: "",
      profilePicture: null,
    },
    errors: {},
    departments: [],
    municipalitiesInDepartment: []
  };

  schema = {
    firstName: Joi.string().required().label("Nombres"),
    lastName: Joi.string().required().label("Apellidos"),
    phone: Joi.string().required().label("Teléfono"),
    department: Joi.string().required().label("Departamento"),
    municipality: Joi.string().required().label("Municipio"),
    address: Joi.string().required().label("Dirección"),
    profilePicture: Joi.any(),
  };

  componentDidUpdate(prevProps) {
    
    if( this.props.userData != null && prevProps.userData !== this.props.userData) {
      console.log( "data" )
      console.log( this.props.userData )
      this.setState({
        data: this.mapToViewModel(this.props.userData)
      })
    }
  }

  mapToViewModel(user) {
    return {
        firstName: user.firstName ? user.firstName : "",
        lastName: user.lastName ? user.lastName : "",
        phone: user.phone ? user.phone : "",
        department: user.department ? user.department : "",
        municipality: user.municipality ? user.municipality : "",
        address: user.address ? user.address : "",
        profilePicture: user.profilePicture,
      };
  }

  fillData = async () => {
    const { data } = await getDepartments();
    const departments = data.map((e) => e.departamento);
    this.setState({
      data: this.props.userData ? 
          this.mapToViewModel(this.props.userData) :
          this.state.data,
      
      departments 
    });
  };

  async componentDidMount() {
    await this.fillData();
  }

  handleDepartmentSelection = async (departmentName) => {
    // Update the selected department in the state
    const { data } = this.state;
    data["department"] = departmentName;
    this.setState({ data });

    // Now get the municipalities that are in this department. This items will be in the suggestions for the municipality field.
    const { data: municipalities } = await getMunicipalitiesByDepartment(
      departmentName
    );
    this.setState({ municipalitiesInDepartment: municipalities["data"] });
  };

  handleMunicipalitySelection = async (municipalityName) => {
    // Update the selected department in the state
    const { data } = this.state;
    data["municipality"] = municipalityName;
    this.setState({ data });
  };

  handleProfileImageSelection = async (file) => {
    const { data } = this.state;
    data["profilePicture"] = file;
    this.setState({ data });
  };

  doSubmit = async () => {
    const { data } = this.state;
    try{
      const response = await updateUserData(data);

      const{ status, error } = response.data;
      if( status === "success" ){
        this.props.navigate("/homepage");
      } else {
        toast.error("Error actualizando usuario, verifique los campos digitados: " + 
          JSON.stringify( error || "Error desconocido") 
        );
      }
    } catch ( ex ){
      console.log( ex );
      toast.error("Error actualizando usuario, verifique los campos digitados")
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;
    this.doSubmit();
  };

  render() {
    const userData = this.props.userData;
    const { departments, municipalitiesInDepartment, errors } = this.state;
    const municipalitiesNames = municipalitiesInDepartment.map(
      (m) => m["name"]
    );
    return (
      userData ?
        <form onSubmit={this.handleSubmit} className="update-user-data-form">
          <div className="ofertapp-update-column text-center">
            {this.renderInput( 
              "id", "Tu Identificación", "text", 
              true, "", userData.id )
            }
            <div className="ofertapp-div-hline"></div>
            {this.renderInput( 
              "firstName", "Tus Nombres", "text", 
              false, "", userData.firstName )
            }
            <div className="ofertapp-div-hline"></div>
            {this.renderInput( 
              "lastName", "Tus Apellidos", "text", 
              false, "", userData.lastName )
            }
            <div className="ofertapp-div-hline"></div>
            {this.renderInput( 
              "phone", "Tu Número de teléfono", "text", 
              false, "", userData.phone )
            }
            <div className="ofertapp-div-hline"></div>
            <h1 className="ofertapp-inspirational-message">
              Confirma / Actualiza tu contraseña
            </h1>
            {this.renderInput("password", "Contraseña", "password")}
            <div className="ofertapp-div-hline"></div>
            {this.renderInput(
              "confirmPassword",
              "Confirmar Contraseña",
              "password"
            )}
          </div>

          <div className="ofertapp-update-column text-center">
            <FileUpload
              label="Imagen de perfil"
              type="image"
              onChange={this.handleProfileImageSelection}
            />
            <div className="ofertapp-div-hline"></div>
            {this.renderAutosuggest(
              "department",
              "Departamento",
              departments,
              this.handleDepartmentSelection
            )}
            <div className="ofertapp-div-hline"></div>
            {this.renderAutosuggest(
              "municipality",
              "Municipio",
              municipalitiesNames,
              this.handleMunicipalitySelection
            )}
            <div className="ofertapp-div-hline"></div>
            {this.renderInput( 
              "address", "Tu dirección", "text", 
              false, "", userData.address )
            }
            <div className="ofertapp-div-hline"></div>
            {this.renderInput( 
              "paymentAccountType", "Tu método de pago", "text", 
              false, "", userData.accountType )
            }
            <div className="ofertapp-div-hline"></div>
            {this.renderInput( 
              "paymentAccountNumber", "Tu número de cuenta de pago", "text", 
              false, "", userData.accountId )
            }
            
            <button disabled={this.validate() !== null} className="btn btn-form">
              Actualizar
            </button>
          </div>
        </form>
      :
      <p>
        Cargando...
      </p>
    );
  }
}

export default withRouter(UpdateUserDataForm);
