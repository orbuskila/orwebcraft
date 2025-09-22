# Deployment Instructions for Orwebcraft Website

This document provides instructions for deploying the Orwebcraft Ecologists Association website to fix the 502 Gateway errors.

## Quick Start

### Using Docker (Recommended)

1. Install Docker and Docker Compose on your server
2. Clone this repository
3. Run the following commands:

```bash
# Build and start the services
docker-compose up -d

# Check the status
docker-compose ps
```

The website will be available at:
- http://localhost (main site)
- http://localhost/solar-system-scope/
- http://localhost/birds-on-earth-birdnet-live-map/
- http://localhost/archive/
- http://localhost/crypto-currency-donations/

### Using Node.js directly

1. Install Node.js (version 14 or higher)
2. Install dependencies:

```bash
npm install
```

3. Start the server:

```bash
npm start
```

The website will be available at http://localhost:3000

### Using Nginx (Production)

1. Copy the `nginx.conf` file to your Nginx configuration directory
2. Copy the `public` folder to `/var/www/orwebcraft/`
3. Restart Nginx:

```bash
sudo systemctl restart nginx
```

## Domain Configuration

Update your DNS settings to point the following domains to your server:
- donations.orwebcraft.com
- www.solarsystemscope.com

## SSL Configuration

For HTTPS support, add SSL certificates to your Nginx configuration:

```nginx
server {
    listen 443 ssl http2;
    ssl_certificate /path/to/certificate.crt;
    ssl_certificate_key /path/to/private.key;
    # ... rest of configuration
}
```

## Health Checks

The application includes a health check endpoint at `/health` that returns:
- Status 200 when healthy
- JSON response with service status and timestamp

## Troubleshooting

### 502 Gateway Error
- Ensure the Node.js server is running on port 3000
- Check that Nginx can connect to the backend service
- Verify firewall settings allow traffic on required ports

### File Permissions
- Ensure the web server has read access to the `public` directory
- Set appropriate ownership: `chown -R www-data:www-data /var/www/orwebcraft/`

### Docker Issues
- Check container logs: `docker-compose logs`
- Restart services: `docker-compose restart`
- Rebuild if needed: `docker-compose up --build`

## Monitoring

Monitor the application health using:
- Health check endpoint: `/health`
- Container health status: `docker-compose ps`
- Nginx access/error logs: `/var/log/nginx/`