import Form from "../common/form";
import withRouter from "../../services/withRouter";

class RegisterForm extends Form {
  state = {
    data: {
      id: 0,
      name: "",
      username: "",
      password: "",
      email: "",
      phone: "",
      department: "",
      city: "",
      address: "",
      paymentAccountType: "",
      paymentAccountNumber: "",
      confirmPassword: "",
    },
    allStatesList: ["Meta", "Cundinamarca", "Valle"],
    errors: {},
  };

  schema = {};
  render() {
    return (
      <div>
        <h1>Regístrate</h1>
        <form onSubmit={this.handleSubmit} style={{ display: "flex" }}>
          <div style={{ flex: 1, marginRight: "1em" }}>
            {this.renderInput("id", "Cédula", "number")}
            {this.renderAutosuggest(
              "department",
              "Departamento",
              this.state.allStatesList
            )}
          </div>
          <div style={{ flex: 1, marginLeft: "1em" }}>
            {this.renderButton("Save")}
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(RegisterForm);
