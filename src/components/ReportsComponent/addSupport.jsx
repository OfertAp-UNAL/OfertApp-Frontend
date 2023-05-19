import { Component } from "react";
import withRouter from "../../services/withRouter";
import FileUpload from "../common/FileUpload/fileUpload";

class AddSuport extends Component {
  state = {
    data: "",
    body: "",
  };

  handleDataSelection = async (image) => {
    this.setState({ data: image });
  };

  handleTextChange = (event) => {
    this.setState({ body: event.target.value });
  };

  handleSubmit() {
    const support = { ...this.state, type: "IMAGE" };
    const id = this.props.params.id;
    alert("Here comes a call to backend!");
    this.props.navigate(`/report/${id}`);
  }

  render() {
    return (
      <div>
        <FileUpload
          label="Imagen de soporte"
          type="image"
          onChange={this.handleDataSelection}
        />
        <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          onChange={this.handleTextChange}
        ></textarea>
        <button type="submit" onClick={() => this.handleSubmit()}>
          Send
        </button>
      </div>
    );
  }
}

export default withRouter(AddSuport);
