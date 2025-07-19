# FromSunday.io - Comprehensive Project Documentation (Nuxt 4)

🎯 Project Overview

FromSunday.io is an advanced AI-powered platform that transforms sermon videos into engaging small group discussion materials. The system processes videos through a sophisticated 6-step pipeline (A-F) using modern cloud technologies, AI services, and serverless architecture powered by **Nuxt 4**.

## Core Mission

Transform sermon videos into:

📝 Discussion Guides - AI-generated small group materials
🎬 Highlight Videos - 5-minute compilations of key moments
📊 Transcriptions - Multi-language text with timestamps
🎯 Key Insights - AI-extracted themes and talking points

## 💰 Subscription Model

### 🥈 Pro Tier ($X/month)

- AI Analysis: Advanced sermon processing
- 2 Recap Videos/month: Professional highlight compilations
- Discussion Guides: Small group leader materials
- Multi-language Support: 10+ languages

### 🥇 Ultra Tier ($Y/month) - Coming Soon

- All Pro Features
- 4 Recap Videos/month: Double the content
- 1-Click Podcasts: Instant audio conversion (10/month)
- Social Media Posts: AI-generated content (10/month)
- Social Media Reels: Auto-generated video clips (10/month)
- Priority Support: Enhanced assistance

## 🏗️ Technical Architecture

### Core Technology Stack

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   AI Services   │
│                 │    │                 │    │                 │
│ • Nuxt 4        │◄──►│ • Supabase      │◄──►│ • OpenAI        │
│ • TypeScript    │    │ • Nitro Server  │    │ • OpenRouter    │
│ • Tailwind CSS  │    │ • Stripe        │    │ • Gemini 2.0    │
│ • @nuxtjs/i18n  │    │ • PostgreSQL    │    │ • RunPod GPU    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Key Dependencies

**Frontend Framework:**
- **Nuxt 4** - Full-stack framework with Nitro server
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **@nuxtjs/ui** - Vue 3 component library
- **@nuxtjs/i18n** - Internationalization (7 languages)

**Backend Services:**
- **Supabase** - PostgreSQL database + authentication + storage
- **@nuxtjs/supabase** - First-class Supabase integration
- **Nitro** - Universal server engine for Nuxt
- **Stripe** - Payment processing and subscriptions
- **RunPod** - GPU-accelerated video processing

**AI & Processing:**
- **OpenAI Whisper** - Multi-language transcription
- **OpenRouter + Gemini 2.0** - Content analysis
- **FFmpeg + NVENC** - Hardware-accelerated video processing

## 🔄 Video Processing Pipeline (A-F)

### Detailed Workflow Architecture

```
📁 Complete Video Processing Pipeline
│
├── 🎬 Step A: Video Upload & Configuration
│   ├── User uploads sermon video (up to 8GB)
│   ├── Optional: Intro/outro videos for branding
│   ├── Trim settings: start_time, end_time
│   ├── Language selection (10+ supported)
│   └── Storage: sermon-videos/{user_id}/{project_name}/
│
├── 🔄 Step B: RunPod Preprocessing (GPU-Accelerated)
│   ├── Container: sebbe123sebbe/fromsunday-preprocessing:v1.1.9
│   ├── Video trimming (precise timestamps)
│   ├── Audio extraction: 12kbps Opus in OGG (95% compression)
│   ├── GPU encoding: NVENC H.264 (15-20 Mbps)
│   ├── Outputs: trimmed_video.mp4 + audio.ogg
│   └── Webhook: Status updates to /api/runpod/webhook
│
├── 🎙️ Step C: AI Transcription
│   ├── OpenAI Whisper API (ultra-compressed audio <25MB)
│   ├── Word-level timestamps for precision
│   ├── Multi-language support (auto-detection)
│   ├── Outputs: transcription.txt + transcription.json
│   └── Quality: Professional-grade accuracy
│
├── ✨ Step D: AI Content Analysis
│   ├── OpenRouter + Gemini 2.0 Flash processing
│   ├── Key moment identification
│   ├── Theme extraction and insight generation
│   ├── Discussion question formulation
│   └── Output: highlights.json with timestamps
│
├── 🎬 Step E: Highlights Video Creation
│   ├── Container: sebbe123sebbe/fromsunday-highlights:v1.1.0
│   ├── AI-guided segment selection (5-minute target)
│   ├── Optional intro/outro integration
│   ├── GPU-accelerated assembly
│   └── Output: final_highlights.mp4
│
└── 📝 Step F: Discussion Guide Generation
    ├── LLM-powered content synthesis
    ├── Small group leader materials
    ├── Printable A4 format
    └── Output: conversational_guide.txt
```

