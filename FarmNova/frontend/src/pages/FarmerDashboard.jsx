import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

// Dummy data for demonstration
const initialProducts = [
  {
    id: 1,
    name: "Tomatoes",
    price: 40,
    quantity: 100,
    category: "Vegetable",
    description: "Fresh farm tomatoes",
    image: "../assets/products/tomatoes.jpg",
    sales: 30,
  },
  {
    id: 2,
    name: "Carrots",
    price: 30,
    quantity: 80,
    category: "Vegetable",
    description: "Organic carrots",
    image: "",
    sales: 20,
  },
];

const categories = ["Vegetable", "Fruit", "Grain", "Dairy", "Other"];

const CollapsibleCard = ({ title, children, defaultOpen = false }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="bg-white rounded shadow mb-6">
      <button
        className="w-full flex justify-between items-center px-6 py-4 font-semibold text-lg focus:outline-none"
        onClick={() => setOpen((v) => !v)}
      >
        <span>{title}</span>
        <span>{open ? "▲" : "▼"}</span>
      </button>
      {open && <div className="px-6 pb-6">{children}</div>}
    </div>
  );
};

const FarmerDashboard = () => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    fetch("/api/orders/farmer", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setOrders(Array.isArray(data) ? data : []));
  }, []);

  // Product state
  const [products, setProducts] = useState(initialProducts);
  const [form, setForm] = useState({
    name: "",
    price: "",
    quantity: "",
    category: categories[0],
    description: "",
    image: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  // Sales stats
  const totalRevenue = orders.reduce((sum, o) => sum + o.price, 0);
  const totalSold = orders.reduce((sum, o) => sum + o.quantity, 0);
  const dailySales = [
    { date: "2024-06-01", count: 5 },
    { date: "2024-06-02", count: 8 },
    { date: "2024-06-03", count: 4 },
    { date: "2024-06-04", count: 7 },
  ];

  // Product performance chart data
  const productChartData = products.map((p) => ({
    name: p.name,
    sales: p.sales,
  }));

  // Add/Edit Product handlers
  const handleFormChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files && files[0]) {
      setForm((f) => ({ ...f, image: files[0] }));
      setImagePreview(URL.createObjectURL(files[0]));
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      setProducts((ps) =>
        ps.map((p) =>
          p.id === editingId
            ? {
                ...p,
                ...form,
                price: Number(form.price),
                quantity: Number(form.quantity),
                image: imagePreview || p.image,
              }
            : p
        )
      );
      setEditingId(null);
    } else {
      setProducts((ps) => [
        ...ps,
        {
          ...form,
          id: Date.now(),
          price: Number(form.price),
          quantity: Number(form.quantity),
          image: imagePreview,
          sales: 0,
        },
      ]);
    }
    setForm({
      name: "",
      price: "",
      quantity: "",
      category: categories[0],
      description: "",
      image: "",
    });
    setImagePreview("");
  };

  const handleEdit = (product) => {
    setForm({
      name: product.name,
      price: product.price,
      quantity: product.quantity,
      category: product.category,
      description: product.description,
      image: product.image,
    });
    setImagePreview(product.image);
    setEditingId(product.id);
  };

  const handleDelete = (id) => {
    setProducts((ps) => ps.filter((p) => p.id !== id));
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h2 className="text-2xl font-bold mb-6">Farmer Dashboard</h2>
      <div className="bg-white rounded shadow p-6 mb-6">
        <h3 className="font-semibold mb-2">Sales/Orders</h3>
        {orders.length === 0 ? (
          <div className="text-gray-500">No sales/orders found.</div>
        ) : (
          <ul>
            {orders.map((order) => (
              <li key={order._id} className="mb-2">
                <div>
                  <span className="font-bold">Order Total:</span> ₹{order.total}
                  <br />
                  <span className="font-bold">Status:</span> {order.paymentStatus}
                  <br />
                  <span className="font-bold">Payment ID:</span> {order.paymentId}
                  <br />
                  <span className="font-bold">Date:</span> {new Date(order.createdAt).toLocaleString()}
                </div>
                <div>
                  {order.items
                    .filter((item) => item.farm === /* farmer name from token or profile */ "")
                    .map((item, idx) => (
                      <span key={idx}>
                        {item.name} x {item.quantity} &nbsp;
                      </span>
                    ))}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* 1. Add/Edit Product */}
      <CollapsibleCard title="Add / Edit Product" defaultOpen>
        <form
          className="flex flex-col md:flex-row md:items-end gap-4"
          onSubmit={handleFormSubmit}
        >
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            className="border rounded px-3 py-2 flex-1"
            value={form.name}
            onChange={handleFormChange}
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            className="border rounded px-3 py-2 w-32"
            value={form.price}
            onChange={handleFormChange}
            required
            min={1}
          />
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            className="border rounded px-3 py-2 w-32"
            value={form.quantity}
            onChange={handleFormChange}
            required
            min={0}
          />
          <select
            name="category"
            className="border rounded px-3 py-2 w-40"
            value={form.category}
            onChange={handleFormChange}
          >
            {categories.map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>
          <input
            type="file"
            name="image"
            accept="image/*"
            className="border rounded px-3 py-2 w-48"
            onChange={handleFormChange}
          />
          <button
            className="bg-green-600 text-white px-4 py-2 rounded font-semibold"
            type="submit"
          >
            {editingId ? "Update" : "Add"}
          </button>
          {editingId && (
            <button
              type="button"
              className="text-red-600 underline"
              onClick={() => {
                setEditingId(null);
                setForm({
                  name: "",
                  price: "",
                  quantity: "",
                  category: categories[0],
                  description: "",
                  image: "",
                });
                setImagePreview("");
              }}
            >
              Cancel
            </button>
          )}
        </form>
        <textarea
          name="description"
          placeholder="Description"
          className="border rounded px-3 py-2 mt-4 w-full"
          value={form.description}
          onChange={handleFormChange}
        />
        {imagePreview && (
          <img
            src={imagePreview}
            alt="Preview"
            className="mt-2 h-24 w-24 object-cover rounded"
          />
        )}
        <div className="mt-6">
          <h4 className="font-semibold mb-2">Inventory</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr>
                  <th className="py-2">Name</th>
                  <th className="py-2">Price</th>
                  <th className="py-2">Qty</th>
                  <th className="py-2">Category</th>
                  <th className="py-2">Description</th>
                  <th className="py-2">Image</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id} className="border-t">
                    <td className="py-2">{p.name}</td>
                    <td className="py-2">₹{p.price}</td>
                    <td className="py-2">{p.quantity}</td>
                    <td className="py-2">{p.category}</td>
                    <td className="py-2">{p.description}</td>
                    <td className="py-2">
                      {p.image && (
                        <img
                          src={typeof p.image === "string" ? p.image : URL.createObjectURL(p.image)}
                          alt={p.name}
                          className="h-10 w-10 object-cover rounded"
                        />
                      )}
                    </td>
                    <td className="py-2 flex gap-2">
                      <button
                        className="text-blue-600 underline"
                        onClick={() => handleEdit(p)}
                      >
                        Edit
                      </button>
                      <button
                        className="text-red-600 underline"
                        onClick={() => handleDelete(p.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </CollapsibleCard>

      {/* 2. View Orders */}
      <CollapsibleCard title="View Orders">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr>
                <th className="py-2">Order ID</th>
                <th className="py-2">Customer Name</th>
                <th className="py-2">Product</th>
                <th className="py-2">Quantity</th>
                <th className="py-2">Price</th>
                <th className="py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id} className="border-t">
                  <td className="py-2">{o.id}</td>
                  <td className="py-2">{o.customer}</td>
                  <td className="py-2">{o.product}</td>
                  <td className="py-2">{o.quantity}</td>
                  <td className="py-2">₹{o.price}</td>
                  <td className="py-2">{o.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CollapsibleCard>

      {/* 3. Sales Stats */}
      <CollapsibleCard title="Sales Stats">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="bg-green-100 rounded p-4 flex-1 text-center">
            <div className="text-2xl font-bold">₹{totalRevenue}</div>
            <div className="text-gray-600">Total Revenue</div>
          </div>
          <div className="bg-green-100 rounded p-4 flex-1 text-center">
            <div className="text-2xl font-bold">{totalSold}</div>
            <div className="text-gray-600">Products Sold</div>
          </div>
          <div className="bg-green-100 rounded p-4 flex-1 text-center">
            <div className="text-2xl font-bold">{dailySales.reduce((sum, d) => sum + d.count, 0)}</div>
            <div className="text-gray-600">Total Daily Sales</div>
          </div>
        </div>
        <div className="mt-6">
          <h4 className="font-semibold mb-2">Daily Sales</h4>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={dailySales}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" fill="#22c55e" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CollapsibleCard>

      {/* 4. Product Performance Chart */}
      <CollapsibleCard title="Product Performance Chart">
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={productChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="sales" fill="#16a34a" />
          </BarChart>
        </ResponsiveContainer>
      </CollapsibleCard>
    </div>
  );
};

// FarmerDashboard with sales stats, inventory, orders, and product performance chart
export default FarmerDashboard;
