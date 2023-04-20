import Form from "../form";
import Joi from "joi-browser";
import withRouter from "../../../services/withRouter";
import { getDepartments } from "../../../services/municipioDepartamentosService.js";
import { getMunicipalitiesByDepartment } from "../../../services/municipioDepartamentosService.js";
import FileUpload from "../FileUpload/fileUpload";
import "../../../App.css";
import { getUserInfo } from "../../../services/userService";

class UpdateUserDataForm extends Form {
  state = {
    data: {
      firstName: "",
      lastName: "",
      phone: "",
      department: "",
      municipality: "",
      address: "",
      paymentAccountType: "",
      paymentAccountNumber: "",
      profilePicture: null,
    },
    errors: {},
    departments: [],
    municipalitiesInDepartment: [],
  };

  fillData = async () => {
    const token = localStorage.getItem("token");
    const data = await getUserInfo(token);
    this.setState({ data });
  };

  schema = {
    firstName: Joi.string().required().label("Nombres"),
    lastName: Joi.string().required().label("Apellidos"),
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

  async componentDidMount() {
    const { data } = await getDepartments();
    const departments = data.map((e) => e.departamento);
    this.setState({ departments });
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
    alert("Llamada AJAX");
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;
    this.doSubmit();
  };

  render() {
    const { departments, municipalitiesInDepartment } = this.state;
    const municipalitiesNames = municipalitiesInDepartment.map(
      (m) => m["name"]
    );
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="container">
          <div className="form-div">
            <div className="row align-middle">
              <div className="offset-1 col-10">
                <h5 className="login-title ps-2">
                  Actualización de información
                </h5>

                {this.renderInput("firstName", "Nombres")}
                {this.renderInput("lastName", "Apellidos")}
                {this.renderInput("phone", "Teléfono", "number")}
              </div>
              <div className="col-12 col-md-6" style={{ paddingRight: "5%" }}>
                <FileUpload
                  label="Imagen de perfil"
                  type="image"
                  onChange={this.handleProfileImageSelection}
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

                <br />
                {this.renderButton("Actualizar")}
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

export default withRouter(UpdateUserDataForm);
