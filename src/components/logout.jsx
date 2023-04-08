import React, { Component } from "react";
import { logout } from "../services/userService";
import withRouter from "./../services/withRouter";
import { toast } from "react-toastify";

class Logout extends Component {
    state = {
        userIsLoggedIn: false,
    };

    async componentDidMount() {
        try {
            const token = localStorage.getItem("token");
            const responseData = await logout(token);
            const { status } = responseData.data;
            if (status === "success") {
                this.setState({
                    userIsLoggedIn: false,
                });
                localStorage.removeItem("token");
                toast.success("Sesión cerrada correctamente");
                this.props.navigate("/homepage");
                return;
            } else {
                toast.error("Error al cerrar sesión");
            }
        } catch (e) {
            console.log("Error: ", e);
            toast.error("Error al cerrar sesión");
        }
    }

    render() {
        return (
            <div>
                <h1>Cerrando sesión...</h1>
            </div>
        );
    }
}

export default withRouter(Logout);