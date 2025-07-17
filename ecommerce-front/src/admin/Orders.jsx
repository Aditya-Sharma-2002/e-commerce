import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import {
    listOrders,
    getStatusValues,
    updateOrderStatus,
    fromTo
} from './apiAdmin';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [statusValues, setStatusValues] = useState([]);
    const [selectedDateFrom, setSelectedDateFrom] = useState(null);
    const [selectedDateTo, setSelectedDateTo] = useState(null);

    const { user, token } = isAuthenticated();

    const loadOrders = async () => {
        try {
            const data = await listOrders(user._id, token);
            if (data?.error) {
                console.error(data.error);
            } else {
                setOrders(data.filter(Boolean)); // remove nulls
            }
        } catch (err) {
            console.error('Error loading orders', err);
        }
    };

    const loadStatusValues = async () => {
        try {
            const data = await getStatusValues(user._id, token);
            if (!data?.error) {
                setStatusValues(data);
            }
        } catch (err) {
            console.error('Error loading status values', err);
        }
    };

    useEffect(() => {
        loadOrders();
        loadStatusValues();
    }, []);

    const handleSubmitDate = async (e) => {
        e.preventDefault();
        try {
            const data = await fromTo({ selectedDateFrom, selectedDateTo });
            if (!data?.error) {
                setOrders(data.result || []);
            }
        } catch (err) {
            console.error('Error filtering by date', err);
        }
    };

    const handleStatusChange = async (e, orderId) => {
        try {
            const newStatus = e.target.value;
            await updateOrderStatus(user._id, token, orderId, newStatus);
            loadOrders();
        } catch (err) {
            console.error('Status update failed', err);
        }
    };

    const showInput = (label, value) => (
        <div className="input-group mb-2">
            <span className="input-group-text">{label}</span>
            <input type="text" value={value} className="form-control" readOnly />
        </div>
    );

    const renderStatusSelect = (order) => (
        <div className="form-group">
            <h4 className="mb-2">Status: <span className="badge bg-secondary">{order.status}</span></h4>
            <select className="form-select" onChange={(e) => handleStatusChange(e, order._id)}>
                <option>Update Status</option>
                {statusValues.map((status, idx) => (
                    <option key={idx} value={status}>{status}</option>
                ))}
            </select>
        </div>
    );

    const renderOrderDetails = () => {
        if (!orders.length) {
            return <h3 className="text-danger mt-4">No orders found.</h3>;
        }

        return orders.map((order, idx) => (
            <div key={idx} className="mt-5 p-3 border border-primary rounded">
                <h5 className="mb-3">Order ID: <span className="text-primary">{order._id}</span></h5>

                <ul className="list-group mb-3">
                    <li className="list-group-item">{renderStatusSelect(order)}</li>
                    <li className="list-group-item">Transaction ID: {order.transaction_id}</li>
                    <li className="list-group-item">Amount: ₹{order.amount}</li>
                    <li className="list-group-item">Ordered by: {order.user?.name}</li>
                    <li className="list-group-item">Mobile: {order.user?.phone}</li>
                    <li className="list-group-item">Ordered on: {moment(order.createdAt).format('DD MMMM YYYY')}</li>
                    <li className="list-group-item">Delivery Address: {order.address}</li>
                </ul>

                <h6 className="mb-3">Products in this order: {order.products.length}</h6>

                {order.products.map((product, pIndex) => (
                    <div key={pIndex} className="mb-3 p-2 border border-light rounded bg-light">
                        {showInput('Product Name', product.name)}
                        {showInput('Price', product.price)}
                        {showInput('Quantity', product.count)}
                        {showInput('Product ID', product._id)}
                    </div>
                ))}
            </div>
        ));
    };

    return (
        <Layout
            title="Orders"
            description={`Hi ${user.name}, manage your customer orders below.`}
            className="container-fluid"
        >
            <div className="row mb-4">
                <div className="col-md-8 offset-md-2">
                    <h4>Filter Orders By Date</h4>
                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label className="form-label">From</label>
                            <DatePicker
                                selected={selectedDateFrom}
                                onChange={setSelectedDateFrom}
                                dateFormat="dd MMMM yyyy"
                                maxDate={selectedDateTo || new Date()}
                                className="form-control"
                                placeholderText="Select start date"
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">To</label>
                            <DatePicker
                                selected={selectedDateTo}
                                onChange={setSelectedDateTo}
                                dateFormat="dd MMMM yyyy"
                                minDate={selectedDateFrom}
                                maxDate={new Date()}
                                className="form-control"
                                placeholderText="Select end date"
                            />
                        </div>
                    </div>
                    <button onClick={handleSubmitDate} className="btn btn-primary">Apply Filter</button>
                    <hr />
                    {renderOrderDetails()}
                </div>
            </div>
        </Layout>
    );
};

export default Orders;
