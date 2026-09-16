# Stripe Payment Setup Guide

This guide explains how to set up Stripe payment links for the AI Character Prompt Business System.

## Prerequisites
- A Stripe account (free to create)
- Business details for verification
- Bank account for payouts

## Step 1: Create a Stripe Account

1. Go to [stripe.com](https://stripe.com)
2. Click "Start now" to create an account
3. Enter your email address and password
4. Complete the onboarding process
5. Verify your email address

## Step 2: Complete Business Verification

1. Go to Stripe Dashboard → Settings → Business details
2. Fill in your business information:
   - Business type (individual/company)
   - Business address
   - Phone number
   - Tax ID (if applicable)
3. Go to Settings → Payouts
4. Add your bank account for receiving payments

## Step 3: Create Products

In the Stripe Dashboard, create the following products:

### Product 1: Single Character Prompt
1. Go to Products → Add product
2. Name: "Single Character Prompt"
3. Description: "One AI character prompt with full details"
4. Price: $2.99 (one-time)
5. Save and create payment link

### Product 2: 10 Character Pack
1. Go to Products → Add product
2. Name: "10 Character Pack"
3. Description: "Pack of 10 AI character prompts"
4. Price: $19.99 (one-time)
5. Save and create payment link

### Product 3: All 45 Characters
1. Go to Products → Add product
2. Name: "All 45 Characters"
3. Description: "Complete database of all 45 AI character prompts"
4. Price: $49.99 (one-time)
5. Save and create payment link

### Product 4: Premium Subscription
1. Go to Products → Add product
2. Name: "Premium Subscription"
3. Description: "Unlimited access to all character prompts and features"
4. Price: $9.99/month (recurring)
5. Billing cycle: Monthly
6. Save and create payment link

### Product 5: Starter Kit
1. Go to Products → Add product
2. Name: "Starter Kit"
3. Description: "Complete package with prompts, templates, and guides"
4. Price: $29.99 (one-time)
5. Save and create payment link

## Step 4: Get Payment Links

For each product, Stripe will generate a payment link:
1. After creating a product, click "Create payment link"
2. Copy the URL (e.g., `https://buy.stripe.com/abc123xyz`)
3. Save each link for configuration

## Step 5: Configure Environment Variables

Add the payment links to your environment:

### Local Development (.env.local)
```bash
STRIPE_SINGLE_PROMPT_LINK=https://buy.stripe.com/your_link_here
STRIPE_CHARACTER_PACK_10_LINK=https://buy.stripe.com/your_link_here
STRIPE_ALL_CHARACTERS_LINK=https://buy.stripe.com/your_link_here
STRIPE_PREMIUM_SUBSCRIPTION_LINK=https://buy.stripe.com/your_link_here
STRIPE_STARTER_KIT_LINK=https://buy.stripe.com/your_link_here
```

### Vercel Deployment
1. Go to your Vercel project settings
2. Navigate to Environment Variables
3. Add the same variables with your payment link URLs
4. Redeploy your application

## Step 6: Test Payment Flow

1. Start your local development server: `npm run dev`
2. Navigate to `/pricing` in your browser
3. Click on a "Purchase" button
4. You should be redirected to Stripe's checkout page
5. Test with Stripe's test mode (use card number: 4242 4242 4242 4242)

## Step 7: Set Up Webhooks (Optional)

For automated fulfillment (e.g., granting premium access after payment):

1. Go to Stripe Dashboard → Developers → Webhooks
2. Add endpoint: `https://your-domain.com/api/stripe/webhook`
3. Select events to listen for:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `invoice.payment_succeeded`
4. Use the webhook secret in your environment: `STRIPE_WEBHOOK_SECRET`

## Stripe Pricing

- **Transaction fees**: 2.9% + 30¢ per successful card charge (US)
- **No monthly fees**
- **No setup fees**
- **No hidden fees**

Compared to platforms:
- Gumroad: 10% + 30¢
- Fiverr: 20% commission
- CRAKREVENUE: Variable commission

Stripe is significantly cheaper for direct sales.

## Security Notes

- Never commit your Stripe API keys to git
- Use environment variables for all sensitive data
- Only use public payment links in the frontend
- Webhook endpoints should verify signatures
- Enable Stripe Radar for fraud protection

## Troubleshooting

### Payment link not working
- Verify the link is published (not in test mode)
- Check that the product is active
- Ensure the URL is correctly set in environment variables

### Webhook not receiving events
- Verify the endpoint URL is correct
- Check that your server is publicly accessible
- Ensure webhook secret matches what Stripe sends

### Test mode vs live mode
- Use test mode for development
- Switch to live mode before going public
- Separate test and live payment links

## Next Steps

After setting up Stripe:
1. Test the complete purchase flow
2. Set up fulfillment automation (webhooks)
3. Configure bot payment integration
4. Add analytics tracking
5. Set up email notifications for purchases
