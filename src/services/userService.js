import http from "./httpService";
import config from "../config.json";

const apiUrl = config.apiUrl;

const apiEndpoint = apiUrl + "auth/";

export function registerUser(user) {
  return http.post(apiEndpoint + "register/", {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    username: user.username,
    birthdate: "2020-10-10",
    phone: user.phone,
    address: user.address,
    townId: user.townId,
    password: user.password,
    paymentAccountType: user.paymentAccountType,
    paymentAccountNumber: user.paymentAccountNumber,
    idenIdType: "CC",
  });
}

export function login(username, password) {
  return http.post(apiEndpoint + "login/", { username, password });
}
