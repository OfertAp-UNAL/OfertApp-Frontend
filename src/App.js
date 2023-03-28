import React, { Component } from "react";
import { ToastContainer } from "react-toastify";
import { Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/navBar";
import NotFound from "./components/common/notFound";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import RegisterForm from "./components/Registration/registrationForm";
import LoginForm from "./components/login/loginForm";

import MainPage from "./components/Main Page/mainPage";

class App extends Component {
  state = {};

  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar user={this.state.user} />
        <main className="container">
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/homepage" element={<MainPage />} />
            <Route path="/not-found" element={<NotFound />} />
            <Route path="/" element={<Navigate to="/not-found" replace />} />
          </Routes>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
