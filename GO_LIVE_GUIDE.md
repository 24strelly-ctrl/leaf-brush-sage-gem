# Go-Live Guide: Your App to Production

## Before You Start

This guide walks you through taking your app from development to a live website anyone can visit. Follow each step in order. If you get stuck, don't worry — most steps are one-time setup.

**What you'll need:**
- A Vercel account (free)
- A database account (Supabase or Neon — both have free tiers)
- About 30 minutes of focused time
- Your computer with the project files

---

## Step 1: Choose Your Database

Your app needs a place to store data. You have four options. Pick ONE that fits your situation.

### Option A: Supabase (Recommended for most people)
**Best if:** You want a full-featured database with a nice dashboard, built-in backups, and don't mind creating an account.

**Free tier includes:**
- 500 MB of database storage
- 1 GB of bandwidth per month
- Automatic daily backups
- Easy-to-use web dashboard

**Choose this if:** You're new to databases or want the easiest experience.

---

### Option B: Neon
**Best if:** You want a serverless database that scales automatically and you're comfortable with PostgreSQL.

**Free tier includes:**
- 3 GB of storage
- Hours of compute time per month
- Branching for testing

**Choose this if:** You like serverless technology or already know PostgreSQL.

---

### Option C: SQLite (Local file)
**Best if:** You're running this on your own server (not Vercel) and want a simple file-based database.

**Important:** This does NOT work well on Vercel because Vercel doesn't keep files between requests.

**Choose this if:** You're deploying to your own server, not Vercel.

---

### Option D: PGLite (Default - No setup)
**Best if:** You just want to test things quickly or don't need permanent data storage.

**Important:** Data disappears when the server restarts. Not for production.

**Choose this if:** You're just experimenting or testing.

---

## Step 2: Set Up Your Database

Skip to the section that matches your choice from Step 1.

### If you chose Supabase:

