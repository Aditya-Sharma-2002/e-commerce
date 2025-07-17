import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { getProducts, deleteProduct } from './apiAdmin';

const ManageProducts = () => {
    const [products, setProducts] = useState([]);
    const { user, token } = isAuthenticated();

    const loadProducts = async () => {
        try {
            const data = await getProducts();
            if (data?.error) {
                console.error(data.error);
            } else {
                setProducts(data);
            }
        } catch (err) {
            console.error('Failed to load products', err);
        }
    };

    const handleDelete = async (productId) => {
        try {
            const data = await deleteProduct(productId, user._id, token);
            if (data?.error) {
                console.error(data.error);
            } else {
                loadProducts();
            }
        } catch (err) {
            console.error('Failed to delete product', err);
        }
    };

    useEffect(() => {
        loadProducts();
    }, []);

    return (
        <Layout
            title="Manage Products"
            description="Perform CRUD operations on products"
            className="container-fluid"
        >
            <div className="row">
                <div className="col-12">
                    <h2 className="text-center">Total {products.length} products</h2>
                    <hr />
                    <ul className="list-group">
                        {products.map((product) => (
                            <li
                                key={product._id}
                                className="list-group-item d-flex justify-content-between align-items-center flex-wrap"
                            >
                                <strong className="col-3 col-md-2">{product.name}</strong>
                                
                                <Link to={`/admin/product/update/${product._id}`} className="col-2">
                                    <span className="badge bg-warning text-dark w-100 text-center">Update</span>
                                </Link>

                                <Link to={`/admin/product/order/${product._id}`} className="col-2">
                                    <span className="badge bg-success w-100 text-center">Order</span>
                                </Link>

                                <button
                                    onClick={() => handleDelete(product._id)}
                                    className="btn btn-danger btn-sm col-2"
                                >
                                    Delete
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </Layout>
    );
};

export default ManageProducts;
