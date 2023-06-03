import Joi from "joi-browser";
import withRouter from "../../services/withRouter";
import Form from "../common/form";
import { getDepartments, getMunicipalitiesByDepartment } from "../../services/municipioDepartamentosService";
import { registerUser, updateUserData } from "../../services/userService";
import FileUpload from "../common/FileUpload/fileUpload";
import ComboBox from "../common/comboBox";
import CustomButton from "../common/Button/button";
import { toast } from "react-toastify";
import "./userInfoEdit.css";

const paymentTypeOptions = [
  { name : "CD", label: "Tarjeta de crédito" },
  { name : "NQ", label: "Nequi" }
];

class UserInfoEdit extends Form {
  state = {
    data: {
      id: "",
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      birthdate: "",
      password: "",
      confirmPassword: "",
      phone: "",
      department: "",
      municipality: "",
      address: "",
      paymentAccountType: "CD",
      paymentAccountNumber: "",
      profilePicture: null,
    },
    departments: [],
    municipalitiesInDepartment: [],
    errors: {},
    acceptedTermsConditions: false,
  };

  componentDidUpdate(prevProps) {
    // Check if this is update case, not userData could be empty at a start
    // so we should check if it stops being null at any point and then
    // perform the update
    if( this.props.userData != null && this.props.userData !== prevProps.userData ){
      this.componentDidMount(); // Actually component did mount if url changed at this point
    }
  }

  async componentDidMount() {
    const { data : response } = await getDepartments();
    const { status, data } = response;

    if(status === "success"){
      
      const departments = data.map((e) => e.name);

      // Check if there is user data around here
      const parsedData = this.getUserData();

      this.setState({ 
        departments,
        data: {
          ...this.state.data,
          ...parsedData
        }
      });
    } else {
      toast.error("Error cargando departamentos");
    }
  }

  // Method for getting logged in user information
  getUserData = () => {
    const { userData } = this.props;
    if( userData ){
      return {
        id: userData.id,
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        username: userData.username,
        birthdate: userData.birthdate,
        phone: userData.phone,
        address: userData.address,
        paymentAccountType: userData.accountType,
        paymentAccountNumber: userData.accountId,
      }

    }
    return {}
  }

  // Global schema
  schema = {}

  // Method for build correct schema based on interface state
  getSchema = ( editing ) => {
    return {
      id: editing ? Joi.any() : Joi.number().required().label("Cédula"),
      firstName: Joi.string().required().label("Nombres"),
      lastName: Joi.string().required().label("Apellidos"),
      username: editing ? Joi.any() : Joi.string().required().label("Nombre de usuario"),
      password: editing ? 
        Joi.string().regex(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/ 
        ).optional().label("Contraseña").allow("").options({
          language: {
            string: {
              regex: {
                base: "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número"
              }
            }
          }
        })
        : 
        Joi.string().regex(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/
        ).required().label("Contraseña").options({
          language: {
            string: {
              regex: {
                base: "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número"
              }
            }
          }
        }),
      confirmPassword: editing ? 
        Joi.string().optional().label("Confirmar contraseña").allow("") :
        Joi.string().required().label("Confirmar contraseña"),
      email: editing ? Joi.any() : Joi.string().email().required().label("Correo electrónico"),
      birthdate: Joi.any().required().label("Fecha de nacimiento"),
      phone: Joi.string().required().label("Teléfono"),
      department: Joi.string().required().label("Departamento"),
      municipality: Joi.string().required().label("Municipio"),
      address: Joi.string().required().label("Dirección"),
      paymentAccountType: editing ? Joi.any() : Joi.string().required().label("Tipo de cuenta de pago"),
      paymentAccountNumber: editing ? Joi.any() : Joi.string()
                  .required()
                  .label("Número de cuenta de pago"),
      profilePicture: Joi.any()
    }
  }

