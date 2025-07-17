import React, { useState, useEffect } from 'react';
import { getBraintreeClientToken, processPayment, createOrder } from './apiCore';
import { emptyCart } from './cartHelpers';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import DropIn from 'braintree-web-drop-in-react';

const Checkout = ({ products, setRun = f => f, run = undefined }) => {
    const [data, setData] = useState({
        loading: false,
        success: false,
        clientToken: null,
        error: '',
        instance: null,
        address: ''
    });

    const { user, token } = isAuthenticated() || {};
    const userId = user && user._id;

    useEffect(() => {
        if (userId && token) {
            getBraintreeClientToken(userId, token).then(data => {
                if (data.error) {
                    setData(prevData => ({ ...prevData, error: data.error }));
                } else {
                    setData(prevData => ({ ...prevData, clientToken: data.clientToken }));
                }
            });
        }
    }, [userId, token]);

    const handleAddress = event => {
        setData({ ...data, address: event.target.value });
    };

    const getTotal = () =>
        products.reduce((total, product) => total + product.count * product.price, 0);

    const buy = () => {
    if (!data.instance) {
        setData({ ...data, error: "Payment system not initialized." });
        return;
    }

    setData({ ...data, loading: true });

    data.instance
        .requestPaymentMethod()
        .then(result => {
            const nonce = result.nonce;
            const paymentData = {
                paymentMethodNonce: nonce,
                amount: getTotal(products)
            };

            return processPayment(userId, token, paymentData);
        })
        .then(response => {
            const orderData = {
                products,
                transaction_id: response.transaction.id,
                amount: response.transaction.amount,
                address: data.address
            };

            return createOrder(userId, token, orderData);
        })
        .then(() => {
            emptyCart(() => {
                setRun(!run);
                setData({ ...data, loading: false, success: true });
            });
        })
        .catch(error => {
            setData({ ...data, loading: false, error: error.message });
        });
};

    const showDropIn = () => (
        <div onBlur={() => setData({ ...data, error: '' })}>
            {data.clientToken && products.length > 0 && (
                <div>
                    <div className="form-group mb-3">
                        <label className="text-muted">Delivery address:</label>
                        <textarea
                            onChange={handleAddress}
                            className="form-control"
                            value={data.address}
                            placeholder="Type your delivery address here..."
                        />
                    </div>

                    <DropIn
                        options={{
                            authorization: data.clientToken
                        }}
                        onInstance={instance => setData(prevData => ({ ...prevData, instance }))}
                    />

                    <button
                        onClick={buy}
                        style={{ display: data.address ? '' : 'none' }}
                        className="btn btn-success btn-block"
                    >
                        Pay
                    </button>
                </div>
            )}
        </div>
    );

    const showCheckout = () =>
        isAuthenticated() ? (
            <div>{showDropIn()}</div>
        ) : (
            <Link to="/signin">
                <button className="btn btn-primary">Sign in to checkout</button>
            </Link>
        );

    const showError = error =>
        error && (
            <div className="alert alert-danger">
                {error}
            </div>
        );

    const showSuccess = success =>
        success && (
            <div className="alert alert-info">
                Thanks! Your payment was successful!
            </div>
        );

    const showLoading = loading => loading && <h2 className="text-danger">Loading...</h2>;

    return (
        <div>
            <h2>Total: ₹{getTotal()}</h2>
            {showLoading(data.loading)}
            {showSuccess(data.success)}
            {showError(data.error)}
            {showCheckout()}
        </div>
    );
};

export default Checkout;
