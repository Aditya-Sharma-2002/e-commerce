import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { read, update, updateUser } from './apiUser';

const Profile = () => {
    const navigate = useNavigate();
    const { userId } = useParams();

    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        cpassword: '',
        error: '',
        success: false
    });

    const { token } = isAuthenticated();
    const { name, email, password, cpassword, error, success } = values;

    useEffect(() => {
        const init = async () => {
            try {
                const data = await read(userId, token);
                if (data.error) {
                    setValues({ ...values, error: data.error });
                } else {
                    setValues({ ...values, name: data.name, email: data.email });
                }
            } catch (err) {
                setValues({ ...values, error: 'Something went wrong' });
            }
        };
        init();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (success) {
            // redirect after 1s
            const timer = setTimeout(() => navigate('/cart'), 1000);
            return () => clearTimeout(timer);
        }
    }, [success, navigate]);

    const handleChange = field => e => {
        setValues({ ...values, [field]: e.target.value, error: '' });
    };

    const clickSubmit = async e => {
        e.preventDefault();
        if (password !== cpassword) {
            return setValues({ ...values, error: 'Passwords do not match' });
        }

        try {
            const data = await update(userId, token, { name, email, password });
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                updateUser(data, () => {
                    setValues({
                        ...values,
                        name: data.name,
                        email: data.email,
                        success: true
                    });
                });
            }
        } catch (err) {
            setValues({ ...values, error: 'Update failed' });
        }
    };

    const profileUpdateForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input type="text" onChange={handleChange('name')} className="form-control" value={name} />
            </div>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input type="email" className="form-control" value={email} disabled />
            </div>
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input type="password" onChange={handleChange('password')} className="form-control" value={password} />
            </div>
            <div className="form-group">
                <label className="text-muted">Confirm Password</label>
                <input type="password" onChange={handleChange('cpassword')} className="form-control" value={cpassword} />
            </div>
            <button onClick={clickSubmit} className="btn btn-primary">
                Submit
            </button>
        </form>
    );

    const showError = () => error && <div className="alert alert-danger">{error}</div>;

    return (
        <Layout title="Profile" description="Update your profile" className="container-fluid">
            <h2 className="mb-4">Profile Update</h2>
            {showError()}
            {profileUpdateForm()}
            {success && <div className="alert alert-success">Profile updated. Redirecting...</div>}
        </Layout>
    );
};

export default Profile;
