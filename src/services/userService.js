import http from "./httpService";
import config from "../config.json";

const apiUrl = config.apiUrl;

const apiEndpoint = apiUrl + "auth/";

export function registerUser(user) {

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

    return http.post(apiEndpoint + "register/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
}

export function login(user, password) {
  return http.post(apiEndpoint + "login/", { user, password });
}

export function logout(token) {
  return http.get(apiEndpoint + "logout/", {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
}

export function getUserInfo(token) {
  return http.get(apiUrl + "userinfo/", {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
}