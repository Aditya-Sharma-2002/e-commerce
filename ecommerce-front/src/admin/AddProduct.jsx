import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import {
  createProduct,
  getCategories,
  getSuppliers,
  createProductSize,
} from "./apiAdmin";

const AddProduct = () => {
  const initialState = {
    name: "",
    suppliers: [],
    supplier: "",
    size: false,
    description: "",
    price: "",
    categories: [],
    category: "",
    shipping: "",
    quantity: "",
    photo: "",
    loading: false,
    error: "",
    createdProduct: "",
    formData: new FormData(),
    sizeVal: "",
    s: "",
    m: "",
    l: "",
    xl: "",
    xxl: "",
  };

  const [values, setValues] = useState(initialState);
  const [checkVal, setCheck] = useState({
    s: false,
    m: false,
    l: false,
    xl: false,
    xxl: false,
  });

  const { user, token } = isAuthenticated();

  useEffect(() => {
    const init = async () => {
      try {
        const categories = await getCategories();
        const suppliers = await getSuppliers();

        if (categories.error || suppliers.error) {
          setValues((prev) => ({
            ...prev,
            error: categories.error || suppliers.error,
          }));
        } else {
          setValues((prev) => ({
            ...prev,
            categories,
            suppliers,
            formData: new FormData(),
          }));
        }
      } catch (err) {
        setValues((prev) => ({ ...prev, error: "Error loading initial data" }));
      }
    };

    init();
  }, []);

  const handleChange = (name) => (e) => {
    const value = name === "photo" ? e.target.files[0] : e.target.value;
    values.formData.set(name, value);
    setValues((prev) => ({ ...prev, [name]: value, error: "" }));
  };

  const enableBox = (size) => () => {
    setCheck((prev) => ({ ...prev, [size]: !prev[size] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValues((prev) => ({ ...prev, loading: true, error: "" }));

    try {
      const data = await createProduct(user._id, token, values.formData);
      if (data.error) {
        setValues((prev) => ({ ...prev, error: data.error, loading: false }));
      } else {
        setValues({ ...initialState, createdProduct: data.name });
      }
    } catch (err) {
      setValues((prev) => ({ ...prev, error: "Failed to create product" }));
    }
  };

  const newPostForm = () => (
    <form className="mb-3" onSubmit={handleSubmit}>
      <div className="form-group mb-3">
        <label className="text-muted">Photo</label>
        <input
          type="file"
          accept="image/*"
          className="form-control"
          onChange={handleChange("photo")}
        />
      </div>

      <div className="form-group mb-3">
        <label className="text-muted">Name</label>
        <input
          type="text"
          className="form-control"
          value={values.name}
          onChange={handleChange("name")}
        />
      </div>

      <div className="form-group mb-3">
        <label className="text-muted">Suppliers</label>
        <select className="form-control" onChange={handleChange("supplier")}>
          <option value="">Select supplier</option>
          {values.suppliers.map((s, i) => (
            <option key={i} value={s._id}>
              {s.name}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group mb-3">
        <label className="text-muted">Description</label>
        <textarea
          className="form-control"
          value={values.description}
          onChange={handleChange("description")}
        />
      </div>

      <div className="form-group mb-3">
        <label className="text-muted">Price</label>
        <input
          type="number"
          className="form-control"
          value={values.price}
          onChange={handleChange("price")}
        />
      </div>

      <div className="form-group mb-3">
        <label className="text-muted">Category</label>
        <select className="form-control" onChange={handleChange("category")}>
          <option value="">Select category</option>
          {values.categories.map((c, i) => (
            <option key={i} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group mb-3">
        <label className="text-muted">Shipping</label>
        <select className="form-control" onChange={handleChange("shipping")}>
          <option value="">Select shipping</option>
          <option value="0">No</option>
          <option value="1">Yes</option>
        </select>
      </div>

      <div className="form-group mb-3">
        <label className="text-muted">Quantity</label>
        <input
          type="number"
          className="form-control"
          value={values.quantity}
          onChange={handleChange("quantity")}
        />
      </div>

      <button type="submit" className="btn btn-outline-primary">
        Create Product
      </button>
    </form>
  );

  return (
    <Layout
      title="Add a new product"
      description={`Hello ${user?.name || "admin"}, ready to add a product?`}
    >
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {values.loading && (
            <div className="alert alert-info">Loading...</div>
          )}
          {values.error && (
            <div className="alert alert-danger">{values.error}</div>
          )}
          {values.createdProduct && (
            <div className="alert alert-success">
              {values.createdProduct} created!
            </div>
          )}
          {newPostForm()}
        </div>
      </div>
    </Layout>
  );
};

export default AddProduct;
