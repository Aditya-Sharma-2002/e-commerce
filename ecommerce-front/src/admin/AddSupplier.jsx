import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { getCategories, createSupplier } from "./apiAdmin";

const AddSupplier = () => {
  const [values, setValues] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    category: "",
    categories: [],
    error: "",
    success: false,
  });

  const { user, token } = isAuthenticated();

  useEffect(() => {
    const init = async () => {
      try {
        const data = await getCategories();
        if (data.error) {
          setValues((prev) => ({ ...prev, error: data.error }));
        } else {
          setValues((prev) => ({ ...prev, categories: data }));
        }
      } catch (err) {
        setValues((prev) => ({
          ...prev,
          error: "Failed to load categories",
        }));
      }
    };
    init();
  }, []);

  const handleChange = (field) => (e) => {
    const value = field === "phone" ? parseInt(e.target.value, 10) || "" : e.target.value;
    setValues((prev) => ({
      ...prev,
      [field]: value,
      error: "",
      success: false,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const supplier = {
      name: values.name,
      phone: values.phone,
      email: values.email,
      category: values.category,
      address: values.address,
    };

    try {
      const data = await createSupplier(user._id, token, supplier);
      if (data.error) {
        setValues((prev) => ({ ...prev, error: data.error }));
      } else {
        setValues((prev) => ({
          ...prev,
          name: "",
          phone: "",
          email: "",
          address: "",
          category: "",
          success: true,
          error: "",
        }));
      }
    } catch (err) {
      setValues((prev) => ({
        ...prev,
        error: "Something went wrong while creating supplier",
      }));
    }
  };

  const showSuccess = () =>
    values.success && (
      <div className="alert alert-success">{values.name} is created</div>
    );

  const showError = () =>
    values.error && <div className="alert alert-danger">{values.error}</div>;

  const goBack = () => (
    <div className="mt-5">
      <Link to="/admin/dashboard" className="text-warning">
        Back to Dashboard
      </Link>
    </div>
  );

  const newSupplierForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group mb-3">
        <label className="text-muted">Name</label>
        <input
          type="text"
          className="form-control"
          value={values.name}
          onChange={handleChange("name")}
          required
        />
      </div>

      <div className="form-group mb-3">
        <label className="text-muted">Phone number</label>
        <input
          type="number"
          className="form-control"
          value={values.phone}
          onChange={handleChange("phone")}
          required
        />
      </div>

      <div className="form-group mb-3">
        <label className="text-muted">Email</label>
        <input
          type="email"
          className="form-control"
          value={values.email}
          onChange={handleChange("email")}
          required
        />
      </div>

      <div className="form-group mb-3">
        <label className="text-muted">Category</label>
        <select
          className="form-control"
          value={values.category}
          onChange={handleChange("category")}
          required
        >
          <option value="">Select category</option>
          {values.categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group mb-3">
        <label className="text-muted">Address</label>
        <input
          type="text"
          className="form-control"
          value={values.address}
          onChange={handleChange("address")}
          required
        />
      </div>

      <button type="submit" className="btn btn-outline-primary">
        Create Supplier
      </button>
    </form>
  );

  return (
    <Layout
      title="Add a new supplier"
      description={`Hello ${user?.name}, ready to add a supplier?`}
    >
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {showSuccess()}
          {showError()}
          {newSupplierForm()}
          {goBack()}
        </div>
      </div>
    </Layout>
  );
};

export default AddSupplier;
