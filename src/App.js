import React, { Component } from "react";
import { ToastContainer } from "react-toastify";
import { Routes, Route, Navigate } from "react-router-dom";

import NavBar from "./components/navBar";
import NotFound from "./components/common/notFound";
import PublicationView from "./components/Publication/publicationView";
import Verify from "./components/VerificationPage/verificationPage";
import DeliveryInfo from "./components/DeliveryInformation/deliveryInformation";
import ConfirmProductDelivery from "./components/DeliveryInformation/confirmDelivery";

import "react-toastify/dist/ReactToastify.css";

import TransactionHistory from "./components/TransactionHistory/transactionHistory";
import Statistics from "./components/Statistics/statistics";
import UserInfoEdit from "./components/UserInfoEdit/userInfoEdit";
import LoginForm from "./components/login/loginForm";
import Logout from "./components/logout";

import MainPage from "./components/Main Page/mainPage";
import AskResetPasswordForm from "./components/ResetPassword/askResetPasswordForm";
import NewPasswordForm from "./components/ResetPassword/newPasswordForm";
import CreatePublicationForm from "./components/Publication/createPublicationForm";
import FinancialTransactionsView from "./components/FinancialTransactions/account";

import OfertAppTeam from "./components/OfertAppTeam/ofertapp-team";
import "./App.css";

import UserReportsHistory from "./components/ReportsComponent/userReportsHistory";
import DetailedReport from "./components/ReportsComponent/detailedReport";

import { getUserInfo } from "./services/userService";

class App extends Component {
  state = {
    userData: null,
  };

  // Prevent component from updating twice
  shouldComponentUpdate(_, nextState) {
    return nextState.userData !== this.state.userData;
  }

  // Get user data from backend
  async getUserData() {
    try {
      const token = localStorage.getItem("token");
      const responseData = await getUserInfo(token);

      const { data, status } = responseData.data;
      if (status === "success") {

        this.setState({
          userData: data
        });

      } else {
        this.setState({
          userData: null,
        });

        // Delete token for future actions
        localStorage.removeItem("token");
      }

    } catch (e) {

      // Delete token for future actions
      localStorage.removeItem("token");

      this.setState({
        userData: null,
      });
    }
  }

  // Get user data at start and always a update happens
  async componentDidMount() {
    await this.getUserData();
  }

  // Useful for keeping a global value with user data
  updateUserData = () => {
    // Get again user data from backend
    this.getUserData();
  }

  render() {
    const userData = this.state.userData;
    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar userData={userData} />
        <main className="container">
          <Routes>
            <Route path="/login"
              element={
                <LoginForm OnUpdateUserData={this.updateUserData} />
              }
            />
            <Route
              path="/askResetPassword"
              element={
                <AskResetPasswordForm />
              }
            />
            <Route
              path="/createPublication"
              element={
                <CreatePublicationForm
                  userData={userData}
                />
              }
            />
            <Route
              path="/reports-history"
              element={
                <UserReportsHistory
                  userData={userData}
                />
              }
            />

            <Route
              path="/reset-password/:token/:user/"
              element={
                <NewPasswordForm />
              }
            />
            <Route
              path="/register"
              element={
                <UserInfoEdit
                  OnUpdateUserData={this.updateUserData}
                />
              }
            />
            <Route
              path="/homepage"
              element={
                <MainPage userPublications="false" />
              }
              key={window.location.pathname}
            />
            <Route
              path="/my-publications"
              element={
                <MainPage userPublications="true" />
              }
              key={window.location.pathname}
            />
            <Route
              path="/transaction-history"
              element={
                <TransactionHistory />
              }
            />
            <Route
              path="/statistics"
              element={
                <Statistics />
              }
            />
            <Route
              path="/profile"
              element={
                <UserInfoEdit
                  userData={userData}
                />
              }
            />
            <Route
              path="/account"
              element={
                <FinancialTransactionsView
                  userData={userData}
                />
              }
            />
            <Route
              path="/report/:id"
              element={
                <DetailedReport
                  userData={userData}
                />
              }
            />a

            <Route
              path="/publication/:id"
              element={
                <PublicationView
                  userData={userData}
                />
              }
            />
            <Route
              path="/delivery/:id"
              element={
                <DeliveryInfo
                  userData={userData}
                />
              }
            />
            <Route
              path="/confirm/:id"
              element={
                <ConfirmProductDelivery
                  userData={userData}
                />
              }
            />
            <Route
              path="/verify/:token/:userid"
              element={
                <Verify />
              }
            />
            <Route
              path="/not-found"
              element={
                <NotFound />
              }
            />
            <Route
              path="/logout"
              element={
                <Logout OnUpdateUserData={this.updateUserData} />
              }
            />
            <Route path="/" element={<Navigate to="/homepage" replace />} />
            <Route path="*" element={<Navigate to="/not-found" replace />} />
          </Routes>
        </main>
        <OfertAppTeam />
      </React.Fragment>
    );
  }
}

export default App;
