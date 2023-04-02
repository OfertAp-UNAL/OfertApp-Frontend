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
    birthdate: user.birthdate,
    phone: user.phone,
    address: user.address,
    townId: user.municipalityId,
    password: user.password,
    paymentAccountType: user.paymentAccountType,
    paymentAccountNumber: user.paymentAccountNumber,
    idenIdType: "CC",
  });
}

export function login(user, password) {
  return http.post(apiEndpoint + "login/", { user, password });
}
