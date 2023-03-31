import Form from "../common/form";
import withRouter from "../../services/withRouter";
import { login } from "../../services/userService";
import "../../App.css";

class LoginForm extends Form {
  state = {
    data: {
      username: "",
      password: "",
    },
    errors: {},
  };

  doSubmit = () => {
    login(this.state.data);
  };

  render() {
    return (
      <div className="form-div">
        <form onSubmit={this.handleSubmit} style={{ display: "flex" }}>
          <div style={{ flex: 1, marginRight: "1em", marginLeft: "1em" }}>
            <h1>Inicio de sesion</h1>
            {this.renderInput("username", "Nombre de usuario")}
            {this.renderInput("password", "Contraseña", "password")}
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(LoginForm);
