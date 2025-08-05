# Deployment Guide for OneTapCampus

This guide will help you deploy OneTapCampus to various hosting platforms.

## 🚀 Quick Deploy Options

### 1. Netlify (Recommended for beginners)

1. **Fork/Clone the repository**
   ```bash
   git clone https://github.com/yourusername/onetapcampus.git
   cd onetapcampus
   ```

2. **Deploy to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Sign up/Login with GitHub
   - Click "New site from Git"
   - Choose your repository
   - Set build command: `echo "Static site"`
   - Set publish directory: `.`
   - Click "Deploy site"

3. **Custom Domain (Optional)**
   - Go to Site settings > Domain management
   - Add your custom domain
   - Configure DNS settings

### 2. Vercel

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Follow the prompts**
   - Link to existing project or create new
   - Set project name
   - Deploy

### 3. GitHub Pages

1. **Enable GitHub Pages**
   - Go to repository settings
   - Scroll to "Pages" section
   - Select source: "Deploy from a branch"
   - Choose branch: `main`
   - Click "Save"

2. **Your site will be available at:**
   `https://yourusername.github.io/onetapcampus`

### 4. Firebase Hosting

1. **Install Firebase CLI**
   ```bash
   npm install -g firebase-tools
   ```

2. **Login to Firebase**
   ```bash
   firebase login
   ```

3. **Initialize Firebase**
   ```bash
   firebase init hosting
   ```

4. **Configure**
   - Select your project
   - Set public directory: `.`
   - Configure as single-page app: `No`
   - Don't overwrite index.html

5. **Deploy**
   ```bash
   firebase deploy
   ```

## 🌐 Custom Domain Setup

### 1. Domain Registration
- Register domain with provider (Namecheap, GoDaddy, etc.)
- Point nameservers to your hosting provider

### 2. SSL Certificate
- Most hosting providers offer free SSL
- Enable HTTPS redirect
- Set up HSTS headers

### 3. DNS Configuration
```
Type    Name    Value
A       @       [Your hosting IP]
CNAME   www     yourdomain.com
```

## 📊 Analytics Setup

### Google Analytics 4
1. Create GA4 property
2. Get Measurement ID
3. Add to `script.js`:
```javascript
// Google Analytics 4
gtag('config', 'G-XXXXXXXXXX');
```

### Google Search Console
1. Add your domain
2. Verify ownership
3. Submit sitemap.xml
4. Monitor performance

## 🔧 Environment Variables

Create `.env` file for production:
```env
# Analytics
GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Contact Form
CONTACT_EMAIL=contact@onetapcampus.com

# API Keys (when backend is added)
API_URL=https://api.onetapcampus.com
```

## 📱 PWA Configuration

### 1. Generate Icons
Use tools like:
- [PWA Asset Generator](https://github.com/onderceylan/pwa-asset-generator)
- [Favicon Generator](https://realfavicongenerator.net/)

### 2. Update manifest.json
- Replace icon paths with your generated icons
- Update theme colors
- Add your domain to start_url

### 3. Test PWA
- Use Chrome DevTools > Application tab
- Test offline functionality
- Verify install prompt

## 🚀 Performance Optimization

### 1. Image Optimization
```bash
# Install image optimization tools
npm install -g imagemin-cli

# Optimize images
imagemin images/* --out-dir=optimized/
```

### 2. Minification
```bash
# Install minification tools
npm install -g uglify-js clean-css-cli

# Minify JavaScript
uglifyjs script.js -o script.min.js

# Minify CSS (if using custom CSS)
cleancss style.css -o style.min.css
```

### 3. Compression
Enable gzip compression on your server:
```nginx
# Nginx
gzip on;
gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
```

## 🔒 Security Headers

Add security headers to your server:

```nginx
# Nginx
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header X-Content-Type-Options "nosniff" always;
add_header Referrer-Policy "no-referrer-when-downgrade" always;
add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
```

## 📈 Monitoring

### 1. Uptime Monitoring
- [UptimeRobot](https://uptimerobot.com/)
- [Pingdom](https://pingdom.com/)
- [StatusCake](https://statuscake.com/)

### 2. Performance Monitoring
- [Google PageSpeed Insights](https://pagespeed.web.dev/)
- [GTmetrix](https://gtmetrix.com/)
- [WebPageTest](https://www.webpagetest.org/)

### 3. Error Tracking
- [Sentry](https://sentry.io/)
- [LogRocket](https://logrocket.com/)
- [Bugsnag](https://bugsnag.com/)

## 🔄 CI/CD Pipeline

### GitHub Actions Example
Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    
    - name: Deploy to Netlify
      uses: nwtgck/actions-netlify@v1.2
      with:
        publish-dir: '.'
        production-branch: main
        github-token: ${{ secrets.GITHUB_TOKEN }}
        deploy-message: "Deploy from GitHub Actions"
      env:
        NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
        NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

## 🆘 Troubleshooting

### Common Issues

1. **404 Errors**
   - Check file paths
   - Verify server configuration
   - Ensure index.html is in root

2. **CORS Issues**
   - Configure CORS headers
   - Check API endpoints
   - Verify domain settings

3. **SSL Issues**
   - Check certificate validity
   - Configure redirects
   - Update mixed content

4. **Performance Issues**
   - Optimize images
   - Minify assets
   - Enable caching
   - Use CDN

## 📞 Support

- **Documentation**: Check README.md
- **Issues**: Create GitHub issue
- **Email**: support@onetapcampus.com
- **Community**: Join our Discord/Slack

---

**Happy Deploying! 🚀**