## 📁 Project File Structure

### Root Directory Organization (Nuxt 4)

```
fromsunday-io-nuxt/
├── 📱 Frontend (Nuxt 4 Universal)
│   ├── pages/                 # Nuxt file-based routing
│   │   ├── [...locale]/       # i18n dynamic routing
│   │   ├── auth/             # Authentication pages
│   │   ├── upload/           # Upload interface
│   │   └── dashboard/        # User dashboard
│   │
│   ├── server/               # Nitro server API
│   │   └── api/              # API routes
│   │       ├── upload/       # Video upload endpoint
│   │       ├── runpod/       # Webhook handlers
│   │       ├── webhooks/     # Stripe webhooks
│   │       └── workflow/     # Processing automation
│   │
│   ├── components/           # Vue 3 components
│   │   ├── ui/              # Base UI components
│   │   ├── icons/           # Icon components
│   │   └── forms/           # Form components
│   │
│   ├── composables/         # Vue 3 composables
│   │   ├── useAuth.ts       # Authentication composable
│   │   ├── useSupabase.ts   # Supabase integration
│   │   └── useUpload.ts     # File upload handling
│   │
│   ├── middleware/          # Route middleware
│   │   ├── auth.ts          # Authentication guard
│   │   └── rbac.ts          # Role-based access control
│   │
│   ├── plugins/             # Nuxt plugins
│   │   ├── supabase.client.ts
│   │   └── stripe.client.ts
│   │
│   ├── layouts/             # Application layouts
│   │   ├── default.vue      # Default layout
│   │   └── auth.vue         # Authentication layout
│   │
│   └── public/              # Static assets
│
├── 🛠️ Backend Infrastructure
│   ├── supabase/            # Database & auth configuration
│   │   ├── config.toml      # Local development config
│   │   └── migrations/      # Database schema migrations
│   │       ├── 20250702150000_initial_setup.sql
│   │       ├── 20250717055000_update_storage_policies.sql
│   │       ├── 20250717060500_add_church_name_column.sql
│   │       └── 20250717070000_add_intro_outro_columns.sql
│   │
│   ├── utils/               # Utility functions
│   │   ├── supabase/        # Database client utilities
│   │   ├── stripe/          # Payment processing
│   │   ├── auth-helpers/    # Authentication utilities
│   │   ├── rbac.ts          # Role-based access control
│   │   ├── storage-path.ts  # Intelligent file organization
│   │   ├── rate-limit.ts    # API rate limiting
│   │   └── workflow-automation.ts # Processing orchestration
│   │
│   └── lib/                 # Core libraries and configurations
│
├── 🐳 Docker Infrastructure
│   ├── docker/              # Container definitions
│   │   ├── Dockerfile.preprocessing    # Step B container
│   │   ├── Dockerfile.highlights      # Step E container
│   │   ├── Dockerfile.simple-gpu      # Base GPU image
│   │   ├── requirements.txt           # Python dependencies
│   │   └── build-gpu-images.sh       # Build automation
│   │
│   └── scripts/             # Deployment and utility scripts
│
├── 📊 Configuration & Types
│   ├── types/               # TypeScript definitions
│   │   └── database.ts      # Generated Supabase types
│   ├── nuxt.config.ts       # Nuxt 4 configuration
│   ├── tailwind.config.js   # Tailwind CSS setup
│   ├── package.json         # Dependencies and scripts
│   ├── nitro.config.ts      # Nitro server configuration
│   └── app.config.ts        # App-specific configuration
│
└── 📚 Documentation
    ├── README.md            # Main project documentation
    ├── docs/                # Detailed documentation
    │   ├── storage-structure.md    # File management system
    │   └── storage-path-error-fix.md # Troubleshooting guides
    ├── CHANGELOG.md         # Version history
    ├── RUNPOD_DEPLOYMENT_GUIDE.md # Container deployment
    └── build.md             # This comprehensive guide
```

## 💾 Intelligent File Management System

### Church-Based Organization Structure

