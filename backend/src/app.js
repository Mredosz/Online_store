const express = require("express");
const cors = require("cors");
const connectDb = require("./util/database");
const cookieParser = require("cookie-parser");
const expbs = require("express-handlebars");

const app = express();
app.engine(
  "handlebars",
  expbs.create({
    helpers: {
      isGreater: (v1, v2) => v1 > v2,
    },
  }).engine,
);
app.set("view engine", "handlebars");
app.set("views", "./src/views");

const populate = require("./util/populateDb");
// populate();

const productRoutes = require("./routes/products");
const reviewRouter = require("./routes/reviews");
const accountRouter = require("./routes/accounts");
const orderRouter = require("./routes/orders");
const cartRouter = require("./routes/carts");
const accessRouter = require("./routes/access");
const categoryRouter = require("./routes/categories");
const userRouter = require("./routes/users");
const viewRouter = require("./routes/views");

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
app.use("/user", userRouter);
app.use("/views", viewRouter);

connectDb()
  .then(() => {
    console.log("Connected to the database!");
    app.listen(3000);
  })
  .catch((error) => {
    console.error("Error connecting to the database: ", error);
  });
