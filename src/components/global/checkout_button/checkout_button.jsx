"use client"
import { useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { useUser } from '@supabase/auth-helpers-react'

import '@/components/global/checkout_button/checkout_button.css'
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

export default function CheckoutButton({ priceId, setIsSignupActive, buttonText }) {
  const [loading, setLoading] = useState(false)
  const user = useUser()  // either a user object or null

  const handleClick = async () => {
    if (!user) {
      setIsSignupActive(true)
      return
    }

    setLoading(true)
    const { id: userId } = user

    try {
      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId, userId })
      })

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`)
      }

      const { sessionId } = await res.json()

      const stripe = await stripePromise
      const { error: stripeError } = await stripe.redirectToCheckout({ sessionId })
      if (stripeError) throw stripeError

    } catch (err) {
      console.error('Checkout error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className='payment_link'
    >
      {loading ? 'Loading…' : buttonText}
    </button>
  )
}
