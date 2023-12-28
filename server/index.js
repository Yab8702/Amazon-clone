const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.send("Hello from server");
});

app.get("/config", (req, res) => {
  res.send({
    PUBLIC_STRIPE_API_KEY: process.env.STRIPE_PUBLISHABLE_KEY,
  });
});

app.post("/payments/create", async (req, res) => {
  const total = req.query.total;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      currency: "USD",
      amount: total,
      automatic_payment_methods: { enabled: true },
    });
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (e) {
    return res.status(400).send({
      error: {
        message: e.message,
      },
    });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
