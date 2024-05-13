import express from "express";
const app = express();

// Middleware to handle JSON responses
app.use(express.json());

// Middleware to handle URL-encoded requests
app.use(express.urlencoded({ extended: true }));

// Middleware to handle CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/api/products", (req, res) => {
  const products = [
    {
      id: 1,
      name: "table wooden",
      price: 200,
    },
    {
      id: 2,
      name: "table glass",
      price: 300,
    },
    {
      id: 3,
      name: "table matt",
      price: 200,
    },
    {
      id: 4,
      name: "glass door",
      price: 200,
    },
  ];

  if (req.query.search) {
    const filteredProducts = products.filter((product) =>
      product.name.includes(req.query.search)
    );
    res.status(200).json(filteredProducts);
    return;
  }

  setTimeout(() => {
    res.status(200).json(products);
  }, 3000);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Error handler middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong");
});