import React, { useState } from "react";
import Layout from "../core/Layout";
import { forgot } from "../auth";

const Forgot = () => {
    const [values, setValues] = useState({
        email: '',
        otp: '',
        password: '',
        cpassword: '',
        stage: 0, // 0 = email form, 1 = OTP & reset form
        error: '',
        success: ''
    });

    const { email, otp, password, cpassword, error, stage, success } = values;

    const handleChange = name => e => {
        setValues({ ...values, [name]: e.target.value, error: '', success: '' });
    };

    const handleEmailSubmit = e => {
        e.preventDefault();
        forgot({ email })
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error });
                } else {
                    setValues({ ...values, stage: 1, error: '', success: 'OTP sent to your email.' });
                }
            });
    };

    const handleResetSubmit = e => {
        e.preventDefault();
        if (password !== cpassword) {
            return setValues({ ...values, error: "Passwords do not match." });
        }

        forgot({ email, otp, password }) // assuming your backend accepts this
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error });
                } else {
                    setValues({ ...values, success: 'Password reset successful. Please log in.', error: '' });
                }
            });
    };

    const emailForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input onChange={handleChange("email")} type="email" className="form-control" value={email} />
            </div>
            <button onClick={handleEmailSubmit} className="btn btn-primary">
                Send OTP
            </button>
        </form>
    );

    const resetForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input onChange={handleChange("email")} type="email" className="form-control" value={email} disabled />
            </div>
            <div className="form-group">
                <label className="text-muted">OTP</label>
                <input onChange={handleChange("otp")} type="text" className="form-control" value={otp} />
            </div>
            <div className="form-group">
                <label className="text-muted">New Password</label>
                <input onChange={handleChange("password")} type="password" className="form-control" value={password} />
            </div>
            <div className="form-group">
                <label className="text-muted">Confirm Password</label>
                <input onChange={handleChange("cpassword")} type="password" className="form-control" value={cpassword} />
            </div>
            <button onClick={handleResetSubmit} className="btn btn-success">
                Reset Password
            </button>
        </form>
    );

    const showError = () =>
        error && <div className="alert alert-danger">{error}</div>;

    const showSuccess = () =>
        success && <div className="alert alert-success">{success}</div>;

    return (
        <Layout
            title="Forgot Password"
            description="Reset your password for SJ Chikan Vatika E-commerce"
            className="container col-md-8 offset-md-2"
        >
            {showError()}
            {showSuccess()}
            {stage === 0 ? emailForm() : resetForm()}
        </Layout>
    );
};

export default Forgot;
