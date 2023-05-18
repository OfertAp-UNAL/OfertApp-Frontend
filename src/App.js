import React, { Component } from "react";
import { ToastContainer } from "react-toastify";
import { Routes, Route, Navigate } from "react-router-dom";

import NavBar from "./components/navBar";
import NotFound from "./components/common/notFound";
import PublicationView from "./components/Publication/publicationView";
import Verify from "./components/VerificationPage/verificationPage";

import "react-toastify/dist/ReactToastify.css";

import TransactionHistory from "./components/TransactionHistory/transactionHistory";
import Statistics from "./components/Statistics/statistics";
import RegisterForm from "./components/Registration/registrationForm";
import LoginForm from "./components/login/loginForm";
import Logout from "./components/logout";

import MainPage from "./components/Main Page/mainPage";
import AskResetPasswordForm from "./components/ResetPassword/askResetPasswordForm";
import NewPasswordForm from "./components/ResetPassword/newPasswordForm";
import CreatePublicationForm from "./components/Publication/createPublicationForm";
import UpdateUserDataForm from "./components/common/updateUserData/updateUserRegistrationData";
import FinancialTransactionsView from "./components/FinancialTransactions/account";

import "./App.css";
import UserReportsHistory from "./components/ReportsComponent/userReportsHistory";
class JointComponentWithNavbar extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar OnUpdateUserData={this.props.OnUpdateUserData} />
        {this.props.children}
      </React.Fragment>
    );
  }
}

class App extends Component {
  state = {
    userData: null,
  };

  // Useful for keeping a global value with user data
  updateUserData = (data) => {
    this.setState({
      userData: data,
    });
  };

  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <main className="container">
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route
              path="/askResetPassword"
              element={
                <JointComponentWithNavbar
                  children={<AskResetPasswordForm />}
                  OnUpdateUserData={this.updateUserData}
                />
              }
            />
            <Route
              path="/createPublication"
              element={
                <JointComponentWithNavbar
                  children={
                    <CreatePublicationForm userData={this.state.userData} />
                  }
                  OnUpdateUserData={this.updateUserData}
                />
              }
            />

            <Route
              path="/reports-history"
              element={
                <JointComponentWithNavbar
                children={<UserReportsHistory />}
                  OnUpdateUserData={this.updateUserData}
                />
              }
            />

            <Route
              path="/reset-password/:token/:user/"
              element={
                <JointComponentWithNavbar
                  children={<NewPasswordForm />}
                  OnUpdateUserData={this.updateUserData}
                />
              }
            />
            <Route
              path="/register"
              element={
                <JointComponentWithNavbar
                  children={<RegisterForm />}
                  OnUpdateUserData={this.updateUserData}
                />
              }
            />
            <Route
              path="/homepage"
              element={
                <JointComponentWithNavbar
                  children={<MainPage userPublications="false" />}
                  OnUpdateUserData={this.updateUserData}
                />
              }
              key={window.location.pathname}
            />
            <Route
              path="/my-publications"
              element={
                <JointComponentWithNavbar
                  children={<MainPage userPublications="true" />}
                  OnUpdateUserData={this.updateUserData}
                />
              }
              key={window.location.pathname}
            />
            <Route
              path="/transaction-history"
              element={
                <JointComponentWithNavbar
                  children={<TransactionHistory />}
                  OnUpdateUserData={this.updateUserData}
                />
              }
            />
            <Route
              path="/statistics"
              element={
                <JointComponentWithNavbar
                  children={<Statistics />}
                  OnUpdateUserData={this.updateUserData}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <JointComponentWithNavbar
                  children={<UpdateUserDataForm />}
                  OnUpdateUserData={this.updateUserData}
                />
              }
            />
            <Route
              path="/account"
              element={
                <JointComponentWithNavbar
                  children={
                    <FinancialTransactionsView userData={this.state.userData} />
                  }
                  OnUpdateUserData={this.updateUserData}
                />
              }
            />
            <Route
              path="/publication/:id"
              element={
                <JointComponentWithNavbar
                  children={<PublicationView userData={this.state.userData} />}
                  OnUpdateUserData={this.updateUserData}
                />
              }
            />
            <Route
              path="/verify/:token/:userid"
              element={
                <JointComponentWithNavbar
                  children={<Verify />}
                  OnUpdateUserData={this.updateUserData}
                />
              }
            />
            <Route
              path="/not-found"
              element={
                <JointComponentWithNavbar
                  children={<NotFound />}
                  OnUpdateUserData={this.updateUserData}
                />
              }
            />
            <Route path="/logout" element={<Logout />} />
            <Route path="/" element={<Navigate to="/homepage" replace />} />
            <Route path="*" element={<Navigate to="/not-found" replace />} />
          </Routes>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
