export default defineNuxtConfig({
  devtools: { enabled: true },
  compatibilityDate: 'latest',
  modules: [
    '@nuxtjs/i18n',
    '@nuxtjs/supabase',
    '@unlok-co/nuxt-stripe',
  ],
  
  // Stripe configuration following Nuxt 4 policies
  runtimeConfig: {
    // Server-side configuration (private)
    stripe: {
      key: process.env.NUXT_STRIPE_SECRET_KEY,
      options: {
        // Server-side Stripe options
        // https://github.com/stripe/stripe-node?tab=readme-ov-file#configuration
      },
    },
    
    // Client-side configuration (public)
    public: {
      stripe: {
        key: process.env.NUXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
        options: {
          // Client-side Stripe options
          // https://stripe.com/docs/js/initializing#init_stripe_js-options
        },
      },
    },
  },
})