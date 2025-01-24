const express = require('express');
const cors = require('cors'); // Import cors
const bodyParser = require('body-parser');
const app = express();

// Middleware to parse JSON
app.use(cors());
app.use(bodyParser.json());

// Sample users (replace this with database logic in production)


// Start server
app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});


