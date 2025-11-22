import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductDetailsPage = () => {
  const { id } = useParams();
  // Combine mock and uploaded products for demo
  const mockProducts = [
    {
      id: 1,
      name: "Tomatoes",
      price: 40,
      image: "https://via.placeholder.com/100",
      farm: "Green Valley",
      available: true,
      category: "Vegetable",
      description: "Fresh farm tomatoes.",
      reviews: [
        { user: "Amit", comment: "Very fresh!", rating: 5 }
      ]
    },
    // ...add more products
  ];
  const uploaded = JSON.parse(localStorage.getItem("uploadedProducts") || "[]");
  const allProducts = [...mockProducts, ...uploaded];
  const product = allProducts.find(p => String(p.id) === id);

  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: 5, comment: "" });
  const [avgRating, setAvgRating] = useState(null);

  useEffect(() => {
    if (product) {
      fetch(`/api/reviews/product/${product._id || product.id}`)
        .then(res => res.json())
        .then(data => {
          setReviews(Array.isArray(data) ? data : []);
          if (Array.isArray(data) && data.length > 0) {
            setAvgRating((data.reduce((sum, r) => sum + r.rating, 0) / data.length).toFixed(1));
          } else {
            setAvgRating(null);
          }
        });
    }
  }, [product]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("authToken");
    await fetch("/api/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        productId: product._id || product.id,
        rating: newReview.rating,
        comment: newReview.comment
      })
    });
    setNewReview({ rating: 5, comment: "" });
    // Reload reviews
    fetch(`/api/reviews/product/${product._id || product.id}`)
      .then(res => res.json())
      .then(data => {
        setReviews(Array.isArray(data) ? data : []);
        if (Array.isArray(data) && data.length > 0) {
          setAvgRating((data.reduce((sum, r) => sum + r.rating, 0) / data.length).toFixed(1));
        } else {
          setAvgRating(null);
        }
      });
  };

  if (!product) return <div className="p-8 text-center">Product not found.</div>;

  return (
    <div className="container mx-auto py-8 flex flex-col md:flex-row gap-8">
      <img src={product.image} alt={product.name} className="w-48 h-48 object-cover rounded" />
      <div>
        <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
        <div className="text-green-700 font-semibold mb-1">₹{product.price}/kg</div>
        <div className="mb-2 text-gray-500">{product.farm || "Unknown Farm"}</div>
        <div className="mb-2">{product.description}</div>
        <div className="mb-2">
          {product.available !== false ? (
            <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">Available</span>
          ) : (
            <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs">Out of Stock</span>
          )}
        </div>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded font-semibold mt-2"
          onClick={() => alert("Added to cart!")}
          disabled={product.available === false}
        >
          Add to Cart
        </button>
        <div className="mb-2">
          {avgRating && (
            <span className="text-yellow-500 font-bold">
              {"★".repeat(Math.round(avgRating))}{"☆".repeat(5 - Math.round(avgRating))}
              <span className="ml-2 text-gray-700">({avgRating})</span>
            </span>
          )}
        </div>
        {/* Reviews */}
        <div className="mt-6">
          <h3 className="font-semibold mb-2">Reviews</h3>
          {reviews.length > 0 ? (
            <ul>
              {reviews.map((r, idx) => (
                <li key={idx} className="mb-1">
                  <span className="font-bold">{r.customerName || "Customer"}:</span> {r.comment}{" "}
                  <span className="text-yellow-500">{"★".repeat(r.rating)}</span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-gray-500">No reviews yet.</div>
          )}
          <form className="mt-4 flex flex-col gap-2" onSubmit={handleReviewSubmit}>
            <label className="font-semibold">Leave a review:</label>
            <select
              className="border rounded px-2 py-1 w-32"
              value={newReview.rating}
              onChange={e => setNewReview({ ...newReview, rating: Number(e.target.value) })}
            >
              {[5,4,3,2,1].map(r => <option key={r} value={r}>{r} Star{r > 1 ? "s" : ""}</option>)}
            </select>
            <textarea
              placeholder="Your review"
              className="border rounded px-2 py-1"
              value={newReview.comment}
              onChange={e => setNewReview({ ...newReview, comment: e.target.value })}
              required
            />
            <button className="bg-green-600 text-white px-3 py-1 rounded w-32" type="submit">
              Submit Review
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
