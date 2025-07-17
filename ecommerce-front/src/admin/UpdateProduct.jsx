import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { useParams, Navigate } from 'react-router-dom';
import { getProduct, getCategories, updateProduct, getSuppliers } from './apiAdmin';

const UpdateProduct = () => {
    const { user, token } = isAuthenticated();
    const { productId } = useParams();

    const [values, setValues] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        supplier: '',
        shipping: '',
        quantity: '',
        photo: '',
        loading: false,
        error: '',
        createdProduct: '',
        redirect: false,
        formData: new FormData()
    });

    const [categories, setCategories] = useState([]);
    const [suppliers, setSuppliers] = useState([]);

    const {
        name, description, price, category, supplier, shipping, quantity,
        loading, error, createdProduct, redirect, formData
    } = values;

    useEffect(() => {
        const init = async () => {
            try {
                const productData = await getProduct(productId);
                if (productData?.error) {
                    setValues(v => ({ ...v, error: productData.error }));
                } else {
                    setValues(v => ({
                        ...v,
                        name: productData.name,
                        description: productData.description,
                        price: productData.price,
                        category: productData.category._id,
                        supplier: productData.supplier._id,
                        shipping: productData.shipping ? "1" : "0",
                        quantity: productData.quantity,
                        formData: new FormData()
                    }));
                }

                const [categoryData, supplierData] = await Promise.all([
                    getCategories(),
                    getSuppliers()
                ]);

                if (!categoryData?.error) setCategories(categoryData);
                if (!supplierData?.error) setSuppliers(supplierData);
            } catch (err) {
                setValues(v => ({ ...v, error: 'Something went wrong while loading' }));
            }
        };
        init();
    }, [productId]);

    const handleChange = name => event => {
        const value = name === 'photo' ? event.target.files[0] : event.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value });
    };

    const clickSubmit = async (e) => {
        e.preventDefault();
        setValues({ ...values, error: '', loading: true });

        try {
            const data = await updateProduct(productId, user._id, token, formData);
            if (data?.error) {
                setValues(v => ({ ...v, error: data.error, loading: false }));
            } else {
                setValues({
                    ...values,
                    name: '',
                    description: '',
                    price: '',
                    category: '',
                    supplier: '',
                    shipping: '',
                    quantity: '',
                    photo: '',
                    loading: false,
                    createdProduct: data.name,
                    redirect: true
                });
            }
        } catch (err) {
            setValues(v => ({ ...v, error: 'Update failed', loading: false }));
        }
    };

    const updateForm = () => (
        <form onSubmit={clickSubmit} className="mb-3">
            <h4>Update Product Details</h4>
            <div className="form-group">
                <label className="btn btn-secondary">
                    Upload Photo
                    <input onChange={handleChange('photo')} type="file" accept="image/*" className="form-control-file" />
                </label>
            </div>

            <div className="form-group">
                <label>Name</label>
                <input type="text" className="form-control" value={name} onChange={handleChange('name')} required />
            </div>

            <div className="form-group">
                <label>Description</label>
                <textarea className="form-control" value={description} onChange={handleChange('description')} required />
            </div>

            <div className="form-group">
                <label>Price</label>
                <input type="number" className="form-control" value={price} onChange={handleChange('price')} required />
            </div>

            <div className="form-group">
                <label>Category</label>
                <select className="form-control" value={category} onChange={handleChange('category')} required>
                    <option value="">Select</option>
                    {categories.map((c, i) => (
                        <option key={i} value={c._id}>{c.name}</option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <label>Supplier</label>
                <select className="form-control" value={supplier} onChange={handleChange('supplier')} required>
                    <option value="">Select</option>
                    {suppliers.map((s, i) => (
                        <option key={i} value={s._id}>{s.name}</option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <label>Shipping</label>
                <select className="form-control" value={shipping} onChange={handleChange('shipping')} required>
                    <option value="">Select</option>
                    <option value="1">Yes</option>
                    <option value="0">No</option>
                </select>
            </div>

            <div className="form-group">
                <label>Quantity</label>
                <input type="number" className="form-control" value={quantity} onChange={handleChange('quantity')} required />
            </div>

            <button className="btn btn-outline-primary">Update Product</button>
        </form>
    );

    const showError = () =>
        error && <div className="alert alert-danger">{error}</div>;

    const showSuccess = () =>
        createdProduct && <div className="alert alert-info">{`${createdProduct} is updated`}</div>;

    const showLoading = () =>
        loading && <div className="alert alert-warning">Loading...</div>;

    return (
        <Layout title="Update Product" description={`Hi ${user.name}, update your product here`} className="container-fluid">
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showLoading()}
                    {showSuccess()}
                    {showError()}
                    {updateForm()}
                    {redirect && <Navigate to="/admin/products" replace />}
                </div>
            </div>
        </Layout>
    );
};

export default UpdateProduct;
