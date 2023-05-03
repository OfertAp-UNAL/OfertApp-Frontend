import Form from "../common/form";
import Joi from "joi-browser";
import withRouter from "../../services/withRouter";
import { login } from "../../services/userService";
import "../../App.css";
import "./loginForm.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

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

  componentDidMount() {
    document.body.classList.add('login-page');
  }

  componentWillUnmount() {
    document.body.classList.remove('login-page');
  }

  doSubmit = async () => {
    const { data } = this.state;
    try {
      const response = await login(data.user, data.password);
      const responseData = response.data;
      if (responseData.status === "success") {
        toast.success(
          "Inicio de sesión exitoso. Serás redirigido en un momento"
        );
        // Success logic, save token and redirect
        localStorage.setItem("token", response.data.token); // Save JWT in client browser
        this.props.navigate("/homepage");
      } else {
        toast.error("Usuario o contraseña incorrectos");
      }
    } catch (e) {
      toast.error("Usuario o contraseña incorrectos");
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
    return (
      <div>
        <form onSubmit={this.handleSubmit} id="login-form" className="h-100">
          <h5 className="login-title">Inicio de sesión</h5>
          {this.renderInput(
            "user",
            "Nombre de usuario",
            "text",
            false,
            "Escribe nombre de usuario o correo"
          )}
          {this.renderInput(
            "password",
            "Contraseña",
            "password",
            false,
            "Ingresa tu contraseña"
          )}
          <Link id="reset-password-login" to="/askResetPassword">
            Recuperar contraseña
          </Link>
          {this.renderButton("Iniciar sesión")}
          <Link id="register-user-login" to="/register">
            Regístrate si no tienes una cuenta
          </Link>
        </form>
      </div>
    );
  }
}

export default withRouter(LoginForm);
