import Joi from "joi-browser";
import withRouter from "../../services/withRouter";
import Form from "../common/form";
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
    allDepartmentsList: [
      "Amazonas",
      "Antioquia",
      "Arauca",
      "Atlántico",
      "Bolívar",
      "Boyacá",
      "Caldas",
      "Caquetá",
      "Casanare",
      "Cauca",
      "Cesar",
      "Chocó",
      "Córdoba",
      "Cundinamarca",
      "Guainía",
      "Guaviare",
      "Huila",
      "La Guajira",
      "Magdalena",
      "Meta",
      "Nariño",
      "Norte de Santander",
      "Putumayo",
      "Quindío",
      "Risaralda",
      "San Andrés y Providencia",
      "Santander",
      "Sucre",
      "Tolima",
      "Valle del Cauca",
      "Vaupés",
      "Vichada",
    ],
    citiesExample: ["Bogota", "Zipa", "Chia"],
    errors: {},
  };

  schema = {
    id: Joi.number().required().label("Cédula"),
    department: Joi.string()
      .valid(...this.state.allDepartmentsList)
      .required()
      .label("Departamento"),
    city: Joi.string().required().label("Ciudad"),
  };
  render() {
    return (
      <div>
        <h1>Regístrate</h1>
        <form onSubmit={this.handleSubmit} style={{ display: "flex" }}>
          <div style={{ flex: 1, marginRight: "1em" }}>
            {this.renderInput("id", "Cédula", "number")}
            {this.renderInput("name", "Cédula")}
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
              this.state.allDepartmentsList
            )}
            {this.renderAutosuggest(
              "city",
              "Ciudad",
              this.state.allDepartmentsList
            )}

            {this.renderInput("address", "Dirección")}
            {this.renderInput("paymentAccountType", "Método de pago")}
            {this.renderInput("paymentAccountNumber", "Número de cuenta")}
            {this.renderButton("Save")}
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(RegisterForm);
