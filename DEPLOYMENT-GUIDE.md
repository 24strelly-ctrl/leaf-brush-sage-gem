# Free Deployment Guide

This guide explains how to deploy the AI Character Prompt Business System using entirely free services.

## Table of Contents
1. [Vercel Deployment (Web App)](#vercel-deployment)
2. [Local Bot Development with ngrok](#local-bot-development-with-ngrok)
3. [Supabase Free Tier (Optional Remote Database)](#supabase-free-tier)
4. [Stripe Payment Links (Direct Sales)](#stripe-payment-links)

---

## Vercel Deployment (Web App)

The project is already configured for Vercel deployment with PGLite (embedded database) - no paid database required.

### Prerequisites
- A Vercel account (free tier)
- GitHub account (for deployment from repo)

### Deployment Steps

1. **Push your code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel will automatically detect the configuration from `vercel.json`
   - Click "Deploy"

3. **Configure Environment Variables**
   In Vercel project settings, add these environment variables:
   - `BETTER_AUTH_SECRET`: Generate a random string (use: `openssl rand -base64 32`)
   - `BETTER_AUTH_URL`: Your Vercel deployment URL (e.g., `https://your-app.vercel.app`)

4. **Free Tier Limits**
   - 100GB bandwidth per month
   - 6,000 minutes of execution per month
   - Unlimited projects
   - SSL certificates included
   - Automatic deployments from git

### What Runs on Vercel
- TanStack Start web application
- PGLite embedded database (in-memory, resets on redeploy)
- Character database interface
- Content calendar
- API routes

**Note:** PGLite data is not persistent across Vercel deployments. For persistent data, see Supabase section below.

---

## Local Bot Development with ngrok

This setup allows you to develop Telegram and WhatsApp bots locally and expose them to the internet for free.

### Prerequisites
- Node.js v20.20.2 (already installed)
- ngrok account (free tier)

### Setup Steps

1. **Install ngrok**
   - Download from [ngrok.com](https://ngrok.com/download)
   - Sign up for free account
   - Authenticate: `ngrok authtoken YOUR_AUTH_TOKEN`

2. **Create Bot Scripts**
   Create `bots/telegram-bot.js` and `bots/whatsapp-bot.js` in your project.

3. **Start ngrok Tunnel**
   ```bash
   ngrok http 8080
   ```
   This will give you a public URL like `https://abc123.ngrok.io`

4. **Configure Bot Webhooks**
   - For Telegram: Set webhook to `https://abc123.ngrok.io/api/telegram/webhook`
   - For WhatsApp: Set webhook to `https://abc123.ngrok.io/api/whatsapp/webhook`

5. **Start Your Bot Locally**
   ```bash
   npm run api  # Starts the API server
   ```

### ngrok Free Tier Limits
- 1 tunnel at a time
- Random URL each session
- HTTP/HTTPS supported
- Inspect traffic in web dashboard

### Example Bot Startup Script
Create `scripts/start-bots.sh`:
```bash
#!/bin/bash
# Start ngrok in background
ngrok http 8080 > /dev/null 2>&1 &
NGROK_PID=$!

# Start API server
npm run api

# Cleanup on exit
trap "kill $NGROK_PID" EXIT
```

---

## Supabase Free Tier (Optional Remote Database)

If you need persistent data across deployments, use Supabase free tier instead of PGLite.

### Prerequisites
- Supabase account (free tier)

### Setup Steps

1. **Create Supabase Project**
   - Go to [supabase.com](https://supabase.com)
   - Click "New Project"
   - Choose free tier
   - Wait for database to be ready (~2 minutes)

2. **Get Connection String**
   - Go to Project Settings → Database
   - Copy the "Connection String" (URI format)
   - It looks like: `postgresql://postgres:PASSWORD@db.xxx.supabase.co:5432/postgres`

3. **Update Environment Variables**
   - In Vercel project settings, add:
     - `DATABASE_URL`: Your Supabase connection string
   - Or locally, create `.env.local`:
     ```
     DATABASE_URL=postgresql://postgres:PASSWORD@db.xxx.supabase.co:5432/postgres
     ```

4. **Run Migrations**
   ```bash
   npm run db:migrate
   ```

### Supabase Free Tier Limits
- 500MB database storage
- 1GB file storage
- 2GB bandwidth per month
- 50,000 API requests per month
- Unlimited projects

### When to Use Supabase vs PGLite
- **Use PGLite** for: Development, testing, non-critical data, demo apps
- **Use Supabase** for: Production data, user accounts, persistent content, analytics

---

## Stripe Payment Links (Direct Sales)

Accept payments directly through your bots and web app without platform fees.

### Prerequisites
- Stripe account (free to set up, pay-as-you-go)
- Business details for verification

### Setup Steps

1. **Create Stripe Account**
   - Go to [stripe.com](https://stripe.com)
   - Sign up (free)
   - Complete business verification

2. **Create Payment Links**
   - Go to Products → Payment Links
   - Create products for:
     - AI Character Prompts (single purchase)
     - Premium Subscription (recurring)
     - Starter Kit (bundle)
   - Copy the payment link URLs

3. **Integrate with Bots**
   Add payment link buttons to your bot commands:

   **Telegram Example:**
   ```javascript
   bot.command('buy', (ctx) => {
     ctx.reply('Purchase AI Character Prompts:', {
       reply_markup: {
         inline_keyboard: [
           [{ text: 'Buy for $9.99', url: 'https://buy.stripe.com/your-link' }]
         ]
       }
     });
   });
   ```

   **WhatsApp Example:**
   ```javascript
   client.on('message', (message) => {
     if (message.body === '/buy') {
       client.sendMessage(message.from, 'Purchase AI Character Prompts: https://buy.stripe.com/your-link');
     }
   });
   ```

4. **Integrate with Web App**
   Add purchase buttons to your character database interface:
   ```tsx
   <Button onClick={() => window.open('https://buy.stripe.com/your-link')}>
     Purchase Character Pack
   </Button>
   ```

### Stripe Pricing
- 2.9% + 30¢ per transaction (US cards)
- No monthly fees
- No setup fees
- Better than platform fees (Gumroad 10%, Fiverr 20%)

### Payment Link Products to Create
1. **Single Character Prompt** - $2.99
2. **10 Character Pack** - $19.99
3. **All 45 Characters** - $49.99
4. **Premium Subscription** - $9.99/month (unlimited access)
5. **Starter Kit** - $29.99 (includes prompts, templates, guides)

---

## Complete Free Stack Summary

| Component | Free Service | Cost | Limits |
|-----------|-------------|------|--------|
| Web Hosting | Vercel | $0 | 100GB bandwidth/month |
| Database (local) | PGLite | $0 | In-memory only |
| Database (remote) | Supabase | $0 | 500MB storage |
| Bot Tunnel | ngrok | $0 | 1 tunnel |
| Payments | Stripe | Pay-as-you-go | 2.9% + 30¢/transaction |
| Workflow | Notion Free | $0 | Personal use |
| Git Hosting | GitHub Free | $0 | Unlimited public repos |

**Total Monthly Cost: $0** (plus Stripe transaction fees only when you make sales)

---

## Deployment Checklist

- [ ] Push code to GitHub
- [ ] Deploy to Vercel
- [ ] Configure Vercel environment variables
- [ ] Set up ngrok for local bot development
- [ ] Create Stripe payment links
- [ ] Test payment flow
- [ ] Configure Supabase (if persistent data needed)
- [ ] Update DATABASE_URL in Vercel (if using Supabase)
- [ ] Run migrations on Supabase
- [ ] Test all web app features
- [ ] Test bot commands
- [ ] Verify payment integration

---

## Troubleshooting

### Vercel Build Fails
- Check build logs in Vercel dashboard
- Ensure `package.json` scripts are correct
- Verify all dependencies are installed

### ngrok Connection Issues
- Ensure ngrok is authenticated
- Check that port 8080 is not in use
- Restart ngrok if URL changes

### PGLite Data Lost on Deploy
- This is expected - PGLite is in-memory
- Use Supabase for persistent data
- Or add data seeding in migrations

### Stripe Payment Links Not Working
- Verify product is active in Stripe dashboard
- Check payment link is published
- Ensure webhook endpoints are configured if needed

---

## Next Steps

After deploying:
1. Monitor Vercel analytics
2. Set up Stripe webhook handlers for fulfillment
3. Configure bot rate limiting for free users
4. Add analytics tracking (Plausible or Umami for free)
5. Set up automated backups for Supabase
