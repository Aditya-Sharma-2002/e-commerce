import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { getProduct, sendOrder } from "./apiAdmin";

const SendOrder = () => {
    const { productId } = useParams();
    const { user } = isAuthenticated();

    const [product, setProduct] = useState({});
    const [formState, setFormState] = useState({
        quantity: 1,
        message: "",
        success: false,
        error: false
    });

    const { quantity, message, success, error } = formState;

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await getProduct(productId);
                if (data?.error) {
                    setFormState((prev) => ({ ...prev, error: true }));
                } else {
                    setProduct(data);
                }
            } catch (err) {
                console.error(err);
                setFormState((prev) => ({ ...prev, error: true }));
            }
        };
        fetchProduct();
    }, [productId]);

    const handleChange = (field) => (e) => {
        setFormState({ ...formState, [field]: e.target.value, error: false, success: false });
    };

    const clickSubmit = async (e) => {
        e.preventDefault();
        try {
            await sendOrder({
                name: product.name,
                description: product.description,
                supplier: product?.supplier?.name || '',
                email: product?.supplier?.email || '',
                category: product?.category?.name || '',
                quantity,
                message
            });
            setFormState({
                quantity: 1,
                message: "",
                success: true,
                error: false
            });
        } catch (err) {
            console.error(err);
            setFormState({ ...formState, error: true, success: false });
        }
    };

    const renderForm = () => (
        <form onSubmit={clickSubmit}>
            <div className="form-group">
                <label className="text-muted">Product Name</label>
                <input type="text" className="form-control" value={product.name || ""} disabled />
            </div>

            <div className="form-group">
                <label className="text-muted">Description</label>
                <input type="text" className="form-control" value={product.description || ""} disabled />
            </div>

            <div className="form-group">
                <label className="text-muted">Supplier</label>
                <input type="text" className="form-control" value={product?.supplier?.name || ""} disabled />
            </div>

            <div className="row">
                <div className="col-6">
                    <label className="text-muted">Category</label>
                    <input type="text" className="form-control" value={product?.category?.name || ""} disabled />
                </div>
                <div className="col-6">
                    <label className="text-muted">Quantity</label>
                    <input
                        type="number"
                        className="form-control"
                        min={1}
                        value={quantity}
                        onChange={handleChange("quantity")}
                        required
                    />
                </div>
            </div>

            <div className="form-group mt-3">
                <label className="text-muted">Message</label>
                <textarea
                    className="form-control"
                    rows="4"
                    value={message}
                    onChange={handleChange("message")}
                    required
                />
            </div>

            <button className="btn btn-outline-primary mt-3" disabled={!message}>
                Send Order
            </button>
        </form>
    );

    const showSuccess = () =>
        success && <h4 className="text-success mt-3">Order sent successfully!</h4>;

    const showError = () =>
        error && <h4 className="text-danger mt-3">Something went wrong while sending the order.</h4>;

    return (
        <Layout title="Send Order" description={`G'day ${user.name}, send an order to your supplier.`}>
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showSuccess()}
                    {showError()}
                    {renderForm()}
                    <div className="mt-4">
                        <Link to="/admin/dashboard" className="text-warning">
                            ← Back to Dashboard
                        </Link>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default SendOrder;
