import Form from "../common/form";
import Joi from "joi-browser";
import withRouter from "../../services/withRouter";
import { login } from "../../services/userService";
import logo from "../../images/OfertappGrande.png";
import "../../App.css";
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

  doSubmit = async () => {
    const { data } = this.state;
    try{
      const response = await login(data.user, data.password);
      const responseData = response.data;
      if( responseData.status === "success" ){
        toast.success("Inicio de sesión exitoso. Serás redirigido en un momento");
        // Success logic, save token and redirect
        localStorage.setItem("token", response.data.token); // Save JWT in client browser
        this.props.navigate("/homepage");
      } else {
        toast.error("Usuario o contraseña incorrectos");
      }
    } catch(e) {
      toast.error("Usuario o contraseña incorrectos");
      console.log(e);
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
      <form onSubmit={this.handleSubmit}>
        <div className="container">
          <div className="form-div">
            <div className="row align-middle">
              <img className="login-logo pb-2" src={logo} alt="Nope" />
              <div className="offset-1 col-10">
                <h5 className="login-title ps-2">Inicio de</h5>
                <h5 className="login-title ps-2 pb-3">sesión</h5>
                {this.renderInput("user", "Nombre de usuario")}
                {this.renderInput("password", "Contraseña", "password")}
                <Link to="/askResetPassword">Recuperar contraseña</Link> <br />
                <Link to="/register">Regístrate si no tienes una cuenta</Link>
                <div className="row justify-content-center">
                  {this.renderButton("Iniciar sesión")}
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
