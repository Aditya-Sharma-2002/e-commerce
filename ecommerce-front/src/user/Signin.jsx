import React, { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import Layout from "../core/Layout";
import { signin, authenticate, isAuthenticated } from "../auth";

const Signin = () => {
    const [values, setValues] = useState({
        email: "",
        password: "",
        error: "",
        loading: false,
        redirectToReferrer: false
    });

    const { email, password, error, loading, redirectToReferrer } = values;
    const { user } = isAuthenticated();

    const handleChange = name => event => {
        setValues({ ...values, error: "", [name]: event.target.value });
    };

    const clickSubmit = async event => {
        event.preventDefault();
        setValues({ ...values, error: "", loading: true });

        try {
            const data = await signin({ email, password });
            if (data.error) {
                setValues({ ...values, error: data.error, loading: false });
            } else {
                authenticate(data, () => {
                    setValues({ ...values, redirectToReferrer: true });
                });
            }
        } catch (err) {
            setValues({ ...values, error: "Signin failed", loading: false });
        }
    };

    const signInForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input
                    onChange={handleChange("email")}
                    type="email"
                    className="form-control"
                    value={email}
                />
            </div>

            <div className="form-group">
                <label className="text-muted">Password</label>
                <input
                    onChange={handleChange("password")}
                    type="password"
                    className="form-control"
                    value={password}
                />
            </div>

            <button onClick={clickSubmit} className="btn btn-primary">
                Submit
            </button>
            <br />
            <Link to="/signin/forgot">Forgot Password?</Link>
        </form>
    );

    const showError = () =>
        error && <div className="alert alert-danger">{error}</div>;

    const showLoading = () =>
        loading && <div className="alert alert-info">Loading...</div>;

    const redirectUser = () => {
        if (redirectToReferrer) {
            return user && user.role === 1
                ? <Navigate to="/admin/dashboard" replace />
                : <Navigate to="/user/dashboard" replace />;
        }
        if (isAuthenticated()) {
            return <Navigate to="/" replace />;
        }
        return null;
    };

    return (
        <Layout
            title="Signin"
            description="Signin to SJ Chikan Vatika E-commerce App"
            className="container col-md-8 offset-md-2"
        >
            {showLoading()}
            {showError()}
            {signInForm()}
            {redirectUser()}
        </Layout>
    );
};

export default Signin;
