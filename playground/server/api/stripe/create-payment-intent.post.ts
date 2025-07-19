import { defineEventHandler, readBody } from 'h3'
import { useServerStripe } from '#stripe/server'

export default defineEventHandler(async (event) => {
  try {
    // Get Stripe instance for server-side operations
    const stripe = await useServerStripe(event)
    
    // Read request body
    const { amount, currency = 'usd', metadata = {} } = await readBody(event)
    
    // Validate amount
    if (!amount || amount < 50) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Amount must be at least $0.50 USD'
      })
    }
    
    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount), // Amount in cents
      currency,
      metadata,
      automatic_payment_methods: {
        enabled: true
      }
    })
    
    return {
      clientSecret: paymentIntent.client_secret,
      publishableKey: useRuntimeConfig().public.stripe.key
    }
    
  } catch (error) {
    console.error('Stripe Payment Intent Error:', error)
    
    throw createError({
      statusCode: 500,
      statusMessage: error instanceof Error ? error.message : 'Failed to create payment intent'
    })
  }
})