import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { getPurchaseHistory } from "./apiUser";
import moment from "moment";

const Dashboard = () => {
    const [history, setHistory] = useState([]);

    const {
        user: { _id, name, email, role }
    } = isAuthenticated();
    const token = isAuthenticated().token;

    useEffect(() => {
        getPurchaseHistory(_id, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setHistory(data);
            }
        });
    }, [_id, token]);

    const userLinks = () => (
        <div className="card">
            <h4 className="card-header">User Links</h4>
            <ul className="list-group">
                <li className="list-group-item">
                    <Link className="nav-link" to="/cart">My Cart</Link>
                </li>
                <li className="list-group-item">
                    <Link className="nav-link" to={`/profile/${_id}`}>Update Profile</Link>
                </li>
            </ul>
        </div>
    );

    const userInfo = () => (
        <div className="card mb-5">
            <h3 className="card-header">User Information</h3>
            <ul className="list-group">
                <li className="list-group-item">{name}</li>
                <li className="list-group-item">{email}</li>
                <li className="list-group-item">
                    {role === 1 ? "Admin" : "Registered User"}
                </li>
            </ul>
        </div>
    );

    const purchaseHistory = () => (
        <div className="card mb-5">
            <h3 className="card-header">Purchase History</h3>
            <ul className="list-group">
                {history.length === 0 ? (
                    <li className="list-group-item">No purchase history found.</li>
                ) : (
                    history.map((h, i) => (
                        <li key={i} className="list-group-item">
                            {h.products.map((p, j) => (
                                <div key={j} className="mb-4 border-bottom pb-3">
                                    <h6>Product Name: {p.name}</h6>
                                    <h6>Product Price: ₹{p.price}</h6>
                                    <h6>Quantity: {p.count}</h6>
                                    <h6>Amount: ₹{h.amount}</h6>
                                    <h6>Purchased On: {moment(p.createdAt).format('DD MMMM YYYY')}</h6>
                                    <h6>Order Status: {h.status}</h6>
                                    <h6>Delivery Address: {h.address}</h6>
                                </div>
                            ))}
                        </li>
                    ))
                )}
            </ul>
        </div>
    );

    return (
        <Layout
            title="Dashboard"
            description={`G'day ${name}!`}
            className="container-fluid"
        >
            <div className="row">
                <div className="col-3">{userLinks()}</div>
                <div className="col-9">
                    {userInfo()}
                    {purchaseHistory()}
                </div>
            </div>
        </Layout>
    );
};

export default Dashboard;
