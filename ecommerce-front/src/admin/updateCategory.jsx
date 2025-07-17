import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link, useParams, Navigate } from 'react-router-dom';
import { getCategory, updateCategory } from './apiAdmin';

const UpdateCategory = () => {
    const { user, token } = isAuthenticated();
    const { categoryId } = useParams();

    const [values, setValues] = useState({
        name: '',
        error: '',
        redirectToList: false
    });

    const { name, error, redirectToList } = values;

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const data = await getCategory(categoryId);
                if (data?.error) {
                    setValues((prev) => ({ ...prev, error: data.error }));
                } else {
                    setValues((prev) => ({ ...prev, name: data.name }));
                }
            } catch (err) {
                setValues((prev) => ({ ...prev, error: 'Failed to fetch category' }));
            }
        };
        fetchCategory();
    }, [categoryId]);

    const handleChange = (e) => {
        setValues({ ...values, name: e.target.value, error: '' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await updateCategory(categoryId, user._id, token, { name });
            if (data?.error) {
                setValues((prev) => ({ ...prev, error: data.error }));
            } else {
                setValues({ name: data.name, error: '', redirectToList: true });
            }
        } catch (err) {
            setValues((prev) => ({ ...prev, error: 'Update failed' }));
        }
    };

    const categoryForm = () => (
        <div className="wrap-login100 p-l-85 p-r-85 p-t-55 p-b-55">
            <form onSubmit={handleSubmit}>
                <span className="login100-form-title p-b-32 m-b-7">Update Category</span>
                <span className="txt1 p-b-11">Category Name</span>
                <div className="wrap-input100 validate-input m-b-36 mt-3">
                    <input
                        type="text"
                        className="input100"
                        value={name}
                        onChange={handleChange}
                        required
                        name="name"
                    />
                </div>
                <div className="w-size25">
                    <button type="submit" className="flex-c-m size2 bg1 bo-rad-23 hov1 m-text3 trans-0-4">
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );

    const showError = () =>
        error && (
            <div className="alert alert-danger" role="alert">
                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                {error}
            </div>
        );

    const goBackLink = () => (
        <div className="mt-4">
            <Link to="/admin/categories" className="text-info">
                ← Back to Category List
            </Link>
        </div>
    );

    return (
        <Layout
            title={`Hi ${user.name}`}
            description="Update an existing category"
            className="container-fluid"
        >
            <div className="row">
                <div className="col-md-8 offset-md-2 mb-5">
                    {showError()}
                    {categoryForm()}
                    {goBackLink()}
                    {redirectToList && <Navigate to="/admin/categories" replace />}
                </div>
            </div>
        </Layout>
    );
};

export default UpdateCategory;
