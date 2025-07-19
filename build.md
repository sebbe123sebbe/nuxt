# Build Configuration Documentation

This document outlines the build configuration and deployment setup for this Nuxt application on Vercel.

## Framework Configuration

This project uses **Nuxt.js** as the framework, which is automatically detected by Vercel. The build system leverages:

- **Framework**: Nuxt 3
- **Build Output**: `.output` directory
- **Node.js Runtime**: Edge-compatible serverless functions
- **Package Manager**: pnpm (based on `pnpm-lock.yaml`)

## Build Process

### 1. Install Dependencies

```bash
pnpm install
```

Vercel automatically detects the `pnpm-lock.yaml` file and uses pnpm as the package manager.

### 2. Build Command

The default build command for Nuxt:

```bash
nuxt build
```

This generates the `.output` directory containing:
- Static assets
- Server-side functions
- Pre-rendered pages
- Client-side JavaScript bundles

### 3. Output Directory

Nuxt builds to `.output` by default, which Vercel automatically recognizes for Nuxt projects.

## Vercel Configuration

### Project Settings

The following settings are configured for optimal Nuxt deployment:

- **Framework Preset**: Nuxt.js (auto-detected)
- **Build Command**: `nuxt build` (default)
- **Output Directory**: `.output` (default)
- **Install Command**: `pnpm install` (auto-detected)
- **Node.js Version**: 18.x (or latest LTS)

### Environment Variables

Configure the following environment variables in Vercel Dashboard:

```bash
# Production Environment
NUXT_PUBLIC_API_URL=https://your-api.com
NUXT_SECRET_KEY=your-secret-key

# Preview Environment  
NUXT_PUBLIC_API_URL=https://staging-api.com
NUXT_SECRET_KEY=staging-secret-key
```

### vercel.json Configuration

If present, the `vercel.json` file contains project-specific overrides:

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "framework": "nuxtjs",
  "buildCommand": "nuxt build",
  "outputDirectory": ".output",
  "installCommand": "pnpm install",
  "devCommand": "nuxt dev",
  "functions": {
    "server/**/*.ts": {
      "maxDuration": 30
    }
  },
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options", 
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
```

## Build Optimizations

### 1. Bundle Analysis

Monitor bundle size with Nuxt DevTools:

```bash
npx nuxi analyze
```

### 2. Image Optimization

Nuxt automatically optimizes images when using the `<NuxtImg>` component:

```vue
<template>
  <NuxtImg
    src="/hero.jpg"
    alt="Hero image"
    width="800"
    height="600"
    quality="80"
    format="webp"
  />
</template>
```

### 3. Code Splitting

Nuxt automatically implements code splitting. You can further optimize with:

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  nitro: {
    minify: true,
  },
  vite: {
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['vue', 'vue-router'],
            utils: ['lodash', 'date-fns']
          }
        }
      }
    }
  }
})
```

### 4. Pre-rendering

Configure static generation for better performance:

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  nitro: {
    prerender: {
      routes: ['/sitemap.xml', '/robots.txt']
    }
  }
})
```

## Internationalization (i18n) Build

With `@nuxtjs/i18n` module:

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@nuxtjs/i18n'],
  i18n: {
    locales: [
      { code: 'en', iso: 'en-US', file: 'en.json' },
      { code: 'es', iso: 'es-ES', file: 'es.json' }
    ],
    defaultLocale: 'en',
    lazy: true,
    langDir: 'locales/',
    strategy: 'prefix_except_default'
  }
})
```

## Database & API Integration

### Supabase Configuration

With `@nuxtjs/supabase` module:

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@nuxtjs/supabase'],
  supabase: {
    redirectOptions: {
      login: '/',
      callback: '/confirm',
      exclude: ['/']
    }
  }
})
```

Environment variables needed:
```bash
SUPABASE_URL=your-supabase-url
SUPABASE_KEY=your-supabase-anon-key
```

## Performance Monitoring

### Speed Insights

Add Vercel Speed Insights:

```bash
pnpm add @vercel/speed-insights
```

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@vercel/speed-insights/nuxt']
})
```

### Web Analytics

Add Vercel Analytics:

```bash
pnpm add @vercel/analytics
```

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@vercel/analytics/nuxt']
})
```

## Build Troubleshooting

### Common Issues

1. **Node.js Version Mismatch**
   - Ensure `.nvmrc` file specifies supported version
   - Update `engines` field in `package.json`

2. **Memory Issues**
   - Increase Node.js memory: `NODE_OPTIONS="--max-old-space-size=4096"`
   - Configure in `vercel.json`:
   ```json
   {
     "functions": {
       "**/*.ts": {
         "memory": 1024
       }
     }
   }
   ```

3. **Build Timeout**
   - Optimize dependencies
   - Use build cache
   - Reduce bundle size

4. **Static Generation Failures**
   - Check dynamic routes configuration
   - Verify API endpoints are accessible during build
   - Review prerender routes

### Debug Build Locally

Test the build process locally:

```bash
# Build for production
pnpm build

# Test the built application
pnpm preview

# Analyze bundle size
npx nuxi analyze
```

## Deployment Pipeline

### Git Integration

1. **Automatic Deployments**: Every push to `main` branch triggers production deployment
2. **Preview Deployments**: Pull requests create preview deployments
3. **Branch Deployments**: Configure specific branches for staging environments

### Build Cache

Vercel automatically caches:
- `node_modules` (when `package-lock.json` unchanged)
- `.nuxt` build cache
- Nitro build cache

### Rollback Strategy

- Use Vercel Dashboard for instant rollbacks
- Git-based rollbacks: revert commits and push
- Environment-specific rollbacks available

## Security Considerations

### Headers Configuration

Security headers are configured in `vercel.json`:

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Strict-Transport-Security",
          "value": "max-age=31536000; includeSubDomains"
        },
        {
          "key": "Content-Security-Policy",
          "value": "default-src 'self'; script-src 'self' 'unsafe-inline'"
        }
      ]
    }
  ]
}
```

### Environment Variables

- Use Vercel Dashboard for sensitive variables
- Prefix client-side variables with `NUXT_PUBLIC_`
- Keep server-side variables without prefix

## Monitoring & Maintenance

### Build Alerts

Configure build notifications:
- Email notifications for failed builds
- Slack/Discord webhooks for team updates
- GitHub status checks

### Performance Monitoring

- Enable Vercel Speed Insights
- Monitor Web Vitals scores
- Set up custom metrics tracking
- Regular bundle size audits

---

For more information, refer to:
- [Nuxt Deployment Guide](https://nuxt.com/docs/getting-started/deployment)
- [Vercel Nuxt Documentation](https://vercel.com/docs/frameworks/nuxt)
- [Vercel Build Configuration](https://vercel.com/docs/projects/project-configuration)