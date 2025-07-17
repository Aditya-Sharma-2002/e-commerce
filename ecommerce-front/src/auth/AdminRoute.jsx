import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { isAuthenticated } from './index';

const AdminRoute = () => {
    const location = useLocation();
    const auth = isAuthenticated();

    if (auth && auth.user.role === 1) {
        return <Outlet />;
    }

    return (
        <Navigate
            to="/signin"
            state={{ from: location }}
            replace
        />
    );
};

export default AdminRoute;
