import { API } from "../config";

// Get user profile
export const read = (userId, token) =>
    fetch(`${API}/user/${userId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
        .then(res => res.json())
        .catch(err => console.error("Read error:", err));

// Update user profile
export const update = (userId, token, user) =>
    fetch(`${API}/user/${userId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(user)
    })
        .then(res => res.json())
        .catch(err => console.error("Update error:", err));

// Update user data in localStorage
export const updateUser = (user, next) => {
    if (typeof window !== "undefined") {
        const jwt = localStorage.getItem("jwt");
        if (jwt) {
            const auth = JSON.parse(jwt);
            auth.user = user;
            localStorage.setItem("jwt", JSON.stringify(auth));
            next();
        }
    }
};

// Get purchase history for a user
export const getPurchaseHistory = (userId, token) =>
    fetch(`${API}/orders/by/user/${userId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
        .then(res => res.json())
        .catch(err => console.error("Purchase history error:", err));
