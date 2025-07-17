import { API } from '../config';

// User Signup
export const signup = async (user) => {
    try {
        const response = await fetch(`${API}/signup`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        return await response.json();
    } catch (err) {
        console.error("Signup Error:", err);
    }
};

// Send OTP
export const otp = async (user) => {
    try {
        const response = await fetch(`${API}/otp`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        return await response.json();
    } catch (err) {
        console.error("OTP Error:", err);
    }
};

// User Signin
export const signin = async (user) => {
    try {
        const response = await fetch(`${API}/signin`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        return await response.json();
    } catch (err) {
        console.error("Signin Error:", err);
    }
};

// Forgot Password
export const forgot = async (user) => {
    try {
        const response = await fetch(`${API}/signin/forgot`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        return await response.json();
    } catch (err) {
        console.error("Forgot Password Error:", err);
    }
};

// Store auth data in localStorage
export const authenticate = (data, next) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('jwt', JSON.stringify(data));
        next();
    }
};

// Signout user
export const signout = async (next) => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('jwt');
        next();
        try {
            await fetch(`${API}/signout`, {
                method: 'GET'
            });
        } catch (err) {
            console.error("Signout Error:", err);
        }
    }
};

// Check if user is authenticated
export const isAuthenticated = () => {
    if (typeof window === 'undefined') return false;

    const jwt = localStorage.getItem('jwt');
    return jwt ? JSON.parse(jwt) : false;
};

// Check if email or user already exists before signup
export const checkSignup = async (user) => {
    try {
        const response = await fetch(`${API}/checkSignup`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        return await response.json();
    } catch (err) {
        console.error("CheckSignup Error:", err);
    }
};
