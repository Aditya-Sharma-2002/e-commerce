import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Layout from './Layout';
import { read, listRelated } from './apiCore';
import Card from './Card';

const Product = () => {
    const { productId } = useParams(); // <-- Use useParams instead of match

    const [product, setProduct] = useState({});
    const [relatedProduct, setRelatedProduct] = useState([]);
    const [error, setError] = useState(false);

    const loadSingleProduct = productId => {
        read(productId).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setProduct(data);
                listRelated(data._id).then(related => {
                    if (related.error) {
                        setError(related.error);
                    } else {
                        setRelatedProduct(related);
                    }
                });
            }
        });
    };

    useEffect(() => {
        if (productId) {
            loadSingleProduct(productId);
        }
    }, [productId]);

    return (
        <Layout
            title={product.name}
            description={product.description && product.description.substring(0, 100)}
            className="container-fluid"
        >
            <div className="row">
                <div className="col-md-4">
                    {product && product.description && (
                        <Card product={product} showViewProductButton={false} />
                    )}
                </div>

                <div className="col-md-8">
                    <h4 className="mb-4">Related Products</h4>
                    <div className="row">
                        {relatedProduct.map((p, i) => (
                            <div className="col-md-4 mb-3" key={i}>
                                <Card product={p} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Product;
