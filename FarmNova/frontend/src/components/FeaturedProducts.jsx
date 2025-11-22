import React, { useEffect, useState } from "react";
import LazyLoad from "react-lazyload";

const fallbackProducts = [
	{
		name: "Tomatoes",
		image: "../assets/products/tomatoes.jpg",
		fallback: "https://via.placeholder.com/150?text=Tomatoes",
		rating: 4.5,
		labels: ["Organic", "Best Seller"],
		farm: "Green Valley Farms",
		price: 99,
		category: "Vegetables",
		distance: 8,
		description: "Fresh organic tomatoes from local farms.",
	},
	{
		name: "Carrots",
		image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnBh7WSnfugUVdcGVtK_KuO9tOoRb9yuC0Sw&s",
		fallback: "https://via.placeholder.com/150?text=Carrots",
		rating: 4,
		labels: ["Organic"],
		farm: "Sunny Fields",
		price: 79,
		category: "Vegetables",
		distance: 15,
		description: "Crunchy and sweet carrots, perfect for salads.",
	},
	// ...add more products as needed...
];

const categories = ["All", "Vegetables", "Fruits", "Organic"];
const prices = ["All", "Low to High", "High to Low"];
const distances = ["All", "Nearby", "Within 50km", "Within 100km"];

const StarRating = ({ rating }) => (
	<div className="flex items-center mb-1">
		{[1, 2, 3, 4, 5].map((i) => (
			<svg
				key={i}
				className={`w-4 h-4 ${
					i <= Math.floor(rating) ? "text-yellow-400" : "text-gray-300"
				}`}
				fill="currentColor"
				viewBox="0 0 20 20"
			>
				<polygon points="9.9,1.1 12.3,6.6 18.2,7.3 13.8,11.3 15,17.1 9.9,14.1 4.8,17.1 6,11.3 1.6,7.3 7.5,6.6" />
			</svg>
		))}
		<span className="ml-1 text-xs text-gray-500">{rating}</span>
	</div>
);

// Add this skeleton component
const ProductSkeleton = () => (
	<div className="bg-white rounded-xl shadow p-4 flex flex-col items-center animate-pulse w-full">
		<div className="w-24 h-24 bg-gray-200 rounded mb-2" />
		<div className="h-4 w-20 bg-gray-200 rounded mb-1" />
		<div className="h-3 w-16 bg-gray-100 rounded mb-1" />
		<div className="h-3 w-24 bg-gray-100 rounded mb-2" />
		<div className="h-8 w-24 bg-gray-200 rounded" />
	</div>
);

