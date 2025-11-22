import React, { useEffect, useState, useRef } from "react";
import { Helmet } from "react-helmet";
import { motion, AnimatePresence } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductListingPage = () => {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [quickView, setQuickView] = useState(null);
	const quickViewRef = useRef(null);

	useEffect(() => {
		setLoading(true);
		fetch("/api/products?status=Approved")
			.then((res) => res.json())
			.then((data) => {
				setProducts(Array.isArray(data) ? data : []);
				setLoading(false);
			})
			.catch(() => {
				setProducts([]);
				setLoading(false);
			});
	}, []);

	const handleAddToCart = (product) => {
		const cart = JSON.parse(localStorage.getItem("cart") || "[]");
		const idx = cart.findIndex(
			(item) => (item._id || item.id) === (product._id || product.id)
		);
		if (idx > -1) {
			cart[idx].quantity += 1;
		} else {
			cart.push({ ...product, quantity: 1 });
		}
		localStorage.setItem("cart", JSON.stringify(cart));
		toast.success(`${product.name} added to cart!`);
	};

	const SkeletonCard = () => (
		<div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 flex flex-col items-center animate-pulse">
			<div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
			<div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded mb-1" />
			<div className="h-3 w-16 bg-gray-100 dark:bg-gray-700 rounded mb-1" />
			<div className="h-8 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
		</div>
	);

	useEffect(() => {
		if (!quickView) return;
		const handleKey = (e) => {
			if (e.key === "Escape") setQuickView(null);
			if (e.key === "Tab" && quickViewRef.current) {
				const focusable = quickViewRef.current.querySelectorAll(
					"button, [tabindex]:not([tabindex='-1'])"
				);
				if (focusable.length === 0) return;
				const first = focusable[0];
				const last = focusable[focusable.length - 1];
				if (e.shiftKey && document.activeElement === first) {
					e.preventDefault();
					last.focus();
				} else if (!e.shiftKey && document.activeElement === last) {
					e.preventDefault();
					first.focus();
				}
			}
		};
		document.addEventListener("keydown", handleKey);
		return () => document.removeEventListener("keydown", handleKey);
	}, [quickView]);

	return (
		<>
			<Helmet>
				<title>FarmNova | Product Listing</title>
				<meta name="description" content="Browse fresh farm products on FarmNova." />
				<meta name="keywords" content="farmnova, farm products, vegetables, fruits, grains" />
				<meta property="og:title" content="FarmNova | Product Listing" />
				<meta property="og:description" content="Buy fresh farm products directly from farmers." />
				<meta property="og:type" content="website" />
				<meta property="og:url" content="http://localhost:3000/products" />
			</Helmet>

			<ToastContainer position="top-right" autoClose={2000} />

			<main className="container mx-auto py-8 px-2 md:px-8" role="main">
				<h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Products</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
					{loading
						? Array.from({ length: 6 }).map((_, idx) => <SkeletonCard key={idx} />)
						: products.length === 0 ? (
								<div className="col-span-full text-center text-gray-500">No products available.</div>
						  ) : (
								products.map((product, idx) => (
									<motion.div
										key={product._id || product.id}
										className="bg-white dark:bg-gray-900 rounded-xl shadow p-4 flex flex-col items-center group transition-all duration-200 hover:shadow-2xl hover:-translate-y-1 relative"
										whileHover={{ scale: 1.03 }}
										initial={{ opacity: 0, y: 24 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ delay: idx * 0.05 }}
									>
										<img
											src={product.image || "https://via.placeholder.com/100"}
											alt={product.name}
											loading="lazy"
											className="w-24 h-24 object-cover rounded mb-2 shadow-sm"
										/>
										<div className="font-bold text-lg mb-1 text-gray-900 dark:text-white">
											{product.name}
										</div>
										<div className="text-green-700 dark:text-green-400 font-semibold mb-1">
											₹{product.price}/kg
										</div>
										<div className="text-sm text-gray-500 mb-1">{product.farm}</div>
										<div className="mb-2">
											{product.available !== false && product.quantity > 0 ? (
												<span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">
													Available
												</span>
											) : (
												<span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs">
													Out of Stock
												</span>
											)}
										</div>
										<div className="flex gap-2 w-full justify-center">
											<button
												type="button"
												className="bg-green-600 text-white px-4 py-2 rounded font-semibold mt-2 cursor-pointer transition hover:bg-green-700 focus:ring-2 focus:ring-green-400 active:shadow-lg active:bg-green-800"
												onClick={() => handleAddToCart(product)}
												disabled={product.available === false || product.quantity <= 0}
											>
												Add to Cart
											</button>
											<button
												type="button"
												className="text-blue-600 underline mt-2 cursor-pointer"
												onClick={() => setQuickView(product)}
											>
												Quick View
											</button>
										</div>
									</motion.div>
								))
						  )}
				</div>
			</main>

			{/* Quick View Modal */}
			<AnimatePresence>
				{quickView && (
					<motion.div
						className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
						role="dialog"
						aria-modal="true"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onClick={() => setQuickView(null)}
					>
						<motion.div
							ref={quickViewRef}
							className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 max-w-md w-full relative"
							initial={{ scale: 0.9 }}
							animate={{ scale: 1 }}
							exit={{ scale: 0.9 }}
							onClick={(e) => e.stopPropagation()}
							tabIndex={-1}
						>
							<button
								className="absolute top-2 right-2 text-gray-400 hover:text-red-500 text-xl focus:outline-none focus:ring-2 focus:ring-red-400"
								onClick={() => setQuickView(null)}
								aria-label="Close quick view"
							>
								&times;
							</button>
							<img
								src={quickView.image || "https://via.placeholder.com/100"}
								alt={quickView.name}
								className="w-32 h-32 object-cover rounded mx-auto mb-4"
								loading="lazy"
							/>
							<div className="font-bold text-xl mb-2">{quickView.name}</div>
							<div className="text-green-700 font-semibold mb-2">₹{quickView.price}/kg</div>
							<div className="mb-2">{quickView.description}</div>
							<div className="mb-2 text-sm text-gray-500">{quickView.farm}</div>
							<div className="mb-2">
								{quickView.available !== false && quickView.quantity > 0 ? (
									<span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">Available</span>
								) : (
									<span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs">Out of Stock</span>
								)}
							</div>
							<button
								type="button"
								className="bg-green-600 text-white px-4 py-2 rounded font-semibold mt-2 w-full transition hover:bg-green-700 focus:ring-2 focus:ring-green-400 active:shadow-lg active:bg-green-800"
								onClick={() => {
									handleAddToCart(quickView);
									setQuickView(null);
								}}
								disabled={quickView.available === false || quickView.quantity <= 0}
							>
								Add to Cart
							</button>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
};

export default ProductListingPage;
