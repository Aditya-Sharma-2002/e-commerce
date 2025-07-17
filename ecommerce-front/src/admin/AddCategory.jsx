import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { createCategory } from "./apiAdmin";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const { user, token } = isAuthenticated();

  const handleChange = (e) => {
    setError("");
    setName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    try {
      const data = await createCategory(user._id, token, { name });
      if (data.error) {
        setError(data.error);
      } else {
        setSuccess(true);
        setName(""); // Reset input
      }
    } catch (err) {
      setError("Something went wrong." , err);
    }
  };

  return (
    <Layout
      title="Add a new category"
      description={`G'day ${user?.name || "Admin"}, ready to add a new category?`}
    >
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {success && <h3 className="text-success">{name} is created</h3>}
          {error && <h3 className="text-danger">Category should be unique</h3>}

          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <label className="text-muted">Name</label>
              <input
                type="text"
                className="form-control"
                onChange={handleChange}
                value={name}
                autoFocus
                required
              />
            </div>
            <button type="submit" className="btn btn-outline-primary">
              Create Category
            </button>
          </form>

          <div className="mt-5">
            <Link to="/admin/dashboard" className="text-warning">
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AddCategory;
