const express = require("express");
const router = express.Router();

// Dummy data for demonstration
const marketData = {
  Tomatoes: { avgMarketPrice: 40, demand: 0.8, pastSales: [38, 42, 41, 39] },
  Carrots: { avgMarketPrice: 30, demand: 0.6, pastSales: [28, 32, 31, 29] },
  // ...add more products as needed
};

router.post("/", (req, res) => {
  const { productName } = req.body;
  const data = marketData[productName];
  if (!data) {
    return res.status(404).json({ message: "No data for this product." });
  }
  // Simple smart suggestion formula:
  // base = avgMarketPrice
  // adjust for demand (higher demand, higher price)
  // adjust for past sales (average)
  const avgPastSales = data.pastSales.reduce((a, b) => a + b, 0) / data.pastSales.length;
  let suggested = (data.avgMarketPrice + avgPastSales) / 2;
  suggested = suggested * (1 + (data.demand - 0.5)); // demand factor
  suggested = Math.round(suggested);

  res.json({ suggestedPrice: suggested });
});

module.exports = router;
