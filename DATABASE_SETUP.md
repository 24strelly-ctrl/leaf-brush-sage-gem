# Database Configuration Guide

This project supports multiple database backends that can be configured via environment variables. The database backend is automatically selected based on which environment variables are set.

## Supported Database Backends

### 1. Supabase (PostgreSQL)
**Best for:** Production applications with remote database hosting

**Environment Variables:**
- `SUPABASE_URL` - Your Supabase project URL (e.g., `https://your-project.supabase.co`)
- `SUPABASE_ANON_KEY` - Your Supabase anonymous/public key
- `SUPABASE_SERVICE_ROLE_KEY` - Your Supabase service role key (required for server-side operations)

**Setup:**
1. Create a free Supabase project at [supabase.com](https://supabase.com)
2. Navigate to Project Settings > API
3. Copy your Project URL, anon key, and service role key
4. Set the environment variables in your deployment platform or locally

**Example:**
```bash
export SUPABASE_URL="https://your-project.supabase.co"
export SUPABASE_ANON_KEY="your-anon-key"
export SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"
```

**Benefits:**
- Free tier with generous limits (500MB database, 1GB bandwidth)
- Built-in authentication and real-time subscriptions
- Automatic backups and point-in-time recovery
- Easy dashboard for database management

### 2. Neon (PostgreSQL)
**Best for:** Serverless applications with autoscaling

**Environment Variables:**
- `DATABASE_URL` - Your Neon PostgreSQL connection string

**Setup:**
1. Create a free Neon project at [neon.tech](https://neon.tech)
2. Create a database and copy the connection string
3. Set the `DATABASE_URL` environment variable

**Example:**
```bash
export DATABASE_URL="postgresql://user:password@ep-cool-neon.aws.neon.tech/neondb?sslmode=require"
```

**Benefits:**
- Serverless PostgreSQL with autoscaling
- Branching for development/testing
- Free tier with generous limits
- Vercel integration

### 3. SQLite (Local File-based)
**Best for:** Local development, simple applications, or single-user deployments

**Environment Variables:**
- `SQLITE_PATH` - Path to your SQLite database file (e.g., `./data/app.db`)

**Setup:**
1. Install the required dependencies (already included in this project)
2. Set the `SQLITE_PATH` environment variable to your desired database file path
3. The database file will be created automatically if it doesn't exist

**Example:**
```bash
export SQLITE_PATH="./data/app.db"
```

**Benefits:**
- Zero configuration - no external database service needed
- Fast and lightweight
- Portable - database is just a file
- Great for local development and simple applications

**Limitations:**
- Not suitable for high-concurrency applications
- No built-in replication
- Manual backup required
- **Not recommended for Vercel/serverless deployments** due to filesystem limitations

### 4. PGLite (Embedded PostgreSQL)
**Best for:** Live preview, testing, and development (default fallback)

**Environment Variables:**
- None required (automatic fallback when no other database is configured)

**Setup:**
- No setup required - automatically used when no other database environment variables are set
- PostgreSQL compiled to WebAssembly, running entirely in-memory

**Benefits:**
- Zero configuration
- Full PostgreSQL compatibility
- Perfect for live preview and development
- Data resets on server restart

**Limitations:**
- In-memory only (data lost on restart)
- Not suitable for production data persistence

## Database Selection Priority

The database backend is selected in this order:

1. **Supabase** - If `SUPABASE_URL` and `SUPABASE_ANON_KEY` are set
2. **Neon** - If `DATABASE_URL` is set
3. **SQLite** - If `SQLITE_PATH` is set
4. **PGLite** - Default fallback when nothing else is configured

## Migration System

All database backends use the same migration system:

- Migrations are stored in `migrations/*.sql`
- Migrations are automatically applied on first startup
- Postgres SQL syntax is automatically converted to SQLite syntax when using SQLite
- Migration state is tracked in a `_migrations` table

## Testing Different Backends

You can test different database backends locally by setting the appropriate environment variables:

```bash
# Test with SQLite
SQLITE_PATH="./test.db" npm run dev

# Test with Neon
DATABASE_URL="your-neon-connection-string" npm run dev

# Test with Supabase
SUPABASE_URL="your-supabase-url" SUPABASE_ANON_KEY="your-anon-key" SUPABASE_SERVICE_ROLE_KEY="your-service-key" npm run dev

# Test with PGLite (default)
npm run dev
```

## Deployment Configuration

### Vercel
For Vercel deployment, set environment variables in your project settings:

1. Go to your Vercel project dashboard
2. Navigate to Settings > Environment Variables
3. Add the appropriate variables based on your chosen backend:

**For Supabase:**
- `SUPABASE_URL` - Your Supabase project URL
- `SUPABASE_ANON_KEY` - Your Supabase anonymous key
- `SUPABASE_SERVICE_ROLE_KEY` - Your Supabase service role key

**For Neon:**
- `DATABASE_URL` - Your Neon connection string

**For SQLite:**
- `SQLITE_PATH` - Path to your SQLite database file (note: SQLite file-based databases may not work well in Vercel's serverless environment)

**For PGLite (preview/testing):**
- No environment variables needed (automatic fallback)

**Auth Configuration (if using authentication):**
- `BETTER_AUTH_SECRET` - Generate a random secret for Better Auth
- `BETTER_AUTH_URL` - Your deployed app URL
- `VITE_AUTH_ENABLED` - Set to "true" to enable authentication

### Local Development
For local development, you can:
- Use a `.env.local` file (not committed to git)
- Set environment variables in your shell
- Use a tool like `direnv` for automatic environment variable loading

## Database Schema

The database schema is defined in SQL migration files in the `migrations/` directory. When adding new tables or modifying the schema:

1. Create a new migration file: `migrations/0002_your_change.sql`
2. Write your SQL using PostgreSQL syntax
3. The migration will be automatically applied on next startup
4. For SQLite users, the syntax will be automatically converted

## Backup and Recovery

### Supabase
- Automatic daily backups
- Point-in-time recovery available in dashboard
- Manual exports via dashboard or API

### Neon
- Branching for development/testing
- Point-in-time recovery
- Manual exports via CLI or dashboard

### SQLite
- Manual backup by copying the database file
- No automatic backup system
- Consider using a backup script for production

### PGLite
- No persistence (in-memory)
- Not suitable for data that needs to survive restarts

## Troubleshooting

### Connection Issues
- Verify your environment variables are set correctly
- Check that your database service is accessible
- Ensure SSL/TLS settings are correct for Postgres connections

### Migration Failures
- Check the migration file syntax
- Ensure you have proper database permissions
- For SQLite, verify that the Postgres-to-SQLite conversion is working

### Performance Issues
- Consider connection pooling for production databases
- Add appropriate indexes to your tables
- Monitor database size and query performance

## Best Practices

1. **Development:** Use PGLite or SQLite for local development
2. **Staging:** Use Neon or Supabase free tier for staging
3. **Production:** Use Supabase or Neon with appropriate scaling
4. **Backups:** Regular backups for any production database
5. **Monitoring:** Monitor database performance and connection usage
6. **Security:** Never commit database credentials to version control