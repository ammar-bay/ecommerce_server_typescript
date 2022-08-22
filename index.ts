import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import userRoute from "./routes/user";
import authRoute from "./routes/auth";
import productRoute from "./routes/product";
import cartRoute from "./routes/cart";
import orderRoute from "./routes/order";
// import  stripeRoute from "./routes/stripe"
import paypalRoute from "./routes/paypal";
const app = express();

mongoose
  .connect(process.env.MONGO_URL || "")
  .then(() => {
    console.log("DB Connection Successfull!");
    app.listen(process.env.PORT || 5000, async () => {
      console.log("Backend server is running!");
    });
  })
  .catch((err: TypeError) => {
    console.log(err);
  });

app.use(cors());
app.use(express.json());
app.use("/auth", authRoute);
app.use("/users", userRoute);
app.use("/products", productRoute);
app.use("/carts", cartRoute);
app.use("/orders", orderRoute);
// app.use("/checkout", stripeRoute);
app.use("/paypal", paypalRoute);

// app.listen(process.env.PORT || 5000, async () => {
//   console.log("Backend server is running!");
// });
