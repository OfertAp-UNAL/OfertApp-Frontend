import React, { Component } from "react";
import { ToastContainer } from "react-toastify";
import { Routes, Route, Navigate } from "react-router-dom";

import NavBar from "./components/navBar";
import NotFound from "./components/common/notFound";
import PublicationView from "./components/Publication/publicationView";
import Verify from "./components/VerificationPage/verificationPage";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import RegisterForm from "./components/Registration/registrationForm";
import LoginForm from "./components/login/loginForm";
import Logout from "./components/logout";

import MainPage from "./components/Main Page/mainPage";
import AskResetPasswordForm from "./components/ResetPassword/askResetPasswordForm";
import NewPasswordForm from "./components/ResetPassword/newPasswordForm";

class JointComponentWithNavbar extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar user={this.props.user} />
        {this.props.children}
      </React.Fragment>
    );
  }
}

class App extends Component {
  state = {};

  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <main className="container">
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route
              path="/askResetPassword"
              element={<JointComponentWithNavbar children={<AskResetPasswordForm />} />}
            />
            <Route
              path="/reset-password/:token/:user/"
              element={<JointComponentWithNavbar children={<NewPasswordForm />} />}
            />
            <Route
              path="/register"
              element={<JointComponentWithNavbar children={<RegisterForm />} />}
            />
            <Route
              path="/homepage"
              element={<JointComponentWithNavbar children={<MainPage />} />}
            />
            <Route
              path="/publication/:id"
              element={<JointComponentWithNavbar children={<PublicationView />} />}
            />
            <Route
              path="/verify/:token/:userid"
              element={<JointComponentWithNavbar children={<Verify />} />}
            />
            <Route
              path="/not-found"
              element={<JointComponentWithNavbar children={<NotFound />} />}
            />
            <Route
              path="/logout"
              element={<Logout />}
            />
            <Route path="/" element={<Navigate to="/not-found" replace />} />
          </Routes>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
