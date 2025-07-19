<template>
  <div class="stripe-demo-page">
    <div class="container">
      <h1>Nuxt 4 Stripe Integration Demo</h1>
      <p class="description">
        This demo showcases the official <code>@unlok-co/nuxt-stripe</code> module 
        integration with Nuxt 4, featuring both server-side and client-side Stripe functionality.
      </p>
      
      <div class="features">
        <h2>✨ Features Demonstrated</h2>
        <ul>
          <li>🔧 <strong>Runtime Configuration:</strong> Environment-based setup</li>
          <li>🌐 <strong>Server-side API:</strong> Payment Intent creation</li>
          <li>💳 <strong>Client-side Elements:</strong> Secure payment form</li>
          <li>🎯 <strong>Vue 3 Composables:</strong> <code>useClientStripe()</code> composable</li>
          <li>⚡ <strong>TypeScript Support:</strong> Full type safety</li>
          <li>🔒 <strong>Security Best Practices:</strong> PCI compliance ready</li>
        </ul>
      </div>
      
      <div class="demo-section">
        <h2>💳 Payment Demo</h2>
        <div class="demo-note">
          <p><strong>⚠️ Test Mode:</strong> This demo uses Stripe test keys. No real payments will be processed.</p>
          <p><strong>💡 Test Card:</strong> Use <code>4242 4242 4242 4242</code> with any future expiry date and CVC.</p>
        </div>
        
        <!-- Stripe Payment Component -->
        <StripePayment />
      </div>
      
      <div class="implementation">
        <h2>🔧 Implementation Guide</h2>
        <div class="code-steps">
          <div class="step">
            <h3>1. Installation</h3>
            <pre><code>npx nuxi@latest module add stripe-next</code></pre>
          </div>
          
          <div class="step">
            <h3>2. Configuration (nuxt.config.ts)</h3>
            <pre><code>export default defineNuxtConfig({
  modules: ['@unlok-co/nuxt-stripe'],
  runtimeConfig: {
    stripe: {
      key: process.env.NUXT_STRIPE_SECRET_KEY,
    },
    public: {
      stripe: {
        key: process.env.NUXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
      },
    },
  },
})</code></pre>
          </div>
          
          <div class="step">
            <h3>3. Environment Variables</h3>
            <pre><code># .env
NUXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
NUXT_STRIPE_SECRET_KEY=sk_test_...</code></pre>
          </div>
          
          <div class="step">
            <h3>4. Server-side Usage</h3>
            <pre><code>// server/api/create-payment.post.ts
import { useServerStripe } from '#stripe/server'

export default defineEventHandler(async (event) => {
  const stripe = await useServerStripe(event)
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 1000, // $10.00
    currency: 'usd'
  })
  return { clientSecret: paymentIntent.client_secret }
})</code></pre>
          </div>
          
          <div class="step">
            <h3>5. Client-side Usage</h3>
            <pre><code>// components/Payment.vue
const { stripe, isLoading } = await useClientStripe()

watch(stripe, async (stripeInstance) => {
  if (stripeInstance) {
    const elements = stripeInstance.elements()
    // Mount payment element...
  }
})</code></pre>
          </div>
        </div>
      </div>
      
      <div class="resources">
        <h2>📚 Resources</h2>
        <ul class="resource-links">
          <li><a href="https://nuxt.com/modules/stripe-next" target="_blank">@unlok-co/nuxt-stripe Documentation</a></li>
          <li><a href="https://stripe.com/docs" target="_blank">Stripe API Documentation</a></li>
          <li><a href="https://stripe.com/docs/testing" target="_blank">Stripe Testing Guide</a></li>
          <li><a href="https://nuxt.com/docs" target="_blank">Nuxt 4 Documentation</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Set page meta
definePageMeta({
  title: 'Stripe Integration Demo',
  description: 'Demonstration of Nuxt 4 Stripe integration using @unlok-co/nuxt-stripe'
})

// Set HTML head
useHead({
  title: 'Nuxt 4 + Stripe Demo',
  meta: [
    { name: 'description', content: 'Complete Stripe integration demo with Nuxt 4' },
    { name: 'keywords', content: 'nuxt, stripe, payment, integration, vue, typescript' }
  ]
})
</script>

<style scoped>
.stripe-demo-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 40px 20px;
}

.container {
  max-width: 1000px;
  margin: 0 auto;
  background: white;
  border-radius: 12px;
  padding: 40px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

h1 {
  color: #2d3748;
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 20px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.description {
  font-size: 1.1rem;
  color: #4a5568;
  text-align: center;
  margin-bottom: 40px;
  line-height: 1.6;
}

.description code {
  background: #edf2f7;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: 'Monaco', 'Courier New', monospace;
  color: #2d3748;
}

.features, .demo-section, .implementation, .resources {
  margin-bottom: 40px;
}

.features h2, .demo-section h2, .implementation h2, .resources h2 {
  color: #2d3748;
  font-size: 1.8rem;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid #e2e8f0;
}

.features ul {
  list-style: none;
  padding: 0;
}

.features li {
  padding: 10px 0;
  color: #4a5568;
  font-size: 1.1rem;
}

.demo-note {
  background: #fff3cd;
  border: 1px solid #ffeaa7;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 30px;
}

.demo-note p {
  margin: 8px 0;
  color: #856404;
}

.demo-note code {
  background: #fff;
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: 600;
}

.code-steps {
  display: grid;
  gap: 30px;
}

.step {
  background: #f7fafc;
  border-radius: 8px;
  padding: 25px;
  border-left: 4px solid #667eea;
}

.step h3 {
  color: #2d3748;
  margin-bottom: 15px;
  font-size: 1.3rem;
}

.step pre {
  background: #2d3748;
  color: #e2e8f0;
  padding: 20px;
  border-radius: 6px;
  overflow-x: auto;
  font-family: 'Monaco', 'Courier New', monospace;
  font-size: 0.9rem;
  line-height: 1.5;
}

.step code {
  font-family: inherit;
}

.resource-links {
  list-style: none;
  padding: 0;
}

.resource-links li {
  margin-bottom: 12px;
}

.resource-links a {
  color: #667eea;
  text-decoration: none;
  font-weight: 500;
  padding: 8px 12px;
  border-radius: 6px;
  transition: all 0.2s;
  display: inline-block;
}

.resource-links a:hover {
  background: #667eea;
  color: white;
  transform: translateX(5px);
}

@media (max-width: 768px) {
  .container {
    padding: 20px;
    margin: 20px;
  }
  
  h1 {
    font-size: 2rem;
  }
  
  .step pre {
    font-size: 0.8rem;
    padding: 15px;
  }
}
</style>