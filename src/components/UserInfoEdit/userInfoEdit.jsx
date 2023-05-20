import Joi from "joi-browser";
import withRouter from "../../services/withRouter";
import Form from "../common/form";
import { getDepartments } from "../../services/municipioDepartamentosService";
import { registerUser, updateUserData } from "../../services/userService";
import { getMunicipalitiesByDepartment } from "../../services/municipioDepartamentosService";
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
      paymentAccountType: "",
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
    const { data } = await getDepartments();
    const departments = data.map((e) => e.departamento);

    // Check if there is user data around here
    const parsedData = this.getUserData();

    this.setState({ 
      departments,
      data: {
        ...this.state.data,
        ...parsedData
      }
    });
  }

  // We'll have to overwrite property validation since password confirmation requires it
  validateProperty = ({ name, value }) => {
    if( name === "confirmPassword" ){
      const { data } = this.state;
      const obj = {
        confirmPassword : data.password,
        value
      };
      const schema = {
        [name] : this.schema[name],
        confirmPassword : this.schema["confirmPassword"]
      };
      const { error } = Joi.validate(obj, schema);
      return error ? error.details[0].message : null;
    }
    else {
      const obj = { [name]: value };
      const schema = { [name]: this.schema[name] };
      const { error } = Joi.validate(obj, schema);
      return error ? error.details[0].message : null;
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
        Joi.string().optional().label("Contraseña").allow("") : 
        Joi.string().required().label("Contraseña"),
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
        toast.error("Error registrando usuario, verifique los campos digitados: " + 
          JSON.stringify( error || "Error desconocido") 
        );
      }
    } catch( e ) {
      toast.error("Error registrando usuario, verifique los campos digitados");
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

    if (user.profilePicture != null)
      formData.append("profilePicture", user.profilePicture);

    // Now perform our request
    try{
      const response = await updateUserData(formData);
      const{ status, error } = response.data;
      if(status === "success" ){
        toast.success("Usuario actualizado exitosamente");
        this.props.navigate("/homepage");
      } else {
        toast.error("Error registrando usuario, verifique los campos digitados: " + 
          JSON.stringify( error || "Error desconocido") 
        );
      }
    } catch( e ) {
      toast.error("Error registrando usuario, verifique los campos digitados");
    }
  }

  handleSubmit = (e, editing) => {
    e.preventDefault();

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
  customValidate = ( ) => {
    let errors = this.validate();
    
    // Manually check password and confirmPassword
    const { password, confirmPassword } = this.state.data;
    const passwordsAreSet = (password !== "" || confirmPassword !== "");
    const passwordsMatch = (password === confirmPassword);
    
    if( passwordsAreSet && ! passwordsMatch ){
      errors["confirmPassword"] = "Las contraseñas no coinciden";
    }
    return errors;
  } 

  render() {
    const { departments, municipalitiesInDepartment } = this.state;
    const municipalitiesNames = municipalitiesInDepartment.map(
      (m) => m["name"]
    );

    // User data update
    const editing = this.props.userData != null;
    const userData = this.props.userData || {};

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
              editing, "", editing ? userData.id : ""
            )}
            <div className="ofertapp-div-hline"></div>
            {this.renderInput(
              "firstName", "Tu(s) nombre(s)", "text",
              false, "", editing ? userData.firstName : ""
            )}
            <div className="ofertapp-div-hline"></div>
            {this.renderInput(
              "lastName", "Tu(s) apellido(s)", "text",
              false, "", editing ? userData.lastName : ""
            )}
            <div className="ofertapp-div-hline"></div>
            {this.renderInput(
              "username", "Nombre de usuario, recuerda que debe ser único", "text",
              editing, "", editing ? userData.username : ""
            )}
            <div className="ofertapp-div-hline"></div>
            {this.renderInput(
              "email", "Tu correo electrónico, recuerda que debe ser único", "email",
              editing, "", editing ? userData.email : ""
            )}
            <div className="ofertapp-div-hline"></div>
            {this.renderInput(
              "birthdate", "¿Cúando naciste?", "date", 
              false, "", editing ? userData.birthdate : 
                // Lets format the date to be compatible with the input
                (new Date( Date.now() ).toISOString().split("T")[0])
              )}
            <div className="ofertapp-div-hline"></div>
            {this.renderInput(
              "phone", "Tu número de teléfono", "text",
              editing, "", editing ? userData.phone : ""
            )}
            <div className="ofertapp-div-hline"></div>
            <h1 className = "ofertapp-inspirational-message">
              {editing ? "Actualiza tu contraseña" : "Crea una contraseña" }
            </h1>
            <div className="ofertapp-div-hline"></div>
            {this.renderInput(
              "password", "Contraseña", "password"
            )}
            <div className="ofertapp-div-hline"></div>
            {this.renderInput(
              "confirmPassword",
              "Confirmar Contraseña",
              "password"
            )}
          </div>
          <div className="col-12 col-md-6 ofertapp-registration-column">
            <FileUpload 
              label = "Imagen de perfil" type = "image"
              onChange = {this.handleProfileImageSelection}
            />
            <div className="ofertapp-div-hline"></div>
            {this.renderAutosuggest(
              "department",
              "Departamento",
              departments,
              this.handleDepartmentSelection
            )}
            <div className="ofertapp-div-hline"></div>
            {this.renderAutosuggest(
              "municipality",
              "Municipio",
              municipalitiesNames,
              this.handleMunicipalitySelection
            )}
            <div className="ofertapp-div-hline"></div>
            {this.renderInput(
              "address", "Dirección", "text",
              editing, "", editing ? userData.address : ""
            )}
            <div className="ofertapp-div-hline"></div>
            <ComboBox
              label="Tipo de cuenta"
              options={paymentTypeOptions}
              value={
                editing ? userData.accountType : this.state.data.paymentAccountType
              }
              onChange={(value) => {
                this.handlePaymentTypeSelection(value);
              }}
            />
            <div className="ofertapp-div-hline"></div>
            {this.renderInput(
              "paymentAccountNumber", "Número de cuenta", "text",
              editing, "", editing ? userData.accountId : ""
            )}
            <div className="ofertapp-div-hline"></div>
            {
              !editing && this.renderTermsConditionsCheckbox()
            }
            {
              <CustomButton
                caption={editing ? "Actualizar" : "Registrarse"}
                disabled={this.customValidate(editing)}
                onClick={(e) => this.handleSubmit(e, editing)}
                type="primary"
              />
            }
          </div>
        </form>
      </div>
    );
  }
}
export default withRouter(UserInfoEdit);
