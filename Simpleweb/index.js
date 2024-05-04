const express = require('express');
const os = require('os');

const app = express();
const port = 8080;

// Define the main path ("/")
app.get('/', (req, res) => {
    // Construct the response with server IP address, hostname, and application version
    let response = `Server IP Address: ${getIPAddress()}\n`;
    response += `Server Name (hostname): ${os.hostname()}\n`;
    response += `Application Version: ${process.env.VERSION}\n`;
    // Send the response as HTML
    res.send(response);
});

// Serve HTML file
app.use(express.static('public'));

// Listen on port and log a message upon server start
app.listen(port, () => {
    console.log(`The application is available on port ${port}`);
});

// Function to get the server IP address
function getIPAddress() {
    // Get network interfaces
    const interfaces = os.networkInterfaces();
    for (const dev in interfaces) {
        // Filter IPv4 addresses, excluding internal addresses
        const iface = interfaces[dev].filter(details => details.family === 'IPv4' && !details.internal);
        // Return the first found address
        if (iface.length > 0) return iface[0].address;
    }
    // Return default value
    return '0.0.0.0';
}
