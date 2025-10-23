// pages/api/create-checkout-session.js
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15',
})

// instantiate Supabase with your service‐role key:
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).end('Method Not Allowed')
  }

  const { priceId, userId } = req.body
  if (!priceId || !userId) {
    return res.status(400).json({ error: 'Missing priceId or userId' })
  }

  // use the same userId you destructured above:
  const { data: authUser, error: getErr } =
    await supabase.auth.admin.getUserById(userId)
  if (getErr) {
    console.error('Failed to fetch user:', getErr)
    return res.status(500).json({ error: 'Could not fetch user' })
  }


  const user = authUser.user
  let stripeCustomerId = user.user_metadata?.stripe_customer_id
  if (!stripeCustomerId) {
    const customer = await stripe.customers.create({
      email: user.email,                 // use user.email, not authUser.email
      metadata: { supabaseId: userId },
    })
    stripeCustomerId = customer.id       // ← assign it here

    // persist back to Supabase
    const { error: updateErr } = await supabase.auth.admin.updateUserById(userId, {
      user_metadata: {
        ...user.user_metadata,
        stripe_customer_id: stripeCustomerId,
      },
    })
    if (updateErr) console.error('Failed to save stripe_customer_id:', updateErr)
  }
  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      customer: stripeCustomerId,            
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${req.headers.origin}`,
      cancel_url: `${req.headers.origin}`,
      metadata: { userId }
    })

    res.status(200).json({ sessionId: session.id })
  } catch (err) {
    console.error('❌ Stripe create session error:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
}
