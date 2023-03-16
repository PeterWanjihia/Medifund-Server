const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");

const stripe = require("stripe")(process.env.SECRET_KEY);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});


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
