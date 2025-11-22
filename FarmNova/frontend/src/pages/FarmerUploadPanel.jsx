import React, { useState } from "react";

const categories = ["Vegetable", "Fruit", "Grain", "Dairy", "Other"];

const FarmerUploadPanel = () => {
  const [form, setForm] = useState({
    name: "",
    price: "",
    quantity: "",
    category: categories[0],
    description: "",
    image: "",
    deliveryDays: "",
  });
  const [imagePreview, setImagePreview] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files && files[0]) {
      setForm((f) => ({ ...f, image: files[0] }));
      setImagePreview(URL.createObjectURL(files[0]));
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (key === "image" && value) {
        formData.append(key, value);
      } else if (value) {
        formData.append(key, value);
      }
    });
    try {
      const token = localStorage.getItem("authToken");
      await fetch("/api/products/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      alert("Product submitted for admin approval!");
      setForm({
        name: "",
        price: "",
        quantity: "",
        category: categories[0],
        description: "",
        image: "",
        deliveryDays: "",
      });
      setImagePreview("");
    } catch {
      alert("Failed to upload product.");
    }
    setUploading(false);
  };

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold mb-6">Upload Product</h2>
      <form className="flex flex-col gap-4 max-w-lg" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          className="border rounded px-3 py-2"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          className="border rounded px-3 py-2"
          value={form.price}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          className="border rounded px-3 py-2"
          value={form.quantity}
          onChange={handleChange}
          required
        />
        <select
          name="category"
          className="border rounded px-3 py-2"
          value={form.category}
          onChange={handleChange}
        >
          {categories.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>
        <textarea
          name="description"
          placeholder="Description"
          className="border rounded px-3 py-2"
          value={form.description}
          onChange={handleChange}
        />
        <input
          type="number"
          name="deliveryDays"
          placeholder="Delivery Days"
          className="border rounded px-3 py-2"
          value={form.deliveryDays}
          onChange={handleChange}
        />
        <input
          type="file"
          name="image"
          accept="image/*"
          className="border rounded px-3 py-2"
          onChange={handleChange}
        />
        {imagePreview && (
          <img
            src={imagePreview}
            alt="Preview"
            className="h-24 w-24 object-cover rounded"
          />
        )}
        <button
          className="bg-green-600 text-white px-4 py-2 rounded font-semibold"
          type="submit"
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Submit for Approval"}
        </button>
      </form>
    </div>
  );
};

export default FarmerUploadPanel;