  doSubmitRegister = async () => {
    // Get location data
    const { data, municipalitiesInDepartment } = this.state;
    const municipalityId = municipalitiesInDepartment.find(
      (m) => m["name"] === data.municipality
    ).id;
    const user = { ...data, municipalityId };

    // Lets build a form data object to send to the server
    const formData = new FormData();
    formData.append("id", user.id);
    formData.append("firstName", user.firstName);
    formData.append("lastName", user.lastName);
    formData.append("email", user.email);
    formData.append("username", user.username);
    formData.append("birthdate", user.birthdate);
    formData.append("phone", user.phone);
    formData.append("address", user.address);
    formData.append("townId", user.municipalityId);
    formData.append("password", user.password);
    formData.append("paymentAccountType", user.paymentAccountType);
    formData.append("paymentAccountNumber", user.paymentAccountNumber);
    formData.append("idenIdType", "CC");

    if (user.profilePicture != null) {
      formData.append("profilePicture", user.profilePicture);
    }

    document.getElementById("idError").innerHTML = "";
    document.getElementById("firstNameError").innerHTML = "";
    document.getElementById("lastNameError").innerHTML = "";
    document.getElementById("usernameError").innerHTML = "";
    document.getElementById("emailError").innerHTML = "";
    document.getElementById("birthdateError").innerHTML = "";
    document.getElementById("phoneError").innerHTML = "";
    document.getElementById("passwordError").innerHTML = "";
    document.getElementById("confirmPasswordError").innerHTML = "";
    document.getElementById("profilePictureError").innerHTML = "";
    document.getElementById("departmentError").innerHTML = "";
    document.getElementById("municipalityError").innerHTML = "";
    document.getElementById("addressError").innerHTML = "";
    document.getElementById("paymentAccountTypeError").innerHTML = "";
    document.getElementById("paymentAccountNumberError").innerHTML = "";

    // Now perform our request
    try{
      const response = await registerUser(formData);
      const{ token, status, error } = response.data;
      if(status === "success" ){
        toast.success("Usuario registrado exitosamente");
        localStorage.setItem("token", token); // Save JWT in client browser
        
        // Finally update general user data
        await this.props.OnUpdateUserData();
        
        this.props.navigate("/homepage");
      } else {
        this.setState({ serverErrors: error })
        console.log(error);
        toast.error("Error registrando usuario, verifique los campos digitados");
        document.activeElement.blur();
        if ("id" in error) {
          document.getElementById("idError").innerHTML = error.id[0]
        }
        if ("firstName" in error) {
          document.getElementById("firstNameError").innerHTML = error.firstName[0]
        }
        if ("lastName" in error) {
          document.getElementById("lastNameError").innerHTML = error.lastName[0]
        }
        if ("username" in error) {
          document.getElementById("usernameError").innerHTML = error.username[0]
        }
        if ("email" in error) {
          document.getElementById("emailError").innerHTML = error.email[0]
        }
        if ("birthdate" in error) {
          document.getElementById("birthdateError").innerHTML = error.birthdate[0]
        }
        if ("phone" in error) {
          document.getElementById("phoneError").innerHTML = error.phone[0]
        }
        if ("password" in error) {
          document.getElementById("passwordError").innerHTML = error.password[0]
        }
        if ("confirmPassword" in error) {
          document.getElementById("confirmPasswordError").innerHTML = error.confirmPassword[0]
        }
        if ("profilePicture" in error) {
          document.getElementById("profilePictureError").innerHTML = error.profilePicture[0]
        }
        if ("department" in error) {
          document.getElementById("departmentError").innerHTML = error.department[0]
        }
        if ("municipality" in error) {
          document.getElementById("municipalityError").innerHTML = error.municipality[0]
        }
        if ("address" in error) {
          document.getElementById("addressError").innerHTML = error.address[0]
        }
        if ("paymentAccountType" in error) {
          document.getElementById("paymentAccountTypeError").innerHTML = error.paymentAccountType[0]
        }
        if ("paymentAccountNumber" in error) {
          document.getElementById("paymentAccountNumberError").innerHTML = error.paymentAccountNumber[0]
        }
      }
    } catch( e ) {
      toast.error("Error registrando usuario, verifique los campos digitados");
      document.activeElement.blur();
    }
    
  }

  doSubmitUpdate = async () => {
    // This can be kinda complicated than registration case

    // Get location data
    const { data, municipalitiesInDepartment } = this.state;
    const municipalityId = municipalitiesInDepartment.find(
      (m) => m["name"] === data.municipality
    ).id;
    const user = { ...data, municipalityId };

    // Lets build a form data object to send to the server
    const formData = new FormData();
    formData.append("firstName", user.firstName);
    formData.append("lastName", user.lastName);
    formData.append("birthdate", user.birthdate);
    formData.append("phone", user.phone);
    formData.append("municipalityId", user.municipalityId);
    formData.append("address", user.address);
    formData.append("townId", user.municipalityId);

    if( user.password !== "" )
      formData.append("password", user.password);

    if (user.profilePicture != null){
      formData.append("profilePicture", user.profilePicture);
    }

    // Now perform our request
    try{
      const response = await updateUserData(formData);
      const{ status, error } = response.data;
      if(status === "success" ){
        toast.success("Usuario actualizado exitosamente");

        // Finally update general user data
        await this.props.OnUpdateUserData();
        
        this.props.navigate("/homepage");
      } else {
        this.setState({ serverErrors: error })
        toast.error("Error registrando usuario, verifique los campos digitados");
        document.activeElement.blur();
      }
    } catch( e ) {
      toast.error("Error registrando usuario, verifique los campos digitados");
      document.activeElement.blur();
    }
  }

