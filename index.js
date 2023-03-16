const express = require("express");
const app = express();
require("dotenv").config();

const stripe = require("stripe")(process.env.SECRET_KEY);
const cors = require("cors");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors("*"));

app.post("/payment", cors(), async (req, res) => {
  let { amount, id } = req.body;
  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "USD",
      description: "Donation to medical funds.....",
      payment_method: id,
      confirm: true,
    });
    console.log("Payment", payment);
    res.json({
      message: "Donation was successful",
      success: true,
    });
  } catch (error) {
    console.log("Error", error);
    res.json({
      message: "Donation failed.Try again.",
      success: false,
    });
  }
});

app.listen(process.env.PORT || 5000, () => {
  console.log("Sever is listening on port 5000");
});
