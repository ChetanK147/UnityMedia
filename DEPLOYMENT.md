# UnityMedia Deployment Guide

This guide provides step-by-step instructions for deploying UnityMedia to production.

## Pre-Deployment Checklist

### 1. Environment Setup
- [ ] Supabase project created and configured
- [ ] Database migrations applied
- [ ] Environment variables configured
- [ ] SSL certificate ready
- [ ] Domain name configured

### 2. Code Preparation
- [ ] All features tested locally
- [ ] Production build successful
- [ ] No console errors or warnings
- [ ] Performance optimizations applied
- [ ] Security measures implemented

### 3. Database Setup
- [ ] Production database created
- [ ] Migrations applied
- [ ] Sample data inserted (optional)
- [ ] Backup strategy configured
- [ ] Row Level Security policies tested

## Deployment Options

### Option 1: Netlify Deployment (Recommended)

#### Step 1: Prepare Repository
```bash
# Ensure your code is committed and pushed
git add .
git commit -m "Production ready"
git push origin main
```

#### Step 2: Connect to Netlify
1. Go to [Netlify](https://netlify.com)
2. Click "New site from Git"
3. Connect your GitHub/GitLab repository
4. Select the UnityMedia repository

#### Step 3: Configure Build Settings
- **Build command:** `npm run build`
- **Publish directory:** `dist`
- **Node version:** `18` (in Environment variables)

#### Step 4: Environment Variables
Add these in Netlify dashboard under Site settings > Environment variables:
```
VITE_SUPABASE_URL=your_production_supabase_url
VITE_SUPABASE_ANON_KEY=your_production_supabase_anon_key
```

#### Step 5: Deploy
- Click "Deploy site"
- Wait for build to complete
- Test the deployed site

### Option 2: Vercel Deployment

#### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

#### Step 2: Deploy
```bash
# From project root
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name: unitymedia
# - Directory: ./
# - Override settings? No
```

#### Step 3: Configure Environment Variables
```bash
vercel env add VITE_SUPABASE_URL
vercel env add VITE_SUPABASE_ANON_KEY
```

#### Step 4: Redeploy with Environment Variables
```bash
vercel --prod
```

### Option 3: Custom Server Deployment

#### Requirements
- Ubuntu 20.04+ or similar Linux distribution
- Node.js 18+
- Nginx
- SSL certificate (Let's Encrypt recommended)

#### Step 1: Server Setup
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install Nginx
sudo apt install nginx -y

# Install PM2 for process management
sudo npm install -g pm2
```

#### Step 2: Deploy Application
```bash
# Clone repository
git clone <your-repo-url> /var/www/unitymedia
cd /var/www/unitymedia

# Install dependencies
npm install

# Create production environment file
sudo nano .env.production
# Add your environment variables

# Build for production
npm run build

# Set up PM2 ecosystem file
sudo nano ecosystem.config.js
```

#### Step 3: PM2 Configuration
```javascript
// ecosystem.config.js
module.exports = {
  apps: [{
    name: 'unitymedia',
    script: 'npm',
    args: 'run preview',
    cwd: '/var/www/unitymedia',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
};
```

#### Step 4: Nginx Configuration
```bash
sudo nano /etc/nginx/sites-available/unitymedia
```

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

#### Step 5: Enable Site and SSL
```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/unitymedia /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx

# Install SSL certificate
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Start application
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

## Database Migration

### Production Database Setup

#### Step 1: Create Production Supabase Project
1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Create new project
3. Choose production-appropriate region
4. Set strong database password

#### Step 2: Apply Migrations
1. Go to SQL Editor in Supabase dashboard
2. Copy content from `supabase/migrations/create_unitymedia_schema.sql`
3. Execute the migration
4. Verify all tables and policies are created

#### Step 3: Configure Authentication
1. Go to Authentication > Settings
2. Configure email templates
3. Set up redirect URLs for production domain
4. Configure any social providers if needed

## Domain Configuration

### DNS Setup
```
# A Records
@ -> Your server IP or Netlify IP
www -> Your server IP or Netlify IP

# CNAME (if using Netlify/Vercel)
www -> your-site.netlify.app
```

### SSL Certificate
- **Netlify/Vercel:** Automatic SSL
- **Custom server:** Use Let's Encrypt (shown above)

## Post-Deployment Tasks

### 1. Verify Functionality
- [ ] Homepage loads correctly
- [ ] User registration works
- [ ] User login works
- [ ] Equipment catalog displays
- [ ] Booking system functions
- [ ] Admin dashboard accessible
- [ ] Contact forms work
- [ ] All images load properly

### 2. Performance Testing
```bash
# Install Lighthouse CLI
npm install -g lighthouse

# Run performance audit
lighthouse https://yourdomain.com --output html --output-path ./lighthouse-report.html
```

### 3. Security Testing
- [ ] HTTPS enforced
- [ ] Security headers present
- [ ] No sensitive data exposed
- [ ] Authentication working properly
- [ ] Authorization rules enforced

### 4. Monitoring Setup
- [ ] Error tracking configured
- [ ] Performance monitoring active
- [ ] Uptime monitoring enabled
- [ ] Database monitoring configured

## Backup Strategy

### Database Backups
```bash
# Daily automated backup (add to crontab)
0 2 * * * pg_dump "postgresql://user:pass@host:port/db" > /backups/unitymedia_$(date +\%Y\%m\%d).sql
```

### File Backups
```bash
# Weekly file backup
0 3 * * 0 tar -czf /backups/unitymedia_files_$(date +\%Y\%m\%d).tar.gz /var/www/unitymedia
```

## Maintenance

### Regular Updates
```bash
# Update dependencies (monthly)
npm update
npm audit fix

# Update system packages
sudo apt update && sudo apt upgrade -y

# Restart services
pm2 restart all
sudo systemctl reload nginx
```

### Monitoring Commands
```bash
# Check application status
pm2 status
pm2 logs unitymedia

# Check Nginx status
sudo systemctl status nginx
sudo nginx -t

# Check SSL certificate
sudo certbot certificates
```

## Troubleshooting

### Common Issues

#### Build Failures
```bash
# Clear cache and rebuild
rm -rf node_modules package-lock.json
npm install
npm run build
```

#### Database Connection Issues
- Verify environment variables
- Check Supabase project status
- Confirm network connectivity
- Review RLS policies

#### Performance Issues
- Enable gzip compression
- Optimize images
- Use CDN for static assets
- Monitor database queries

### Support Contacts
- **Technical Issues:** [Your technical support email]
- **Hosting Issues:** [Your hosting provider support]
- **Domain Issues:** [Your domain registrar support]

## Rollback Plan

### Quick Rollback (Netlify/Vercel)
1. Go to deployment dashboard
2. Select previous successful deployment
3. Click "Publish deploy"

### Manual Rollback
```bash
# Revert to previous commit
git revert HEAD
git push origin main

# Or rollback to specific commit
git reset --hard <commit-hash>
git push --force origin main
```

## Success Criteria

Deployment is successful when:
- [ ] Site loads without errors
- [ ] All functionality works as expected
- [ ] Performance scores are acceptable (>90 Lighthouse)
- [ ] Security measures are in place
- [ ] Monitoring is active
- [ ] Backups are configured
- [ ] SSL certificate is valid
- [ ] Domain resolves correctly

---

**Note:** Always test deployments in a staging environment before deploying to production.