  handleSubmit = (editing) => {

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;
    if( editing )
      this.doSubmitUpdate();
    else
      this.doSubmitRegister();
  }

  handleDepartmentSelection = async (departmentName) => {
    // Update the selected department in the state
    const { data } = this.state;
    data["department"] = departmentName;
    this.setState({ data });

    // Now get the municipalities that are in this department. This items will be in the suggestions for the municipality field.
    const { data: municipalities } = await getMunicipalitiesByDepartment(
      departmentName
    );
    
    const { status, data: municipalitiesList } = municipalities;
    if(status === "success"){
      this.setState({ municipalitiesInDepartment: municipalitiesList });  
    } else {
      toast.error("Error cargando municipios");
    }
  }

  handleMunicipalitySelection = async (municipalityName) => {
    // Update the selected department in the state
    const { data } = this.state;
    data["municipality"] = municipalityName;
    this.setState({ data });
  }

  handlePaymentTypeSelection = async (paymentType) => {
    const { data } = this.state;
    data["paymentAccountType"] = paymentType;
    this.setState({ data });
  }

  handleProfileImageSelection = async (file) => {
    const { data } = this.state;
    data["profilePicture"] = file;
    this.setState({ data });
  }

  // Perform a custom validation for the form
  customValidate = ( editing ) => {
    let errors = this.validate();
    
    // Manually check password and confirmPassword
    const { password, confirmPassword } = this.state.data;
    const passwordsAreSet = (password !== "" || confirmPassword !== "");
    const passwordsMatch = (password === confirmPassword);
    
    if( passwordsAreSet && ! passwordsMatch ){
      if( !errors ) errors = {};
      errors["confirmPassword"] = "Las contraseñas no coinciden";
    }

    if( !this.state.acceptedTermsConditions && !editing ){
      if( !errors ) errors = {};
      errors["acceptedTermsConditions"] = "Debe aceptar los términos y condiciones";
    }
    
    return errors;
  } 

