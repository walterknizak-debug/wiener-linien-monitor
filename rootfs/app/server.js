const http = require('http');
const https = require('https');
const url = require('url');

const PORT = 8000;
const API_BASE = 'www.wienerlinien.at';

// CORS Headers
const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
};

// Proxy-Funktion für API-Anfragen
function proxyApiRequest(stopIds, res) {
    const params = stopIds.map(id => `stopId=${id}`).join('&');
    const apiPath = `/ogd_realtime/monitor?${params}`;
    
    const options = {
        hostname: API_BASE,
        path: apiPath,
        method: 'GET',
        headers: {
            'User-Agent': 'Mozilla/5.0'
        }
    };
    
    const apiReq = https.request(options, (apiRes) => {
        let data = '';
        
        apiRes.on('data', (chunk) => {
            data += chunk;
        });
        
        apiRes.on('end', () => {
            res.writeHead(200, corsHeaders);
            res.end(data);
        });
    });
    
    apiReq.on('error', (error) => {
        console.error('API Request Error:', error);
        res.writeHead(500, corsHeaders);
        res.end(JSON.stringify({ error: 'API request failed', details: error.message }));
    });
    
    apiReq.end();
}

// Server erstellen
const server = http.createServer((req, res) => {
    // CORS Preflight
    if (req.method === 'OPTIONS') {
        res.writeHead(204, corsHeaders);
        res.end();
        return;
    }
    
    const parsedUrl = url.parse(req.url, true);
    
    // API Proxy Endpoint
    if (parsedUrl.pathname === '/api/departures') {
        const stopIds = parsedUrl.query.stopIds ? parsedUrl.query.stopIds.split(',') : [];
        
        if (stopIds.length === 0) {
            res.writeHead(400, corsHeaders);
            res.end(JSON.stringify({ error: 'No stopIds provided' }));
            return;
        }
        
        proxyApiRequest(stopIds, res);
        return;
    }
    
    // Statische Dateien
    const fs = require('fs');
    const path = require('path');
    
    let filePath = '.' + parsedUrl.pathname;
    if (filePath === './') {
        filePath = './index.html';
    }
    
    const extname = String(path.extname(filePath)).toLowerCase();
    const mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
        '.ico': 'image/x-icon'
    };
    
    const contentType = mimeTypes[extname] || 'application/octet-stream';
    
    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>404 - File Not Found</h1>', 'utf-8');
            } else {
                res.writeHead(500);
                res.end('Server Error: ' + error.code);
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
    console.log(`API Proxy available at http://localhost:${PORT}/api/departures?stopIds=272,377`);
});