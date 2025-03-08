require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// connect to mongo atlas
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("mongodb connected"))
  .catch((err) => console.log(err));

// create a Mongoose Schema
const order = {
  orderId: 7,
  userId: 826,
  pizzaType: "paneer pizza",
  quantity: 16,
  priority: true,
  price: 325,
  deliveryTime: "17.30",
};

const orderSchema = new mongoose.Schema({
  orderId: Number,
  userId: Number,
  pizzaType: String,
  quantity: Number,
  priority: Boolean,
  price: Number,
  deliveryTime: String,
});

const TestOrder = mongoose.model("testOrder", orderSchema);

// API route to get all orders
app.get("/orders", async function (req, res) {
  try {
    const orders = await TestOrder.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//API route to add a order
app.post("/orders", async function (req, res) {
  try {
    const neworder = new TestOrder(order);
    await neworder.save();
    res.status(201).json(neworder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server started on port ${PORT}`));