```
supabase-storage/
└── {church-name-user-id}/
    ├── 1-templates/                    # Reusable assets
    │   ├── intro-video.mp4            # Default intro
    │   ├── outro-video.mp4            # Default outro
    │   └── announcement-video.mp4      # Default announcements
    │
    ├── 2-messages/                     # Sermon archives
    │   └── {YYYY-MM-DD}/
    │       └── {message-name}.txt
    │
    └── 3-projects/                     # Active processing
        └── {project-name}/
            ├── 📹 Video Assets
            │   ├── original_video.mp4     (temporary - deleted post-processing)
            │   ├── trimmed_video.mp4      (permanent)
            │   └── highlights_video.mp4    (final output)
            │
            ├── 🎵 Audio Assets  
            │   └── audio.ogg              (12kbps Opus - 95% compressed)
            │
            ├── 📝 Text Content
            │   ├── transcription.txt      (clean text)
            │   ├── transcription.json     (with timestamps)
            │   ├── highlights.json        (AI analysis)
            │   └── conversational_guide.txt (discussion materials)
            │
            ├── 🥈 Pro Tier Content
            │   └── recap_videos/
            │       ├── recap_video_1.mp4  (2/month limit)
            │       └── recap_video_2.mp4
            │
            └── 🥇 Ultra Tier Content (Future)
                ├── podcasts/
                │   ├── podcast_episode.mp3 (10/month)
                │   └── podcast_metadata.json
                └── social_media/
                    ├── posts/           (10/month)
                    └── reels/           (10/month)
```

### Storage Optimization Features

**Intelligent Cleanup:**
- Original videos deleted after processing (60-80% storage savings)
- Temporary files automatically purged
- Configurable retention policies

**Conflict Resolution:**
- Automatic timestamp-based naming for duplicates
- Church-based organization prevents user conflicts
- Graceful fallback to UUID structure when needed

**Subscription-Aware Limits:**
- Pro tier: 2 recap videos/month
- Ultra tier: 4 recap videos + 10 podcasts + 10 social posts/month
- Automatic usage tracking and limit enforcement

## 🔐 Security & Authentication

### Role-Based Access Control (RBAC)

**User Hierarchy:**
- 🔴 **Platform Admin** - Full system access (developers/support)
- 🟡 **Church Admin** - Church management and content oversight
- 🟢 **Moderator** - Content management without user administration
- 🔵 **User** - Personal content access only

**Configuration:**
```bash
# Environment-based admin assignment
PLATFORM_ADMIN_EMAILS=admin@company.com,support@company.com
CHURCH_ADMIN_EMAILS=pastor@church1.com,admin@church2.com
```

### Security Implementation

**API Security:**
- JWT-based authentication with Supabase
- Rate limiting (10 requests/minute per IP) via Nitro middleware
- Webhook signature verification
- CORS and CSP headers configured in Nuxt

**Data Protection:**
- Row Level Security (RLS) policies on all tables
- Encrypted environment variables
- Secure file uploads with signed URLs
- Automatic PII detection and handling

**Monitoring:**
- Real-time security incident logging
- Failed authentication attempt tracking
- IP-based blocking for suspicious activity
- Admin dashboard for security statistics

## 🚀 Deployment Architecture

### Production Environment (Vercel + Supabase + Nuxt 4)

**Vercel Configuration:**
- **Region:** IAD1 (US East)
- **Framework:** Nuxt 4 with Nitro
- **Build Command:** `pnpm run build`
- **Output Directory:** `.output`
- **Max Duration:** 300s for upload endpoints
- **Memory:** Optimized for large file processing

**Required Environment Variables:**

```bash
# Core Services
NUXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NUXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx
NUXT_SUPABASE_SERVICE_ROLE_KEY=eyJxxx
NUXT_PUBLIC_SITE_URL=https://yourdomain.com

# AI Services  
NUXT_OPENAI_API_KEY=sk-xxx
NUXT_OPENROUTER_API_KEY=sk-or-xxx

# Video Processing
NUXT_RUNPOD_API_KEY=xxx
NUXT_RUNPOD_PREPROCESSOR_ENDPOINT_ID=xxx
NUXT_RUNPOD_VIDEO_MATERIAL_ENDPOINT_ID=xxx
NUXT_RUNPOD_WEBHOOK_SECRET=xxx

# Payments
NUXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxx
NUXT_STRIPE_SECRET_KEY=sk_live_xxx
NUXT_STRIPE_WEBHOOK_SECRET=whsec_xxx

# Security
NUXT_PLATFORM_ADMIN_EMAILS=admin@company.com
NUXT_JWT_SECRET_KEY=xxx
```

### Container Infrastructure (RunPod)

**Preprocessing Container (Step B):**
- **Image:** sebbe123sebbe/fromsunday-preprocessing:v1.1.9
- **GPU Support:** NVIDIA RTX/Tesla cards with CUDA
- **Memory:** 8GB+ recommended
- **Storage:** 20GB container disk
- **Features:** NVENC encoding, Opus audio compression

**Highlights Container (Step E):**
- **Image:** sebbe123sebbe/fromsunday-highlights:v1.1.0
- **Features:** Multi-segment assembly, asset integration
- **Performance:** 5-10x faster with GPU acceleration

