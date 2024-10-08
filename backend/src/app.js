//https://dummyjson.com/docs/products#products-categories
const express = require("express");
const connectDb = require("./util/database");

const app = express();

const productRoutes = require("./routes/products");
const categoryRouter = require("./routes/categories");
const reviewRouter = require("./routes/reviews");

app.use(express.json());

app.use("/products", productRoutes);
app.use("/category", categoryRouter);
app.use("/review", reviewRouter);

connectDb()
  .then(() => {
    console.log("Connected to the database!");
    app.listen(3000);
  })
  .catch((error) => {
    console.error("Error connecting to the database: ", error);
  });
