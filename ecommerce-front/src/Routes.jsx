import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './core/Home';
import Shop from './core/Shop';
import Product from './core/Product';
import Cart from './core/Cart';
import Forgot from './core/Forgot';

import Signup from './user/Signup';
import Signin from './user/Signin';
import Dashboard from './user/UserDashboard';
import Profile from './user/Profile';

import AdminDashboard from './user/AdminDashboard';
import AddCategory from './admin/AddCategory';
import AddProduct from './admin/AddProduct';
import Orders from './admin/Orders';
import ManageProducts from './admin/ManageProducts';
import UpdateProduct from './admin/UpdateProduct';
import UpdateCategory from './admin/UpdateCategory';
import AddSupplier from './admin/AddSupplier';
import SendOrder from './admin/SendOrder';

import PrivateRoute from './auth/PrivateRoute';
import AdminRoute from './auth/AdminRoute';

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/signin" element={<Signin />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/product/:productId" element={<Product />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/signin/forgot" element={<Forgot />} />

                {/* Protected User Routes */}
                <Route element={<PrivateRoute />}>
                    <Route path="/user/dashboard" element={<Dashboard />} />
                    <Route path="/profile/:userId" element={<Profile />} />
                </Route>

                {/* Admin Routes */}
                <Route element={<AdminRoute />}>
                    <Route path="/admin/dashboard" element={<AdminDashboard />} />
                    <Route path="/create/category" element={<AddCategory />} />
                    <Route path="/create/product" element={<AddProduct />} />
                    <Route path="/admin/orders" element={<Orders />} />
                    <Route path="/admin/products" element={<ManageProducts />} />
                    <Route path="/admin/product/update/:productId" element={<UpdateProduct />} />
                    <Route path="/admin/category/update/:categoryId" element={<UpdateCategory />} />
                    <Route path="/create/supplier" element={<AddSupplier />} />
                    <Route path="/admin/product/order/:productId" element={<SendOrder />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;