  render() {
    const { departments, municipalitiesInDepartment } = this.state;
    const municipalitiesNames = municipalitiesInDepartment.map(
      (m) => m["name"]
    );

    // Getting current data values
    const {
      id, firstName, lastName, email, username, birthdate, phone, address,
      paymentAccountType, paymentAccountNumber
    } = this.state.data;

    // User data update
    const editing = this.props.userData != null;

    // Update validation schema
    this.schema = this.getSchema( editing );

    return (
      <div>
        <h1 className="ofertapp-page-title">
          {editing ? "Actualiza tus datos en OfertApp!" : "Regístrate en OfertApp!"}
        </h1>
        <form 
          onSubmit={this.handleSubmit} className="row text-center"
          >
          <div className="col-12 col-md-6 ofertapp-registration-column">
            {this.renderInput(
              "id", "Tu Número de Cédula", "number",
              editing, "", id, 
              "OBLIGATORIO: Buscamos garantizar que nuestros usuarios sean personas reales, " +
              "por lo que necesitamos tu número de cédula para verificar tu identidad"
            )}
            <div className="ofertapp-div-hline" id="idError"></div>
            {this.renderInput(
              "firstName", "Tu(s) nombre(s)", "text",
              false, "", firstName,
              "OBLIGATORIO: Escribe los nombres en tu documento de identidad"
            )}
            <div className="ofertapp-div-hline"  id="firstNameError"></div>
            {this.renderInput(
              "lastName", "Tu(s) apellido(s)", "text",
              false, "", lastName,
              "OBLIGATORIO: Escribe los apellidos en tu documento de identidad"
            )}
            <div className="ofertapp-div-hline"  id="lastNameError"></div>
            {this.renderInput(
              "username", "Nombre de usuario, recuerda que debe ser único", "text",
              editing, "", username,
              "OBLIGATORIO: Éste nombre de usuario aparecerá en la mayoría de acciones" +
              "que realices en OfertApp, por lo que debe ser único y fácil de recordar"
            )}
            <div className="ofertapp-div-hline"  id="usernameError"></div>
            {this.renderInput(
              "email", "Tu correo electrónico, recuerda que debe ser único", "email",
              editing, "", email,
              "OBLIGATORIO: Te enviaremos un correo de confirmación al email que digites" +
              ". También podrías recibir mas notificiaciones de OfertApp en este correo"
            )}
            <div className="ofertapp-div-hline"  id="emailError"></div>
            {this.renderInput(
              "birthdate", "¿Cúando naciste?", "date", 
              false, "", editing ? birthdate :
                // Lets format the date to be compatible with the input
                (new Date( Date.now() ).toISOString().split("T")[0]),
              "OBLIGATORIO: Necesitamos saber tu fecha de nacimiento para poder " +
              "ofrecerte una mejor experiencia en OfertApp y verificar que eres mayor de edad"
              )
            }
            <div className="ofertapp-div-hline"  id="birthdateError"></div>
            {this.renderInput(
              "phone", "Tu número de teléfono", "text",
              editing, "", phone, 
              "OBLIGATORIO: Necesitamos tu número de teléfono para poder confirmar tu identidad"
            )}
            <div className="ofertapp-div-hline"  id="phoneError"></div>
            <h1 className = "ofertapp-inspirational-message">
              {editing ? "Actualiza tu contraseña" : "Crea una contraseña" }
            </h1>
            <div className="ofertapp-div-hline"></div>
            {this.renderInput(
              "password", "Contraseña", "password", false, "", null,
              (editing ? "OPCIONAL" : "OBLIGATORIO") + ": Tu contraseña debe tener al menos 8 caracteres, " +
              "una letra mayúscula, una letra minúscula y un número"
            )}
            <div className="ofertapp-div-hline"  id="passwordError"></div>
            {this.renderInput(
              "confirmPassword",
              "Confirmar Contraseña",
              "password", false, "", null,
              (editing) ? "Si deseas cambiar tu contraseña, recuerda que debe coincidir con la anterior" :
              "OBLIGATORIO: Debe coincidir con la contraseña anterior"
            )}
            <div className="ofertapp-div-hline"  id="confirmPasswordError"></div>
          </div>
          <div className="col-12 col-md-6 ofertapp-registration-column">
            <FileUpload 
              label = "Imagen de perfil" type = "image"
              onChange = {this.handleProfileImageSelection}
              info = {"OPCIONAL: Puedes subir una imagen de perfil para que los demás usuarios " +
              "te reconozcan más fácilmente"}
            />
            <div className="ofertapp-div-hline"  id="profilePictureError"></div>
            {this.renderAutosuggest(
              "department",
              "Departamento",
              departments,
              this.handleDepartmentSelection,
              "OBLIGATORIO: Necesitamos saber en qué departamento vives para poder " +
              "ofrecerte una mejor experiencia en OfertApp"
            )}
            <div className="ofertapp-div-hline"  id="departmentError"></div>
            {this.renderAutosuggest(
              "municipality",
              "Municipio",
              municipalitiesNames,
              this.handleMunicipalitySelection,
              "OBLIGATORIO: El municipio del departamento donde vives"
            )}
            <div className="ofertapp-div-hline"  id="municipalityError"></div>
            {this.renderInput(
              "address", "Dirección", "text",
              editing, "", address,
              "OPCIONAL: Tu dirección será relevante para revisar cualquier tipo de " +
              "transacción que realices en OfertApp"
            )}
            <div className="ofertapp-div-hline"  id="addressError"></div>
            <ComboBox
              label="Tipo de cuenta"
              options={paymentTypeOptions}
              value={
                paymentAccountType
              }
              onChange={(value) => {
                this.handlePaymentTypeSelection(value);
              }}
              info = {
                "OBLIGATORIO: Necesitamos saber el tipo de cuenta bancaria que tienes para poder " +
                "verificar tu identidad cuando realizas transacciones en OfertApp"
              }
            />
            <div className="ofertapp-div-hline"  id="paymentAccountTypeError"></div>
            {this.renderInput(
              "paymentAccountNumber", "Número de cuenta", "text",
              editing, "", paymentAccountNumber,
              "OBLIGATORIO: Necesitamos saber el número de tu cuenta bancaria para poder " +
              "verificar tu identidad cuando realizas transacciones en OfertApp"
            )}
            <div className="ofertapp-div-hline"  id="paymentAccountNumberError"></div>
            {
              !editing && this.renderTermsConditionsCheckbox()
            }
            {
              <CustomButton
                caption={editing ? "Actualizar" : "Registrarse"}
                disabled={this.customValidate(editing)}
                onClick={() => this.handleSubmit(editing)}
                type="primary"
              />
            }
            <div class="spinner-border text-success register-loading"></div>
            <div className="ofertapp-div-hline"></div>
          </div>
        </form>
      </div>
    );
  }
}
export default withRouter(UserInfoEdit);
