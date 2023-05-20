import Joi from "joi-browser";
import withRouter from "../../services/withRouter";
import Form from "../common/form";
import { getDepartments } from "../../services/municipioDepartamentosService";
import { registerUser } from "../../services/userService";
import { getMunicipalitiesByDepartment } from "../../services/municipioDepartamentosService";
import FileUpload from "./../common/FileUpload/fileUpload"
import { toast } from "react-toastify";

class RegisterForm extends Form {
  state = {
    data: {
      id: "",
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      birthdate: "",
      password: "",
      confirmPassword: "",
      phone: "",
      department: "",
      municipality: "",
      address: "",
      paymentAccountType: "",
      paymentAccountNumber: "",
      profilePicture: null,
    },
    departments: [],

    municipalitiesInDepartment: [],
    errors: {},
    acceptedTermsConditions: false,
  };

  async componentDidMount() {
    const { data } = await getDepartments();
    const departments = data.map((e) => e.departamento);
    this.setState({ departments });
  }

  schema = {
    id: Joi.number().required().label("Cédula"),
    firstName: Joi.string().required().label("Nombres"),
    lastName: Joi.string().required().label("Apellidos"),
    username: Joi.string().required().label("Nombre de usuario"),
    password: Joi.string().required().label("Contraseña"),
    confirmPassword: Joi.string()
      .required()
      .options({
        language: {
          any: {
            allowOnly: "Las contraseñas deben coincidir",
          },
        },
      })
      .label("Confirmar contraseña"),
    email: Joi.string().email().required().label("Correo electrónico"),
    birthdate: Joi.any(),
    phone: Joi.number().required().label("Teléfono"),
    department: Joi.string().required().label("Departamento"),
    municipality: Joi.string().required().label("Municipio"),
    address: Joi.string().required().label("Dirección"),
    paymentAccountType: Joi.string().required().label("Tipo de cuenta de pago"),
    paymentAccountNumber: Joi.string()
      .required()
      .label("Número de cuenta de pago"),
    profilePicture: Joi.any(),
  };

  doSubmit = async () => {
    const { data, municipalitiesInDepartment } = this.state;
    const municipalityId = municipalitiesInDepartment.find(
      (m) => m["name"] === data.municipality
    ).id;
    const user = { ...data, municipalityId };
    try{
      const response = await registerUser(user);
      const{ token, status, error } = response.data;
      if(status === "success" ){
        toast.success("Usuario registrado exitosamente");
        localStorage.setItem("token", token); // Save JWT in client browser
        
        this.props.navigate("/homepage");
      } else {
        toast.error("Error registrando usuario, verifique los campos digitados: " + 
          JSON.stringify( error || "Error desconocido") 
        );
      }
    } catch( e ) {
      toast.error("Error registrando usuario, verifique los campos digitados");
    }
    
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;
    this.doSubmit();
  };

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
  }

  render() {
    const { departments, municipalitiesInDepartment } = this.state;
    const municipalitiesNames = municipalitiesInDepartment.map(
      (m) => m["name"]
    );
    return (
      <div>
        <h1>Regístrate</h1>
        <form 
          onSubmit={this.handleSubmit} className="row text-center"
          >
          <div className="col-12 col-md-6" style={{
            paddingRight: "5%",
          }}>
            {this.renderInput("id", "Cédula", "number")}
            {this.renderInput("firstName", "Nombres")}
            {this.renderInput("lastName", "Apellidos")}
            {this.renderInput("username", "Nombre de usuario")}
            {this.renderInput("password", "Contraseña", "password")}
            {this.renderInput(
              "confirmPassword",
              "Confirmar Contraseña",
              "password"
            )}
            {this.renderInput("email", "Email", "email")}
            {this.renderInput("birthdate", "Fecha de Nacimiento", "date")}
            {this.renderInput("phone", "Teléfono", "number")}
          </div>
          <div className="col-12 col-md-6"
           style={{paddingRight: "5%"}}
          >
            <FileUpload 
              label = "Imagen de perfil" type = "image"
              onChange = {this.handleProfileImageSelection}
            />
            {this.renderAutosuggest(
              "department",
              "Departamento",
              departments,
              this.handleDepartmentSelection
            )}

            {this.renderAutosuggest(
              "municipality",
              "Municipio",
              municipalitiesNames,
              this.handleMunicipalitySelection
            )}

            {this.renderInput("address", "Dirección")}
            {this.renderInput("paymentAccountType", "Método de pago")}
            {this.renderInput("paymentAccountNumber", "Número de cuenta")}

            {this.renderTermsConditionsCheckbox()}
            <br />
            {this.renderButton("Registrarse")}
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(RegisterForm);
