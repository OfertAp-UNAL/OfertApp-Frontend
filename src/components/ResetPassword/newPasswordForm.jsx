import Form from "../common/form";
import Joi from "joi-browser";
import withRouter from "../../services/withRouter";
import logo from "../../images/OfertappGrande.png";
import "../../App.css";

class askResetPasswordForm extends Form {
  state = {
    data: {
      password: "",
      confirmPassword: "",
    },
    errors: {},
  };

  schema = {
    password: Joi.string().required().label("Contraseña"),
    confirmPassword: Joi.string().required().label("Confirmar Contraseña"),
  };

  doSubmit = async () => {
    alert("Se ha recuperado la contraseña");
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
                <h5 className="login-title ps-2">Recuperación de</h5>
                <h5 className="login-title ps-2 pb-3">contraseña</h5>
                {this.renderInput("password", "Contraseña", "password")}
                {this.renderInput(
                  "confirmPassword",
                  "Confirmar Contraseña",
                  "password"
                )}
                <div class="row justify-content-center">
                  {this.renderButton("Enviar")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

export default withRouter(askResetPasswordForm);