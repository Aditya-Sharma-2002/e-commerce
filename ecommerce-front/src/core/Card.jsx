import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom'; // updated import
import ShowImage from './ShowImage';
import moment from 'moment';
import { addItem, updateItem, removeItem } from './cartHelpers';

const Card = ({
  product,
  showViewProductButton = true,
  showAddToCartButton = true,
  cartUpdate = false,
  showRemoveProductButton = false,
  setRun = f => f,
  run = undefined
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);
  const [selectedSize, setSelectedSize] = useState('');
  const [hasSize, setHasSize] = useState(false);

  useEffect(() => {
    if (product.s || product.m || product.l || product.xl || product.xxl) {
      setHasSize(true);
    }
  }, [product]);

  const addToCart = () => {
    if (hasSize && !selectedSize) {
      alert('Please select a size');
      return;
    }
    addItem(product, selectedSize, () => setRedirect(true));
  };

  const showViewButton = () =>
    showViewProductButton && (
      <Link to={`/product/${product._id}`} className="mr-2">
        <button className="btn btn-outline-primary mt-2 mb-2 card-btn-1">View Product</button>
      </Link>
    );

  const showAddToCartBtn = () =>
    showAddToCartButton && (
      <button onClick={addToCart} className="btn btn-outline-warning mt-2 mb-2 card-btn-1">
        Add to cart
      </button>
    );

  const showRemoveButton = () =>
    showRemoveProductButton && (
      <button
        onClick={() => {
          removeItem(product._id);
          setRun(!run);
        }}
        className="btn btn-outline-danger mt-2 mb-2"
      >
        Remove Product
      </button>
    );

  const handleChange = productId => event => {
    setRun(!run);
    const value = event.target.value < 1 ? 1 : event.target.value;
    setCount(value);
    updateItem(productId, value);
  };

  const showCartUpdateOptions = () =>
    cartUpdate && (
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text">Adjust Quantity</span>
        </div>
        <input
          type="number"
          className="form-control"
          value={count}
          onChange={handleChange(product._id)}
          min="1"
        />
      </div>
    );

  const showSizeSelector = () =>
    hasSize && (
      <div className="mb-2">
        {product.s > 0 && (
          <button onClick={() => setSelectedSize('s')} className="btn btn-outline-secondary btn-sm mr-1">
            S ({product.s})
          </button>
        )}
        {product.m > 0 && (
          <button onClick={() => setSelectedSize('m')} className="btn btn-outline-secondary btn-sm mr-1">
            M ({product.m})
          </button>
        )}
        {product.l > 0 && (
          <button onClick={() => setSelectedSize('l')} className="btn btn-outline-secondary btn-sm mr-1">
            L ({product.l})
          </button>
        )}
        {product.xl > 0 && (
          <button onClick={() => setSelectedSize('xl')} className="btn btn-outline-secondary btn-sm mr-1">
            XL ({product.xl})
          </button>
        )}
        {product.xxl > 0 && (
          <button onClick={() => setSelectedSize('xxl')} className="btn btn-outline-secondary btn-sm">
            XXL ({product.xxl})
          </button>
        )}
      </div>
    );

  const showStock = () => {
    const totalStock = hasSize
      ? (product.s || 0) + (product.m || 0) + (product.l || 0) + (product.xl || 0) + (product.xxl || 0)
      : product.quantity;

    return totalStock > 0 ? (
      <span className="badge badge-primary badge-pill">In Stock ({totalStock})</span>
    ) : (
      <span className="badge badge-danger badge-pill">Out of Stock</span>
    );
  };

  return (
    <div className="card">
      <div className="card-header">{product.name}</div>
      <div className="card-body">
        {redirect && <Navigate to="/cart" replace />} {/* updated logic */}
        <ShowImage item={product} url="product" />
        <p className="card-p mt-2">{product.description.substring(0, 100)}</p>
        <p className="card-p black-10">₹ {product.price}</p>
        <p className="black-9">Category: {product.category && product.category.name}</p>
        <p className="black-8">Added on {moment(product.createdAt).format('DD MMMM YYYY')}</p>
        {showStock()}
        {showSizeSelector()}
        {showViewButton()}
        {showAddToCartBtn()}
        {showRemoveButton()}
        {showCartUpdateOptions()}
      </div>
    </div>
  );
};

export default Card;
