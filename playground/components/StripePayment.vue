<template>
  <div class="stripe-payment">
    <h2>Stripe Payment Example</h2>
    
    <!-- Loading state -->
    <div v-if="isLoading" class="loading">
      Loading Stripe...
    </div>
    
    <!-- Payment form -->
    <div v-else-if="stripe" class="payment-form">
      <div class="amount-input">
        <label for="amount">Amount (USD):</label>
        <input
          id="amount"
          v-model.number="amount"
          type="number"
          min="0.50"
          step="0.01"
          placeholder="10.00"
        />
      </div>
      
      <!-- Stripe Elements container -->
      <div id="payment-element" class="payment-element"></div>
      
      <button 
        :disabled="processing"
        @click="handlePayment"
        class="pay-button"
      >
        {{ processing ? 'Processing...' : `Pay $${amount.toFixed(2)}` }}
      </button>
      
      <!-- Error display -->
      <div v-if="error" class="error">
        {{ error }}
      </div>
      
      <!-- Success display -->
      <div v-if="success" class="success">
        Payment successful! Payment Intent ID: {{ paymentIntentId }}
      </div>
    </div>
    
    <!-- Error state -->
    <div v-else class="error">
      Failed to load Stripe. Please refresh the page.
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'

// Component state
const amount = ref(10.00)
const processing = ref(false)
const error = ref('')
const success = ref(false)
const paymentIntentId = ref('')

// Stripe elements
let elements: any = null
let paymentElement: any = null

// Get Stripe instance using the composable
const { stripe, isLoading } = await useClientStripe()

// Initialize Stripe Elements when component mounts and Stripe is loaded
watch(stripe, async (stripeInstance) => {
  if (stripeInstance && amount.value >= 0.50) {
    await initializeStripeElements()
  }
}, { immediate: true })

// Initialize Stripe Elements
async function initializeStripeElements() {
  try {
    error.value = ''
    
    // Create payment intent on server
    const { data } = await $fetch('/api/stripe/create-payment-intent', {
      method: 'POST',
      body: {
        amount: Math.round(amount.value * 100), // Convert to cents
        currency: 'usd',
        metadata: {
          integration_source: 'nuxt-stripe-demo'
        }
      }
    })
    
    if (!data?.clientSecret) {
      throw new Error('Failed to create payment intent')
    }
    
    // Create Stripe Elements
    elements = stripe.value.elements({
      clientSecret: data.clientSecret,
      appearance: {
        theme: 'stripe',
        variables: {
          colorPrimary: '#0070f3'
        }
      }
    })
    
    // Create and mount payment element
    paymentElement = elements.create('payment')
    await paymentElement.mount('#payment-element')
    
  } catch (err) {
    console.error('Error initializing Stripe Elements:', err)
    error.value = err instanceof Error ? err.message : 'Failed to initialize payment form'
  }
}

// Handle payment submission
async function handlePayment() {
  if (!stripe.value || !elements || processing.value) return
  
  try {
    processing.value = true
    error.value = ''
    success.value = false
    
    // Confirm payment
    const { error: stripeError, paymentIntent } = await stripe.value.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/payment-success`,
      },
      redirect: 'if_required'
    })
    
    if (stripeError) {
      error.value = stripeError.message || 'Payment failed'
    } else if (paymentIntent?.status === 'succeeded') {
      success.value = true
      paymentIntentId.value = paymentIntent.id
    }
    
  } catch (err) {
    console.error('Payment error:', err)
    error.value = err instanceof Error ? err.message : 'Payment failed'
  } finally {
    processing.value = false
  }
}

// Reinitialize when amount changes
watch(amount, async (newAmount) => {
  if (stripe.value && newAmount >= 0.50 && !processing.value) {
    await initializeStripeElements()
  }
})
</script>

<style scoped>
.stripe-payment {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.loading {
  text-align: center;
  padding: 20px;
  color: #666;
}

.payment-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.amount-input {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.amount-input label {
  font-weight: 500;
  color: #333;
}

.amount-input input {
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 16px;
}

.payment-element {
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background: #fff;
}

.pay-button {
  background: #0070f3;
  color: white;
  border: none;
  padding: 16px;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.pay-button:hover:not(:disabled) {
  background: #0051cc;
}

.pay-button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.error {
  color: #dc3545;
  padding: 12px;
  background: #f8d7da;
  border: 1px solid #f5c6cb;
  border-radius: 6px;
  font-size: 14px;
}

.success {
  color: #155724;
  padding: 12px;
  background: #d4edda;
  border: 1px solid #c3e6cb;
  border-radius: 6px;
  font-size: 14px;
}
</style>