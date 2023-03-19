import http from "./httpService";
import config from "../config.json";
const apiUrl = config.apiUrl;

const apiEndpoint = apiUrl + "/products";

function productUrl(id) {
  return `${apiEndpoint}${id}/`;
}

export function getProducts() {
  return http.get(apiEndpoint);
}

export function getProduct(productId) {
  return http.get(productUrl(productId));
}

export function createProduct(product) {
  return http.post(apiEndpoint, product);
}

export function updateProduct(product) {
  return http.put(productUrl(product.id), product);
}

export function deleteProduct(productId) {
  return http.delete(productUrl(productId));
}
