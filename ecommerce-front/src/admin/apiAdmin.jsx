import { API } from "../config";

// ---------- CATEGORY ----------
export const createCategory = async (userId, token, category) => {
  try {
    const res = await fetch(`${API}/category/create/${userId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(category),
    });
    return await res.json();
  } catch (err) {
    console.error("Create Category Error:", err);
  }
};

export const updateCategory = async (categoryId, userId, token, category) => {
  try {
    const res = await fetch(`${API}/category/${categoryId}/${userId}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(category),
    });
    return await res.json();
  } catch (err) {
    console.error("Update Category Error:", err);
  }
};

export const getCategory = async (categoryId) => {
  try {
    const res = await fetch(`${API}/category/${categoryId}`);
    return await res.json();
  } catch (err) {
    console.error("Get Category Error:", err);
  }
};

export const getCategories = async () => {
  try {
    const res = await fetch(`${API}/categories`);
    return await res.json();
  } catch (err) {
    console.error("Get Categories Error:", err);
  }
};

// ---------- PRODUCT ----------
export const createProduct = async (userId, token, product) => {
  try {
    const res = await fetch(`${API}/product/create/${userId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: product,
    });
    return await res.json();
  } catch (err) {
    console.error("Create Product Error:", err);
  }
};

export const createProductSize = async (userId, token, product) => {
  try {
    const res = await fetch(`${API}/product/createSize/${userId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: product,
    });
    return await res.json();
  } catch (err) {
    console.error("Create Product Size Error:", err);
  }
};

export const getProducts = async () => {
  try {
    const res = await fetch(`${API}/products?limit=undefined`);
    return await res.json();
  } catch (err) {
    console.error("Get Products Error:", err);
  }
};

export const getProduct = async (productId) => {
  try {
    const res = await fetch(`${API}/product/${productId}`);
    return await res.json();
  } catch (err) {
    console.error("Get Product Error:", err);
  }
};

export const updateProduct = async (productId, userId, token, product) => {
  try {
    const res = await fetch(`${API}/product/${productId}/${userId}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: product,
    });
    return await res.json();
  } catch (err) {
    console.error("Update Product Error:", err);
  }
};

export const deleteProduct = async (productId, userId, token) => {
  try {
    const res = await fetch(`${API}/product/${productId}/${userId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return await res.json();
  } catch (err) {
    console.error("Delete Product Error:", err);
  }
};

// ---------- SUPPLIER ----------
export const createSupplier = async (userId, token, supplier) => {
  try {
    const res = await fetch(`${API}/supplier/create`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(supplier),
    });
    return await res.json();
  } catch (err) {
    console.error("Create Supplier Error:", err);
  }
};

export const getSuppliers = async () => {
  try {
    const res = await fetch(`${API}/suppliers`);
    return await res.json();
  } catch (err) {
    console.error("Get Suppliers Error:", err);
  }
};

export const sendOrder = async (data) => {
  try {
    const res = await fetch(`${API}/supplier/sendorder`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (err) {
    console.error("Send Order Error:", err);
  }
};

// ---------- ORDERS ----------
export const listOrders = async (userId, token) => {
  try {
    const res = await fetch(`${API}/order/list/${userId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return await res.json();
  } catch (err) {
    console.error("List Orders Error:", err);
  }
};

export const getStatusValues = async (userId, token) => {
  try {
    const res = await fetch(`${API}/order/status-values/${userId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return await res.json();
  } catch (err) {
    console.error("Get Status Values Error:", err);
  }
};

export const updateOrderStatus = async (userId, token, orderId, status) => {
  try {
    const res = await fetch(`${API}/order/${orderId}/status/${userId}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status, orderId }),
    });
    return await res.json();
  } catch (err) {
    console.error("Update Order Status Error:", err);
  }
};

export const fromTo = async (dates) => {
  try {
    const res = await fetch(`${API}/order/fromTo`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dates),
    });
    return await res.json();
  } catch (err) {
    console.error("Order From-To Error:", err);
  }
};
