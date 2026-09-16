# Supabase Free Tier Setup Guide

This guide explains how to set up Supabase as a free remote database alternative to PGLite for persistent data storage.

## Why Use Supabase?

**PGLite (Current Default)**
- ✅ Free
- ✅ No setup required
- ✅ Works offline
- ❌ In-memory only (data lost on restart/redeploy)
- ❌ Not suitable for production data

**Supabase**
- ✅ Free tier (500MB storage)
- ✅ Persistent data across deployments
- ✅ Remote access from anywhere
- ✅ Real-time subscriptions
- ✅ Built-in authentication
- ✅ RESTful API
- ❌ Requires setup
- ❌ Requires internet connection

## Prerequisites
- A Supabase account (free)
- GitHub account (for Git integration, optional)

## Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project"
3. Sign up with GitHub or email
4. Click "New Project"
5. Fill in project details:
   - **Name**: `ai-character-prompts` (or your preferred name)
   - **Database Password**: Generate a strong password (save this!)
   - **Region**: Choose closest to your users
   - **Pricing Plan**: Free
6. Click "Create new project"
7. Wait for the project to be provisioned (~2 minutes)

## Step 2: Get Connection String

1. Once the project is ready, go to **Project Settings** → **Database**
2. Scroll down to **Connection String**
3. Copy the **URI** format connection string
4. It will look like:
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.xxx.supabase.co:5432/postgres
   ```

## Step 3: Configure Environment Variables

### Local Development (.env.local)
Create or edit `.env.local` in your project root:
```bash
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@db.xxx.supabase.co:5432/postgres
```

### Vercel Deployment
1. Go to your Vercel project settings
2. Navigate to **Environment Variables**
3. Add `DATABASE_URL` with your Supabase connection string
4. Redeploy your application

## Step 4: Run Migrations

Your project already has migration files in `migrations/`. To apply them to Supabase:

### Option A: Automatic (Recommended)
The project's migration system will automatically apply migrations when:
- You run `npm run db:migrate`
- You deploy to Vercel (build script includes `npm run db:migrate`)

### Option B: Manual via Supabase Dashboard
1. Go to Supabase Dashboard → **SQL Editor**
2. Click "New Query"
3. Copy the contents of each migration file from `migrations/`
4. Run each migration in order:
   - `migrations/auth/0001_auth.sql`
   - Any `0002_*.sql` files you create

## Step 5: Verify Connection

### Local Verification
```bash
# Set the environment variable
export DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@db.xxx.supabase.co:5432/postgres"

# Run the migration
npm run db:migrate

# Start the dev server
npm run dev
```

### Verification Checks
1. Check that the app starts without database errors
2. Navigate to character database page
3. Verify data persists across page refreshes
4. Check browser console for any connection errors

## Step 6: Enable Row Level Security (Optional but Recommended)

For production applications, enable RLS to protect your data:

1. Go to Supabase Dashboard → **Authentication** → **Policies**
2. Enable "Enable RLS" on your tables
3. Add policies for:
   - `public` read access (for character data)
   - `authenticated` write access (for user data)

Example policy for character table:
```sql
-- Allow public read access
CREATE POLICY "Public read access" ON characters
  FOR SELECT
  TO public
  USING (true);

-- Allow authenticated users to insert
CREATE POLICY "Authenticated insert" ON characters
  FOR INSERT
  TO authenticated
  WITH CHECK (true);
```

## Step 7: Backups

Supabase free tier includes:
- **Daily backups**: Automatic, retained for 7 days
- **Point-in-time recovery**: Available for paid plans

To manually backup:
1. Go to **Database** → **Backups**
2. Click "Create backup"
3. Download the backup file

## Supabase Free Tier Limits

| Resource | Limit |
|----------|-------|
| Database Storage | 500 MB |
| File Storage | 1 GB |
| Bandwidth | 2 GB/month |
| API Requests | 50,000/month |
| Email Messages | 3/month |
| Auth Users | Unlimited |
| Real-time Connections | 200 concurrent |

## Migration from PGLite to Supabase

### When to Migrate
- ✅ Going to production
- ✅ Need persistent data
- ✅ Multiple users need shared data
- ✅ Need real-time features

### When to Stay with PGLite
- ✅ Development/testing
- ✅ Single-user local app
- ✅ Data can be regenerated
- ✅ Offline usage required

### Migration Steps
1. Export data from PGLite (if any)
2. Set up Supabase project
3. Configure `DATABASE_URL`
4. Run migrations
5. Import data (if exported)
6. Test application
7. Deploy to production

## Troubleshooting

### Connection refused
- Verify the connection string is correct
- Check that your IP is not blocked (Supabase allows all by default)
- Ensure the database is running (check Supabase status page)

### Migration fails
- Check that migration files are in the correct format
- Verify SQL syntax is PostgreSQL-compatible
- Check for duplicate table names
- Review migration logs in Supabase Dashboard

### Data not persisting
- Verify `DATABASE_URL` is set correctly
- Check that you're not in PGLite mode (empty DATABASE_URL)
- Ensure migrations completed successfully
- Check browser console for errors

### Performance issues
- Free tier has resource limits
- Consider adding indexes to frequently queried columns
- Use connection pooling for high traffic
- Monitor usage in Supabase Dashboard

## Advanced Configuration

### Connection Pooling
For production, use Supabase's connection pooler:
```
postgresql://postgres:[YOUR-PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true
```

### Environment-Specific Configs
```bash
# Development (.env.local)
DATABASE_URL=postgresql://postgres:dev_password@db.dev.supabase.co:5432/postgres

# Production (Vercel)
DATABASE_URL=postgresql://postgres:prod_password@db.prod.supabase.co:5432/postgres
```

## Alternative: Railway PostgreSQL

If Supabase doesn't meet your needs, Railway also offers a free PostgreSQL tier:

1. Create account at [railway.app](https://railway.app)
2. Create new project → Add PostgreSQL
3. Get connection string from Railway dashboard
4. Configure `DATABASE_URL` same as above

Railway free tier: $5/month credit (sufficient for small projects)

## Security Best Practices

1. **Never commit DATABASE_URL to git**
2. **Use environment variables** for all secrets
3. **Enable RLS** for production databases
4. **Use read-only users** for client queries
5. **Rotate passwords** regularly
6. **Monitor access logs** in Supabase Dashboard
7. **Back up regularly** before major changes

## Next Steps

After setting up Supabase:
1. Test all database operations
2. Set up automated backups
3. Configure monitoring alerts
4. Enable RLS policies
5. Set up connection pooling for production
6. Document your database schema
