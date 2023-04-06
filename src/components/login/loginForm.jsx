import Form from "../common/form";
import Joi from "joi-browser";
import withRouter from "../../services/withRouter";
import { login } from "../../services/userService";
import logo from "../../images/OfertappGrande.png";
import "../../App.css";
import { Link } from "react-router-dom";

class LoginForm extends Form {
  state = {
    data: {
      user: "",
      password: "",
    },
    errors: {},
  };

  schema = {
    user: Joi.string().required().label("Nombre de usuario o correo"),
    password: Joi.string().required().label("Contraseña"),
  };

  doSubmit = async () => {
    const { data } = this.state;
    const response = await login(data.user, data.password);
    localStorage.setItem("token", response.data.token); // Save JWT in client browser
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
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="container">
          <div className="form-div">
            <div class="row align-middle">
              <img className="login-logo pb-2" src={logo} alt="Nope" />
              <div class="offset-1 col-10">
                <h5 className="login-title ps-2">Inicio de</h5>
                <h5 className="login-title ps-2 pb-3">sesión</h5>
                {this.renderInput("user", "Nombre de usuario")}
                {this.renderInput("password", "Contraseña", "password")}
                <Link to="/askResetPassword">Recuperar contraseña</Link>
                <div class="row justify-content-center">
                  {this.renderButton("Save")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

export default withRouter(LoginForm);
