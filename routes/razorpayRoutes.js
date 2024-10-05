const express = require("express");
const router = express.Router();
const Razorpay = require("razorpay");
const crypto = require("crypto");

// Initialize Razorpay with your credentials
const razorpay = new Razorpay({
  key_id: "rzp_test_NVSX8r60FD8cbc", // Replace with your Razorpay key_id
  key_secret: "oHlW5Wgenh6roqR1qcqUXHhB", // Replace with your Razorpay key_secret
});

// Create a Razorpay Order
router.post("/order", async (req, res) => {
  const { amount } = req.body;

  try {
    const options = {
      amount: amount * 100, // Amount in paise
      currency: "INR",
      receipt: `receipt_${new Date().getTime()}`,
    };

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    res.status(500).json({ error: error.message });
  }
});

// Verify the Payment Signature
router.post("/verify", (req, res) => {
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
    req.body;

  const hmac = crypto.createHmac("sha256", "oHlW5Wgenh6roqR1qcqUXHhB"); // Replace with your Razorpay key_secret
  hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
  const generatedSignature = hmac.digest("hex");

  if (generatedSignature === razorpay_signature) {
    res.send("Payment Verified");
  } else {
    res.status(400).send("Payment Verification Failed");
  }
});

module.exports = router;