1. Go to https://supabase.com in your browser
2. Click "Start your project" or "Sign up"
3. Create an account (it's free)
4. Click "New Project"
5. Give your project a name (anything you want)
6. Choose a password (save this somewhere safe!)
7. Pick a region close to where you live (faster = better)
8. Click "Create new project"
9. Wait about 2 minutes for it to set up
10. Click the "Settings" icon (gear icon) on the left sidebar
11. Click "API" in the settings menu
12. You'll see three important things — copy each of these:

   - **Project URL** (looks like: https://your-project.supabase.co)
   - **anon/public key** (a long string of random characters)
   - **service_role key** (another long string — this one is extra important)

13. Save all three in a safe place (you'll need them in Step 4)

**You're done with Supabase setup!** Keep this tab open — you might need it later.

---

### If you chose Neon:

1. Go to https://neon.tech in your browser
2. Click "Sign up" or "Connect with GitHub"
3. Create an account (it's free)
4. Click "Create a project"
5. Give your project a name
6. Choose a region close to you
7. Click "Create project"
8. Wait for it to set up (usually under a minute)
9. You'll see a "Connection string" — copy it
10. It looks like: `postgresql://user:password@ep-something.aws.neon.tech/neondb?sslmode=require`
11. Save this connection string somewhere safe

**You're done with Neon setup!**

---

### If you chose SQLite:

You don't need to create an account. The database is just a file on your computer.

1. Decide where you want to keep the database file
2. A good place is in a `data` folder in your project
3. Remember the path (like `./data/app.db`)

**You're done with SQLite setup!**

---

### If you chose PGLite:

You don't need to do anything. PGLite is built-in and works automatically.

**You're done!**

---

## Step 3: Set Up Your Vercel Account

1. Go to https://vercel.com in your browser
2. Click "Sign Up"
3. You can sign up with GitHub, GitLab, or email
4. Follow the setup steps
5. Verify your email if they ask you to
6. Once you're logged in, you're ready

**You're done with Vercel setup!**

---

## Step 4: Connect Your Project to Vercel

1. Make sure your project code is on GitHub
   - If it's not, create a GitHub repository
   - Push your code to GitHub
   - The folder should be: `/Users/jypsee72/Desktop/Eternity_Calls/Private & Shared`

2. In Vercel, click "Add New" in the top right
3. Click "Project"
4. You'll see your GitHub repositories listed
5. Find your project and click "Import"
6. Vercel will analyze your project
7. You'll see configuration options — here's what to set:

   **Project Name:** Anything you want (this becomes part of your URL)
   **Framework Preset:** Vite (Vercel should detect this automatically)
   **Root Directory:** Leave as is (or `./` if it asks)
   **Build Command:** Should auto-fill to `npm run build`
   **Output Directory:** Should auto-fill to `.vercel/output`

8. Click "Deploy" at the bottom
9. Wait for Vercel to build your project (1-3 minutes)
10. You'll see a success message with your new website URL!
11. Click the URL to visit your live site

**Your app is now live!** But we need to connect the database next.

---

## Step 5: Add Environment Variables to Vercel

Environment variables are like secret settings that tell your app which database to use.

1. In Vercel, go to your project dashboard
2. Click the "Settings" tab at the top
3. Click "Environment Variables" on the left sidebar
4. You'll see sections for different environments (Production, Preview, Development)
5. We'll add variables to ALL THREE sections for now

### If you're using Supabase:

For each environment (Production, Preview, Development), add these three variables:

**Variable 1:**
- Name: `SUPABASE_URL`
- Value: Your Supabase project URL (from Step 2)
- Click "Add"

**Variable 2:**
- Name: `SUPABASE_ANON_KEY`
- Value: Your Supabase anon key (from Step 2)
- Click "Add"

**Variable 3:**
- Name: `SUPABASE_SERVICE_ROLE_KEY`
- Value: Your Supabase service role key (from Step 2)
- Click "Add"

---

### If you're using Neon:

For each environment (Production, Preview, Development), add this variable:

**Variable:**
- Name: `DATABASE_URL`
- Value: Your Neon connection string (from Step 2)
- Click "Add"

---

### If you're using SQLite:

For each environment (Production, Preview, Development), add this variable:

**Variable:**
- Name: `SQLITE_PATH`
- Value: `./data/app.db` (or whatever path you chose)
- Click "Add"

**Warning:** SQLite on Vercel is not recommended. Your data might disappear. Consider using Supabase or Neon instead.

---

### If you're using PGLite:

You don't need to add any database variables. PGLite is the default fallback.

---

## Step 6: Add Authentication Variables (If You Want User Accounts)

If your app has user sign-in, login, or personal profiles, you need these variables. If your app doesn't have user accounts, skip this step.

For each environment (Production, Preview, Development), add these variables:

**Variable 1:**
- Name: `BETTER_AUTH_SECRET`
- Value: Generate a random secret string
  - Go to https://www.uuidgenerator.net/api/version4
  - Copy the UUID it gives you
  - Or just type a long random string of letters and numbers
- Click "Add"

**Variable 2:**
- Name: `BETTER_AUTH_URL`
- Value: Your Vercel website URL (from Step 4)
  - Include `https://` at the start
  - Example: `https://your-app.vercel.app`
- Click "Add"

**Variable 3:**
- Name: `VITE_AUTH_ENABLED`
- Value: `true`
- Click "Add"

---

## Step 7: Redeploy with New Variables

After adding environment variables, you need to rebuild your app so it uses them.

1. In Vercel, go to your project dashboard
2. Click the "Deployments" tab at the top
3. Find your latest deployment at the top
4. Click the three dots (⋯) menu on the right
5. Click "Redeploy"
6. A popup will appear — click "Redeploy" again
7. Wait for the rebuild (1-3 minutes)
8. Once it's done, click the deployment URL to visit your site

**Your app is now live with your database connected!**

---

## Step 8: Test Your Live App

Visit your live website and test it:

1. **Test the database:**
   - Create some data (add a todo, fill out a form, etc.)
   - Refresh the page
   - Check if your data is still there
   - If yes, your database is working!

2. **Test authentication (if you set it up):**
   - Try to sign up or log in
   - Create an account
   - Log out and log back in
   - Check if your data persists

3. **Test on mobile:**
   - Open your site on your phone
   - Make sure it looks good and works

**If something doesn't work:**
- Check the environment variables in Vercel (make sure there are no typos)
- Check your database service (Supabase/Neon) dashboard for errors
- Look at Vercel deployment logs for error messages

---

## Step 9: Set Up a Custom Domain (Optional)

If you want your own domain name (like `yourapp.com` instead of `yourapp.vercel.app`):

1. Buy a domain from any domain registrar (GoDaddy, Namecheap, Google Domains, etc.)
2. In Vercel, go to your project settings
3. Click "Domains" on the left
4. Click "Add Domain"
5. Enter your domain name
6. Follow Vercel's instructions to update your DNS settings
7. Wait for the domain to propagate (usually takes a few minutes to a few hours)

**You now have a professional-looking website!**

---

## Step 10: Ongoing Maintenance

Once your app is live, here's what to keep in mind:

### Weekly:
- Check your Vercel dashboard for any errors
- Monitor your database usage (Supabase/Neon dashboards show this)

### Monthly:
- Check if you're approaching free tier limits
- Consider backing up your database (Supabase does this automatically)
- Update your dependencies if there are security updates

### As needed:
- If you add new features, test them locally first, then deploy
- If you change the database schema, create a new migration file
- Keep your environment variables in sync across environments

---

## Quick Reference Card

### Supabase Variables:
```
SUPABASE_URL = https://your-project.supabase.co
SUPABASE_ANON_KEY = your-anon-key
SUPABASE_SERVICE_ROLE_KEY = your-service-key
```

### Neon Variables:
```
DATABASE_URL = postgresql://user:pass@ep-xxx.aws.neon.tech/db?sslmode=require
```

### SQLite Variables:
```
SQLITE_PATH = ./data/app.db
```

### Auth Variables (if needed):
```
BETTER_AUTH_SECRET = random-long-string
BETTER_AUTH_URL = https://your-app.vercel.app
VITE_AUTH_ENABLED = true
```

---

## Troubleshooting Common Issues

### "Database connection failed"
- Check your environment variables for typos
- Make sure your database service (Supabase/Neon) is running
- Verify your connection string is complete

### "Migration failed"
- Check the migration files in your `migrations/` folder
- Make sure your database user has permission to create tables
- Try running migrations locally first

### "Auth not working"
- Make sure all three auth variables are set
- Check that `BETTER_AUTH_URL` matches your actual domain
- Verify `VITE_AUTH_ENABLED` is set to `true`

### "Site is blank after deployment"
- Check Vercel build logs for errors
- Make sure `npm run build` passes locally
- Verify your `vercel.json` configuration

### "Data disappears on Vercel"
- You might be using SQLite (which doesn't work well on Vercel)
- Switch to Supabase or Neon for reliable data storage

---

## You're Done!

Congratulations! Your app is live and accessible to anyone with an internet connection. You now have:
- A working database
- A live website
- Professional hosting

If you need to make changes later, just:
1. Make changes locally
2. Test them
3. Push to GitHub
4. Vercel will auto-deploy

Good luck with your app!
