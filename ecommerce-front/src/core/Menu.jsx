import React, { Fragment } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { signout, isAuthenticated } from "../auth";
import { itemTotal } from "./cartHelpers";

const Menu = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const isActive = (path) =>
        location.pathname === path ? { color: "#ff9900" } : { color: "#ffffff" };

    return (
        <div>
            <ul className="nav nav-tabs bg-primary">
                <li className="nav-item">
                    <Link className="nav-link" style={isActive("/")} to="/">
                        Home
                    </Link>
                </li>

                <li className="nav-item">
                    <Link className="nav-link" style={isActive("/shop")} to="/shop">
                        Shop
                    </Link>
                </li>

                <li className="nav-item">
                    <Link className="nav-link" style={isActive("/cart")} to="/cart">
                        Cart{" "}
                        <sup>
                            {itemTotal() > 0 && (
                                <small className="cart-badge">{itemTotal()}</small>
                            )}
                        </sup>
                    </Link>
                </li>

                {isAuthenticated() && isAuthenticated().user.role === 0 && (
                    <li className="nav-item">
                        <Link
                            className="nav-link"
                            style={isActive("/user/dashboard")}
                            to="/user/dashboard"
                        >
                            Dashboard
                        </Link>
                    </li>
                )}

                {isAuthenticated() && isAuthenticated().user.role === 1 && (
                    <li className="nav-item">
                        <Link
                            className="nav-link"
                            style={isActive("/admin/dashboard")}
                            to="/admin/dashboard"
                        >
                            Dashboard
                        </Link>
                    </li>
                )}

                {!isAuthenticated() && (
                    <Fragment>
                        <li className="nav-item">
                            <Link className="nav-link" style={isActive("/signin")} to="/signin">
                                Signin
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" style={isActive("/signup")} to="/signup">
                                Signup
                            </Link>
                        </li>
                    </Fragment>
                )}

                {isAuthenticated() && (
                    <li className="nav-item">
                        <span
                            className="nav-link"
                            style={{ cursor: "pointer", color: "#ffffff" }}
                            onClick={() => signout(() => navigate("/"))}
                        >
                            Signout
                        </span>
                    </li>
                )}
            </ul>
        </div>
    );
};

export default Menu;
