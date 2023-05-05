import Form from "../form";
import Joi from "joi-browser";
import withRouter from "../../../services/withRouter";
import { getDepartments } from "../../../services/municipioDepartamentosService.js";
import { getMunicipalitiesByDepartment } from "../../../services/municipioDepartamentosService.js";
import FileUpload from "../FileUpload/fileUpload";
import "../../../App.css";
import "./updateRegistration.css";
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

  mapToViewModel(user) {
    return {
      data: {
        firstName: user.firstName ? user.firstName : "",
        lastName: user.lastName ? user.lastName : "",
        phone: user.phone ? user.phone : "",
        department: user.department ? user.department : "",
        municipality: user.municipality ? user.municipality : "",
        address: user.address ? user.address : "",
        paymentAccountType: user.paymentAccountType
          ? user.paymentAccountType
          : "",
        paymentAccountNumber: user.paymentAccountNumber
          ? user.paymentAccountNumber
          : "",
        profilePicture: user.profilePicture,
      },
    };
  }

  populateUserData = async () => {
    try {
      const token = localStorage.getItem("token");
      const a = await getUserInfo(token);
      const user = a["data"]["data"];
      this.setState({
        data: this.mapToViewModel(user).data,
      });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.navigate("/not-found");
    }
  };

  fillDepartments = async () => {
    const { data } = await getDepartments();
    const departments = data.map((e) => e.departamento);
    this.setState({ departments });
  };

  async componentDidMount() {
    await this.populateUserData();
    await this.fillDepartments();
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
    this.props.navigate("/homepage");
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;
    this.doSubmit();
  };

  render() {
    const { departments, municipalitiesInDepartment, errors } = this.state;
    const municipalitiesNames = municipalitiesInDepartment.map(
      (m) => m["name"]
    );
    return (
      <form onSubmit={this.handleSubmit} className="update-user-data-form">
        <div className="update-user-data-form__left-column">
          <div>
            <label className="form__label" htmlFor="firstName">
              Nombres
            </label>
            <input
              className={
                errors["firstName"] ? "form__input error-input" : "form__input"
              }
              type="text"
              name="firstName"
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label className="form__label" htmlFor="lastName">
              Apellidos
            </label>
            <input
              className={
                errors["lastName"] ? "form__input error-input" : "form__input"
              }
              type="text"
              name="lastName"
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label className="form__label" htmlFor="phone">
              Teléfono
            </label>
            <input
              className={
                errors["phone"] ? "form__input error-input" : "form__input"
              }
              type="number"
              name="phone"
              onChange={this.handleChange}
            />
          </div>
          <FileUpload
            label="Imagen de perfil"
            type="image"
            onChange={this.handleProfileImageSelection}
          />
        </div>

        <update-user-data-form__right-column>
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
          <div>
            <label className="form__label" htmlFor="address">
              Dirección
            </label>
            <input
              className={
                errors["address"] ? "form__input error-input" : "form__input"
              }
              type="text"
              name="address"
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label className="form__label" htmlFor="paymentAccountType">
              Método de pago
            </label>
            <input
              className={
                errors["paymentAccountType"]
                  ? "form__input error-input"
                  : "form__input"
              }
              type="text"
              name="paymentAccountType"
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label className="form__label" htmlFor="paymentAccountNumber">
              Número de cuenta
            </label>
            <input
              className={
                errors["paymentAccountNumber"]
                  ? "form__input error-input"
                  : "form__input"
              }
              type="text"
              name="paymentAccountNumber"
              onChange={this.handleChange}
            />
          </div>
          <button disabled={this.validate() !== null} className="btn btn-form">
            Actualizar
          </button>
        </update-user-data-form__right-column>
      </form>
    );
  }
}

export default withRouter(UpdateUserDataForm);