const FeaturedProducts = () => {
	const [userLocation, setUserLocation] = useState(null);
	const [pin, setPin] = useState("");
	const [products, setProducts] = useState([]);
	const [modalProduct, setModalProduct] = useState(null);
	const [loading, setLoading] = useState(true);
	const [filters, setFilters] = useState({
		category: "",
		price: "",
		distance: "",
	});

	// Get user's geolocation on mount
	useEffect(() => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(pos) =>
					setUserLocation({
						lat: pos.coords.latitude,
						lng: pos.coords.longitude,
					}),
				() => setUserLocation(null)
			);
		}
	}, []);

	// Fetch products with location or pin filtering
	useEffect(() => {
		let url = "/api/products/featured";
		if (userLocation) {
			url += `?lat=${userLocation.lat}&lng=${userLocation.lng}`;
		} else if (pin) {
			url += `?pin=${pin}`;
		}
		fetch(url)
			.then((res) => res.json())
			.then((data) => setProducts(data))
			.catch(() => setProducts([]));
	}, [userLocation, pin]);

	useEffect(() => {
		setLoading(true);
		fetch("/api/products/featured")
			.then((res) => (res.ok ? res.json() : Promise.reject()))
			.then((data) => setProducts(data))
			.catch(() => setProducts(fallbackProducts))
			.finally(() => setLoading(false));
	}, []);

	useEffect(() => {
		let result = [...products];
		if (filters.category && filters.category !== "All") {
			result = result.filter((p) => p.category === filters.category);
		}
		if (filters.price && filters.price !== "All") {
			result = result.sort((a, b) =>
				filters.price === "Low to High"
					? a.price - b.price
					: b.price - a.price
			);
		}
		if (filters.distance && filters.distance !== "All") {
			// Example: filter by distance property if available
			if (filters.distance === "Nearby")
				result = result.filter((p) => p.distance <= 10);
			if (filters.distance === "Within 50km")
				result = result.filter((p) => p.distance <= 50);
			if (filters.distance === "Within 100km")
				result = result.filter((p) => p.distance <= 100);
		}
		setProducts(result);
	}, [products, filters]);

	const addToCart = (product) => {
		const cart = JSON.parse(localStorage.getItem("cart") || "[]");
		const idx = cart.findIndex((item) => item.name === product.name);
		if (idx > -1) {
			cart[idx].quantity += 1;
		} else {
			cart.push({ ...product, quantity: 1 });
		}
		localStorage.setItem("cart", JSON.stringify(cart));
		alert(`${product.name} added to cart!`);
	};

	return (
		<section className="pt-4 pb-8 md:pb-12 lg:pb-16">
			{/* Location/Pin Filter UI */}
			<div className="flex flex-col sm:flex-row gap-2 items-center mb-4">
				<button
					className="bg-green-100 text-green-700 px-4 py-2 rounded font-semibold relative group"
					onClick={() => {
						if (navigator.geolocation) {
							navigator.geolocation.getCurrentPosition(
								(pos) =>
									setUserLocation({
										lat: pos.coords.latitude,
										lng: pos.coords.longitude,
									}),
								() => alert("Unable to get location")
							);
						}
					}}
				>
					Use My Location
					<span className="absolute left-1/2 -bottom-8 -translate-x-1/2 bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition pointer-events-none z-10">
						Detects your city by GPS. Example: Chennai, Mumbai, etc.
					</span>
				</button>
				<span className="text-gray-500">or</span>
				<input
					type="text"
					placeholder="Enter Pin Code"
					className="border rounded px-3 py-2"
					value={pin}
					onChange={(e) => setPin(e.target.value)}
					maxLength={6}
				/>
			</div>
			<h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">
				Featured Products
			</h2>
			<div className="flex flex-wrap gap-4 justify-center mb-6">
				<select
					className="border rounded px-3 py-2"
					value={filters.category}
					onChange={(e) =>
						setFilters((f) => ({ ...f, category: e.target.value }))
					}
				>
					{categories.map((c) => (
						<option key={c}>{c}</option>
					))}
				</select>
				<select
					className="border rounded px-3 py-2"
					value={filters.price}
					onChange={(e) =>
						setFilters((f) => ({ ...f, price: e.target.value }))
					}
				>
					{prices.map((p) => (
						<option key={p}>{p}</option>
					))}
				</select>
				<select
					className="border rounded px-3 py-2"
					value={filters.distance}
					onChange={(e) =>
						setFilters((f) => ({ ...f, distance: e.target.value }))
					}
				>
					{distances.map((d) => (
						<option key={d}>{d}</option>
					))}
				</select>
			</div>
			{loading && (
				<div className="flex justify-center items-center py-8">
					<svg
						className="animate-spin h-8 w-8 text-green-600"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
					>
						<circle
							className="opacity-25"
							cx="12"
							cy="12"
							r="10"
							stroke="currentColor"
							strokeWidth="4"
						></circle>
						<path
							className="opacity-75"
							fill="currentColor"
							d="M4 12a8 8 0 018-8v8z"
						></path>
					</svg>
				</div>
			)}
			<div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
				{loading
					? Array.from({ length: 8 }).map((_, idx) => <ProductSkeleton key={idx} />)
					: Array.isArray(products) ? products.map((product, idx) => (
							<div
								key={idx}
								className="bg-white rounded-xl shadow p-4 flex flex-col items-center transition hover:shadow-xl hover:-translate-y-1 duration-200 cursor-pointer w-full"
							>
								<LazyLoad height={96} offset={100} once>
									<img
										src={product.image}
										alt={product.name}
										onError={(e) => {
											e.target.onerror = null;
											e.target.src =
												product.fallback ||
												"https://via.placeholder.com/150";
										}}
										className="w-24 h-24 object-cover mb-2 rounded"
										loading="lazy"
									/>
								</LazyLoad>
								<span className="text-lg font-medium mb-1">
									{product.name}
								</span>
								<div className="text-sm text-gray-500">{product.farm}</div>
								<StarRating rating={product.rating} />
								<div className="flex gap-1 mt-1">
									{product.labels &&
										product.labels.map((label) => (
											<span
												key={label}
												className={`px-2 py-0.5 rounded text-xs font-semibold ${
													label === "Organic"
														? "bg-green-100 text-green-700"
														: "bg-yellow-100 text-yellow-700"
												}`}
											>
												{label}
											</span>
										))}
								</div>
								<div className="flex items-center gap-2 mt-1">
									<span className="font-bold text-green-700">
										{product.price ? `₹${product.price}` : ""}
									</span>
									<span className="text-yellow-500 text-xs">
										{"★".repeat(Math.floor(product.rating || 0))}
									</span>
								</div>
								<button
									className="mt-3 bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition"
									onClick={() => addToCart(product)}
								>
									Add to Cart
								</button>
							</div>
					  )) : null}
			</div>
			{modalProduct && (
				<div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
					<div className="bg-white rounded-lg p-6 max-w-md w-full relative">
						<button
							className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-2xl"
							onClick={() => setModalProduct(null)}
						>
							&times;
						</button>
						<img
							src={modalProduct.image}
							alt={modalProduct.name}
							onError={(e) => {
								e.target.onerror = null;
								e.target.src =
									modalProduct.fallback ||
									"https://via.placeholder.com/150";
							}}
							className="w-32 h-32 object-cover mb-4 rounded mx-auto"
						/>
						<h3 className="text-xl font-bold mb-2">{modalProduct.name}</h3>
						<div className="mb-2 text-gray-600">{modalProduct.farm}</div>
						<StarRating rating={modalProduct.rating} />
						<div className="mb-2">{modalProduct.description}</div>
						<div className="flex gap-2 mb-2">
							{modalProduct.labels &&
								modalProduct.labels.map((label) => (
									<span
										key={label}
										className={`px-2 py-0.5 rounded text-xs font-semibold ${
											label === "Organic"
												? "bg-green-100 text-green-700"
												: "bg-yellow-100 text-yellow-700"
										}`}
									>
										{label}
									</span>
								))}
						</div>
						<div className="font-bold text-green-700 mb-2">
							{modalProduct.price ? `₹${modalProduct.price}` : ""}
						</div>
						<button
							className="w-full mt-2 bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition"
							onClick={() => addToCart(modalProduct)}
						>
							Add to Cart
						</button>
					</div>
				</div>
			)}
		</section>
	);
};

export default FeaturedProducts;


