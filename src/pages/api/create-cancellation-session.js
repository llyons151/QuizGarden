// pages/api/create-cancellation-session.js
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

export const config = { api: { bodyParser: true } };

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
});
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).end();
  }

  const { userId } = req.body;
  console.log(userId)
  if (!userId) return res.status(400).json({ error: "Missing userId" });

  // 1) fetch your Supabase user record
  const { data: user, error: getUserErr } =
    await supabase.auth.admin.getUserById(userId);
  if (getUserErr || !user) {
    console.error("Supabase lookup failed:", getUserErr);
    return res.status(404).json({ error: "User not found" });
  }

  // 2) grab (or create) their Stripe customer ID
  let stripeCustomerId = user.user?.user_metadata.stripe_customer_id;
  console.log("→ stripeCustomerId:", stripeCustomerId);

  if (!stripeCustomerId) {
    return;
    // create a fresh Stripe Customer
    const customer = await stripe.customers.create({
      email: user.email,
      metadata: { supabaseId: userId },
    });

    stripeCustomerId = customer.id; 

    const { error: updateErr } =
      await supabase.auth.admin.updateUserById(userId, {
        user_metadata: {
          ...user.user?.user_metadata,
          stripe_customer_id: stripeCustomerId,
        },
      });
    if (updateErr) console.error("Failed to save stripe_customer_id:", updateErr);
  }

  // 3) open the Stripe Customer Portal
  try {
    const { url } = await stripe.billingPortal.sessions.create({
      customer: stripeCustomerId,
      return_url: `${req.headers.origin}`,
    });
    return res.status(200).json({ url });
  } catch (err) {
    console.error("Portal session error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
