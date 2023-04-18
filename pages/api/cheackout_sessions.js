import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2020-08-27",
});
export default async function handler(req, res) {
  if (req.method === "POST") {
    const cartItems = req.body.cartItems;
    console.log(cartItems);
    const lineitems = cartItems.map((item) => {
      const img = item.image[0].asset._ref;
      const newImage = img
        .replace("image-", "https://cdn.sanity.io/images/7op624l5/production/")
        .replace("-webp", ".webp");

      return {
        price_data: {
          currency: "inr",
          product_data: {
            name: item.name,
            images: [newImage],
          },
          unit_amount: item.price * 100,
        },
        adjustable_quantity: {
          enabled: true,
          minimum: 1,
        },
        quantity: item.quantity,
      };
    });

    try {
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create({
        line_items: lineitems,
        mode: "payment",
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/`,
      });
      res.json({ sessionURL: session.url });
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
