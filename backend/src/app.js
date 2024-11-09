const express = require("express");
const cors = require("cors");
const connectDb = require("./util/database");
const cookieParser = require("cookie-parser");

const app = express();

const productRoutes = require("./routes/products");
const reviewRouter = require("./routes/reviews");
const accountRouter = require("./routes/accounts");
const orderRouter = require("./routes/orders");
const cartRouter = require("./routes/carts");
const accessRouter = require("./routes/access");
const categoryRouter = require("./routes/categories");

app.use(express.json());
app.use(cookieParser());

app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use("/protected", accessRouter);

app.use("/products", productRoutes);
app.use("/review", reviewRouter);
app.use("/account", accountRouter);
app.use("/order", orderRouter);
app.use("/cart", cartRouter);
app.use("/category", categoryRouter);

connectDb()
  .then(() => {
    console.log("Connected to the database!");
    app.listen(3000);
  })
  .catch((error) => {
    console.error("Error connecting to the database: ", error);
  });
