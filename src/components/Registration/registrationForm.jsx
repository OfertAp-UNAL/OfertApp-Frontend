import Joi from "joi-browser";
import withRouter from "../../services/withRouter";
import Form from "../common/form";
import { getDepartments } from "../../services/municipioDepartamentosService";
class RegisterForm extends Form {
  state = {
    data: {
      id: 0,
      name: "",
      username: "",
      password: "",
      confirmPassword: "",
      email: "",
      phone: "",
      department: "",
      city: "",
      address: "",
      paymentAccountType: "",
      paymentAccountNumber: "",
    },
    departments: [],
    citiesExample: ["Bogota", "Zipa", "Chia"],
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
    name: Joi.string().required().label("Nombre"),
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
    phone: Joi.number().required().label("Teléfono"),
    department: Joi.string()
      .valid(...this.state.departments)
      .required()
      .label("Departamento"),
    city: Joi.string().required().label("Ciudad"),
    address: Joi.string().required().label("Dirección"),
    paymentAccountType: Joi.string().required().label("Tipo de cuenta de pago"),
    paymentAccountNumber: Joi.string()
      .required()
      .label("Número de cuenta de pago"),
  };

  render() {
    return (
      <div>
        <h1>Regístrate</h1>
        <form onSubmit={this.handleSubmit} style={{ display: "flex" }}>
          <div style={{ flex: 1, marginRight: "1em" }}>
            {this.renderInput("id", "Cédula", "number")}
            {this.renderInput("name", "Nombre")}
            {this.renderInput("username", "Nombre de usuario")}
            {this.renderInput("password", "Contraseña", "password")}
            {this.renderInput(
              "confirmPassword",
              "Confirmar Contraseña",
              "password"
            )}
            {this.renderInput("email", "Email", "email")}
          </div>
          <div style={{ flex: 1, marginLeft: "1em" }}>
            {this.renderInput("phone", "Teléfono", "number")}

            {this.renderAutosuggest(
              "department",
              "Departamento",
              this.state.departments
            )}
            {this.renderAutosuggest("city", "Ciudad", this.state.departments)}

            {this.renderInput("address", "Dirección")}
            {this.renderInput("paymentAccountType", "Método de pago")}
            {this.renderInput("paymentAccountNumber", "Número de cuenta")}

            {this.renderTermsConditionsCheckbox()}
            {this.renderButton("Save")}
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(RegisterForm);
