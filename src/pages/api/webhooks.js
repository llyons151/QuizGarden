// pages/api/webhooks.js
import { buffer } from 'micro'
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

export const config = { api: { bodyParser: false } }

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)
//e
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()
  const buf = await buffer(req)
  const sig = req.headers['stripe-signature']
  let event
  try {
    event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET)
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message)
    return res.status(400).send(`Webhook Error: ${err.message}`)
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const userId  = session.metadata?.userId;
    const subscriptionId = session.subscription;       
  
    // 1) load the subscription, expanding its Price → Product
    const subscription = await stripe.subscriptions.retrieve(
      subscriptionId,
      { expand: ['items.data.price.product'] }
    );
  
    // 2) inspect the first item’s price/product
    const item       = subscription.items.data[0];
    const price      = item.price;
    const product    = price.product;                  
    const planName   = product.name    || price.nickname; 
  
    // 3) now update Supabase metadata however you like
    const { data: updated, error: updateErr } =
      await supabase.auth.admin.updateUserById(userId, {
        user_metadata: {
          subscription_status: 'active',
          subscription_type:   planName
        }
      });
  
    if (updateErr) {
      console.error('Auth metadata update failed:', updateErr);
    } else {
      console.log('Auth metadata updated:', updated.user_metadata);
    }
  }

  if(event.type === 'customer.subscription.deleted'){
    const session = event.data.object;
    const userId  = session.metadata?.userId;

    const { data: updated, error: updateErr } =
      await supabase.auth.admin.updateUserById(userId, {
        user_metadata: {
          subscription_status: 'inactive',
          subscription_type:   'free'
        }
      });
      if (updateErr) {
        console.error('Auth metadata update failed:', updateErr);
      } else {
        console.log('Auth metadata updated:', updated.user_metadata);
      }  
  }
    res.status(200).json({ received: true })
}
