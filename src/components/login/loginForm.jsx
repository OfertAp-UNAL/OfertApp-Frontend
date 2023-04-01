import Form from "../common/form";
import Joi from "joi-browser";
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

  schema = {
    username: Joi.string().required().label("Nombre de usuario"),
    password: Joi.string().required().label("Contraseña"),
  };

  doSubmit = async () => {
    const { data } = this.state;
    await login(data.email, data.password);
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;
    this.doSubmit();
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} style={{ display: "flex" }}>
        <div style={{ flex: 1, marginRight: "1em" }}>
          {this.renderInput("username", "Nombre de usuario")}
          {this.renderInput("password", "Contraseña", "password")}
          {this.renderButton("Save")}
        </div>
      </form>
    );
  }
}

export default withRouter(LoginForm);
