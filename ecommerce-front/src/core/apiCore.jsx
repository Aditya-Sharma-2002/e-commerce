import { API } from "../config";
import queryString from "query-string";

// Helper to handle API responses
const handleResponse = response => response.json().catch(err => Promise.reject("Invalid JSON response"));

const handleError = err => {
    console.error("API error:", err);
    return { error: "Something went wrong." };
};

// Get all products with sorting
export const getProducts = (sortBy) =>
    fetch(`${API}/products?sortBy=${sortBy}&order=desc&limit=6`)
        .then(handleResponse)
        .catch(handleError);

// Get all categories
export const getCategories = () =>
    fetch(`${API}/categories`)
        .then(handleResponse)
        .catch(handleError);

// Filter products by skip/limit/filters
export const getFilteredProducts = (skip, limit, filters = {}) =>
    fetch(`${API}/products/by/search`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ limit, skip, filters })
    })
        .then(handleResponse)
        .catch(handleError);

// List products based on search parameters
export const list = (params) => {
    const query = queryString.stringify(params);
    return fetch(`${API}/products/search?${query}`)
        .then(handleResponse)
        .catch(handleError);
};

// Get single product details
export const read = (productId) =>
    fetch(`${API}/product/${productId}`)
        .then(handleResponse)
        .catch(handleError);

// Get related products
export const listRelated = (productId) =>
    fetch(`${API}/products/related/${productId}`)
        .then(handleResponse)
        .catch(handleError);

// Get Braintree client token
export const getBraintreeClientToken = (userId, token) =>
    fetch(`${API}/braintree/getToken/${userId}`, {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
        .then(handleResponse)
        .catch(handleError);

// Process payment through Braintree
export const processPayment = (userId, token, paymentData) =>
    fetch(`${API}/braintree/payment/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(paymentData)
    })
        .then(handleResponse)
        .catch(handleError);

// Create a new order
export const createOrder = (userId, token, createOrderData) =>
    fetch(`${API}/order/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ order: createOrderData })
    })
        .then(handleResponse)
        .catch(handleError);
