const express = require("express");
const cors = require("cors");
const connectDb = require("./util/database");

const app = express();

const productRoutes = require("./routes/products");
const categoryRouter = require("./routes/categories");
const reviewRouter = require("./routes/reviews");
const accountRouter = require("./routes/accounts");

app.use(express.json());

app.use(cors({ origin: "http://localhost:5173" }));

app.use("/products", productRoutes);
app.use("/category", categoryRouter);
app.use("/review", reviewRouter);
app.use("/account", accountRouter);

connectDb()
  .then(() => {
    console.log("Connected to the database!");
    app.listen(3000);
  })
  .catch((error) => {
    console.error("Error connecting to the database: ", error);
  });
