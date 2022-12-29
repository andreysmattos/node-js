const stripe = require("stripe")(process.env.STRIPE_SECRET);

const index = async (req, res) => {
  const { purchase, total_amount, shipping_fee } = req.body;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total_amount + shipping_fee,
    currency: "inr",
  });

  console.log(paymentIntent)

  return res.json({clientSecret: paymentIntent.client_secret});
};

module.exports = { index };
