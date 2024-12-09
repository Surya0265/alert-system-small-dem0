const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import cors middleware
const routes = require('./routes');

const app = express();

// Enable CORS
app.use(cors({
    origin: '*', // Allow all origins
}));
// Allow all origins (for more control, configure allowed origins)

// Middleware
app.use(bodyParser.json());
app.use(express.static('public')); // Serve TwiML files

// Routes
app.use('/', routes);
app.get('/ping', (req, res) => {
    res.status(200).send('Server is alive');
  });

const PORT = process.env.SERVER_PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