**Container Environment:**
```bash
# Required in RunPod (no NUXT_ prefix allowed)
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_KEY=eyJxxx
WEBHOOK_SECRET=xxx
```

## 📊 Database Schema

### Core Tables Structure

**Videos Table (Primary Entity):**

```sql
CREATE TABLE videos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id),
  
  -- Processing Status
  status TEXT DEFAULT 'pending',
  transcription_status TEXT DEFAULT 'pending',
  runpod_job_id TEXT,
  processed_at TIMESTAMPTZ,
  
  -- Media URLs
  audio_url TEXT,
  trimmed_video_url TEXT,
  highlights_video_url TEXT,
  smallgroup_video_urls TEXT[],
  
  -- AI Content
  transcription_text TEXT,
  transcription_json JSONB,
  highlights_json JSONB,
  conversational_guide_url TEXT,
  
  -- Configuration
  language TEXT DEFAULT 'en',
  start_time INTEGER DEFAULT 0,
  end_time INTEGER DEFAULT 0,
  church_name TEXT,
  project_name TEXT,
  
  -- Template Assets  
  temp_intro_video_url TEXT,
  temp_outro_video_url TEXT,
  default_intro_video_url TEXT,
  default_outro_video_url TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

**User Profiles (RBAC):**

```sql
CREATE TABLE user_profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  role TEXT NOT NULL DEFAULT 'user' 
    CHECK (role IN ('user', 'church_admin', 'platform_admin', 'moderator')),
  church_name TEXT,
  subscription_tier TEXT DEFAULT 'free',
  monthly_usage JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

**Row Level Security:**
- 8 comprehensive RLS policies implemented
- Platform admin override capabilities
- User data isolation enforced
- Church-based access control

## 🔧 Build & Development

### Package Management

- **Package Manager:** pnpm (workspace configuration)
- **Node.js:** v18+ required
- **TypeScript:** Strict mode enabled
- **ESLint + Prettier:** Code quality enforcement

### Development Scripts

```bash
# Development
pnpm dev              # Start development server (Nitro + HMR)
pnpm build            # Production build (.output directory)
pnpm preview          # Preview production build
pnpm lint             # Code linting
pnpm prettier-fix     # Format code

# Stripe Integration
pnpm stripe:login     # Authenticate with Stripe
pnpm stripe:listen    # Local webhook forwarding
pnpm stripe:fixtures  # Load test data

# Supabase (Cloud-based)
pnpm supabase:link    # Link to remote project
pnpm supabase:pull    # Pull schema changes
pnpm supabase:push    # Push local changes

# Nuxt-specific
pnpm nuxi generate    # Static site generation
pnpm nuxi info        # Project information
pnpm nuxi analyze     # Bundle analysis
```

### Build Optimizations

- **Image Optimization:** Built-in Nuxt image optimization with WebP
- **Code Splitting:** Automatic route-based and component-level splitting
- **Bundle Analysis:** Tree shaking and dead code elimination with Rollup
- **Security Headers:** CSP, HSTS, XSS protection via Nitro middleware
- **Universal Rendering:** SSR/SSG with hydration optimization

## 🌍 Internationalization (i18n)

### Supported Languages

- **English (en)** - Primary
- **Spanish (es)** - Full support
- **French (fr)** - Full support
- **German (de)** - Full support
- **Portuguese (pt)** - Full support
- **Italian (it)** - Full support
- **Dutch (nl)** - Full support

