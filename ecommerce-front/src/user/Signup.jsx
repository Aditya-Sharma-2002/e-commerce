import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../core/Layout';
import { signup, otp, checkSignup } from '../auth';

const Signup = () => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        cpassword: '',
        otp1: '',
        error: '',
        success: false
    });

    const [modal, setModal] = useState(false);
    const [otpServer, setOtpServer] = useState('');

    const { name, email, phone, password, cpassword, otp1, error, success } = values;

    const handleChange = field => event => {
        setValues({ ...values, [field]: event.target.value, error: '' });
    };

    const handleOtpInput = e => {
        const userOtp = e.target.value;
        setValues({ ...values, otp1: userOtp, error: '' });

        if (userOtp === otpServer.toString()) {
            signup({ name, email, phone, password }).then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error, success: false });
                } else {
                    setValues({
                        name: '',
                        email: '',
                        phone: '',
                        password: '',
                        cpassword: '',
                        otp1: '',
                        error: '',
                        success: true
                    });
                    setModal(false);
                }
            });
        } else if (userOtp.length === 4) {
            setValues({ ...values, error: 'Incorrect OTP' });
        }
    };

    const validateForm = () => {
        if (!name || !email || !phone || !password || !cpassword) {
            setValues({ ...values, error: 'All fields are required' });
            return false;
        }
        if (password !== cpassword) {
            setValues({ ...values, error: 'Passwords do not match' });
            return false;
        }
        return true;
    };

    const handleSubmit = async e => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            const exists = await checkSignup({ email });
            if (exists.error) {
                setValues({ ...values, error: exists.error });
            } else {
                const otpResponse = await otp({ email });
                if (otpResponse.error) {
                    setValues({ ...values, error: otpResponse.error });
                } else {
                    setOtpServer(otpResponse.otp);
                    setModal(true);
                }
            }
        } catch (err) {
            setValues({ ...values, error: 'Signup failed. Please try again.' });
        }
    };

    const otpInput = () => (
        <div className="form-group mt-3">
            <label className="text-muted">Enter OTP</label>
            <input
                type="number"
                className="form-control"
                value={otp1}
                onChange={handleOtpInput}
            />
        </div>
    );

    const signupForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input type="text" onChange={handleChange('name')} className="form-control" value={name} />
            </div>

            <div className="form-group">
                <label className="text-muted">Email</label>
                <input type="email" onChange={handleChange('email')} className="form-control" value={email} />
            </div>

            <div className="form-group">
                <label className="text-muted">Phone Number</label>
                <input type="number" onChange={handleChange('phone')} className="form-control" value={phone} />
            </div>

            <div className="form-group">
                <label className="text-muted">Password</label>
                <input type="password" onChange={handleChange('password')} className="form-control" value={password} />
            </div>

            <div className="form-group">
                <label className="text-muted">Confirm Password</label>
                <input type="password" onChange={handleChange('cpassword')} className="form-control" value={cpassword} />
            </div>

            <button onClick={handleSubmit} className="btn btn-primary mt-3">
                Submit
            </button>

            {modal && otpInput()}
        </form>
    );

    const showError = () =>
        error && <div className="alert alert-danger">{error}</div>;

    const showSuccess = () =>
        success && (
            <div className="alert alert-info">
                Account created successfully. Please <Link to="/signin">Signin</Link>.
            </div>
        );

    return (
        <Layout
            title="Signup"
            description="Signup to SJ Chikan Vatika E-commerce App"
            className="container col-md-8 offset-md-2"
        >
            {showSuccess()}
            {showError()}
            {signupForm()}
        </Layout>
    );
};

export default Signup;
