const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Handle root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Handle solar-system-scope route
app.get('/solar-system-scope/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'solar-system-scope', 'index.html'));
});

// Handle birds-on-earth-birdnet-live-map route
app.get('/birds-on-earth-birdnet-live-map/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'birds-on-earth-birdnet-live-map', 'index.html'));
});

// Handle archive route
app.get('/archive/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'archive', 'index.html'));
});

// Handle crypto-currency-donations route
app.get('/crypto-currency-donations/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'crypto-currency-donations', 'index.html'));
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ 
        status: 'healthy', 
        timestamp: new Date().toISOString(),
        service: 'orwebcraft-website'
    });
});

// Handle 404s
app.use('*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Server error:', err.stack);
    res.status(500).json({ 
        error: 'Internal Server Error',
        message: 'Something went wrong on the server'
    });
});

app.listen(PORT, () => {
    console.log(`Orwebcraft Ecologists Association website running on port ${PORT}`);
    console.log(`Access the site at: http://localhost:${PORT}`);
});

module.exports = app;