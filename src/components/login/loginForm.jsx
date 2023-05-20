import Form from "../common/form";
import Joi from "joi-browser";
import withRouter from "../../services/withRouter";
import { login } from "../../services/userService";
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
    document.body.classList.add("center-container");
  }

  componentWillUnmount() {
    document.body.classList.remove("center-container");
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

  // Overwrite validation method+
  validate = () => {
    const errors = {};
    const { data } = this.state;
    if (data.user.trim() === "") {
      errors.user = "Nombre de usuario o correo es requerido";
    }
    if (data.password.trim() === "") {
      errors.password = "Contraseña es requerida";
    }
    return Object.keys(errors).length === 0 ? null : errors;
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
      <div className = "align-middle">
        <h5 className="login-title">Inicio de sesión</h5>
        <form onSubmit={this.handleSubmit} id="login-form">
          <div className="form-input">
            <label htmlFor="username-input">Nombre de usuario</label>
            <input 
              id="username-input" 
              className="form-input" 
              type="text"
              onChange = {(e) => {
                this.setState({data: {...this.state.data, user: e.target.value}});
              }}
            />
          </div>
          <div className="form-input">
            <label htmlFor="password-input">Contraseña</label>
            <input 
              id="password-input" 
              className="form-input" 
              type="password" 
              onChange = {(e) => {
                this.setState({data: {...this.state.data, password: e.target.value}});
              }}
            />
          </div>

          <Link id="reset-password-login" to="/askResetPassword">
            Recuperar contraseña
          </Link>

          <button
            disabled={this.validate() !== null}
            className="btn btn-form login-button"
          >
            Iniciar Sesión
          </button>

          <Link id="register-user-login" to="/register">
            Regístrate si no tienes una cuenta
          </Link>
        </form>
      </div>
    );
  }
}

export default withRouter(LoginForm);