### Implementation

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@nuxtjs/i18n'],
  i18n: {
    locales: [
      { code: 'en', name: 'English', file: 'en.json' },
      { code: 'es', name: 'Español', file: 'es.json' },
      { code: 'fr', name: 'Français', file: 'fr.json' },
      { code: 'de', name: 'Deutsch', file: 'de.json' },
      { code: 'pt', name: 'Português', file: 'pt.json' },
      { code: 'it', name: 'Italiano', file: 'it.json' },
      { code: 'nl', name: 'Nederlands', file: 'nl.json' }
    ],
    defaultLocale: 'en',
    strategy: 'prefix_except_default',
    langDir: 'locales/',
    lazy: true,
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root'
    }
  }
})
```

**Features:**
- **Route-based localization:** `/es/upload`, `/fr/dashboard`
- **Lazy loading:** Translation files loaded on demand
- **Browser detection:** Automatic locale detection
- **Fallback:** English for missing translations

## 🧪 Testing & Quality Assurance

### Code Quality Tools

- **TypeScript:** Strict type checking with Nuxt type generation
- **ESLint:** Code linting with Nuxt/Vue rules
- **Prettier:** Consistent code formatting
- **Husky:** Pre-commit hooks for quality gates
- **Vitest:** Unit testing framework (Nuxt-compatible)

### Performance Monitoring

- **Vercel Analytics:** Real-time performance metrics
- **Nuxt DevTools:** Development performance insights
- **Supabase Logs:** Database query monitoring
- **Error Tracking:** Centralized error logging with Nitro
- **Webhook Statistics:** Processing pipeline monitoring

## 🔍 Troubleshooting & Common Issues

### Build Issues

**Supabase Module Warnings:**
- ✅ **Resolved:** Proper @nuxtjs/supabase integration
- ✅ **Build scripts:** Optimized for Nitro deployment

**Nitro Build Warnings:**
- ✅ **Resolved:** Proper PNPM configuration for Nuxt 4
- ✅ **Module resolution:** Native ESM handling improved

### Runtime Issues

**Webhook Authentication (401 Errors):**
- Verify `NUXT_RUNPOD_WEBHOOK_SECRET` matches in both environments
- Ensure RunPod containers send `x-runpod-secret` header
- Use production domain, not preview URLs

**Storage 400 Errors:**
- Run `fix_storage_issues.sql` in Supabase dashboard
- Verify storage policies are properly configured
- Check signed URL expiration (2-hour limit)

**Container Startup Issues:**
- Update to latest image versions (v1.1.9+)
- Verify all required environment variables are set
- Check RunPod GPU availability and compatibility

### Nuxt 4 Specific Issues

**Server-Side Rendering (SSR) Issues:**
- Ensure client-only components use `<ClientOnly>` wrapper
- Use `process.client` checks for browser-specific code
- Configure proper hydration for dynamic content

**Route Generation Problems:**
- Verify file-based routing structure in `pages/` directory
- Check middleware execution order
- Ensure proper locale handling in dynamic routes

## 📈 Scalability & Performance

### Current Capabilities

- **Concurrent Users:** 1000+ supported with Nitro
- **File Size Limits:** Up to 8GB per video
- **Processing Speed:** 5-10x faster with GPU acceleration
- **Storage Efficiency:** 95% compression on audio files

### Optimization Features

- **Universal Architecture:** SSR/SSG with Nitro engine
- **CDN Integration:** Global content delivery via Vercel Edge
- **Intelligent Caching:** Optimized for repeat access with Nuxt caching
- **Resource Management:** Automatic cleanup and optimization

## 🔄 Version History & Updates

### Latest Version: v1.1.9 (January 2025)

**Major Enhancement: OGG/Opus Audio Compression**
- 95% file size reduction (2-hour video: ~11MB vs ~220MB)
- OpenAI Whisper compatibility (under 25MB limit)
- Speech-optimized codec for superior quality
- Eliminated need for audio file splitting

### Recent Updates

- **v1.1.3:** GPU-accelerated processing improvements
- **v1.1.0:** Initial RunPod integration
- **v1.0.0:** Production launch with complete A-F pipeline
- **v2.0.0:** Migration to Nuxt 4 with enhanced performance

## 📞 Support & Resources

### Documentation Resources

- **Main README:** Comprehensive setup guide
- **API Documentation:** Nitro server endpoint specifications  
- **Storage Guide:** File management system details
- **Deployment Guide:** Container and cloud setup
- **Nuxt 4 Migration:** Framework upgrade documentation

### Contact & Support

- **Technical Issues:** Check troubleshooting section first
- **Feature Requests:** Submit via project repository
- **Emergency Support:** Platform admin contact
- **Community:** Church leader feedback channels

## 🎯 Future Roadmap

### Ultra Tier Features (In Development)

- **Podcast Generation:** 1-click audio conversion
- **Social Media Integration:** Auto-posting capabilities
- **Advanced Analytics:** Detailed engagement metrics
- **Custom Branding:** White-label options

### Technical Enhancements

- **Real-time Processing:** Live stream integration with Nuxt WebSockets
- **Mobile Apps:** Native iOS/Android with Nuxt-generated APIs
- **API Extensions:** Third-party integrations via Nitro
- **Enterprise Features:** Advanced church management tools

---

This document provides a comprehensive overview of the FromSunday.io platform built with **Nuxt 4**. For specific technical implementations, refer to the individual documentation files and code comments throughout the project.

**Key Nuxt 4 Advantages:**
- ⚡ **Nitro Server:** Universal, edge-ready serverless functions
- 🔄 **Universal Rendering:** Optimal SEO and performance
- 🎯 **File-based Routing:** Intuitive page organization
- 🛠️ **Built-in DevTools:** Enhanced development experience
- 🌐 **Edge Deployment:** Global performance optimization