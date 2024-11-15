const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// watsonX.ai Integration
app.post('/api/watsonx', async (req, res) => {
  const { message } = req.body;

  try {
    const response = await axios.post(
      'https://watsonx.ai.api.endpoint/chat', // Replace with actual WatsonX API endpoint
      { input: message },
      { headers: { Authorization: `Bearer ${process.env.WATSONX_API_KEY}` } }
    );
    res.json(response.data);
  } catch (error) {
    console.error(
      'Error with watsonX.ai:',
      error.response?.data || error.message
    );
    res.status(500).json({ error: 'Error with watsonX.ai integration.' });
  }
});

// Ollama Local Integration
app.post('/api/ollama', async (req, res) => {
  const { message } = req.body;

  try {
    const response = await axios.post(
      'http://localhost:11411/api/chat', // Ollama local endpoint
      { input: message }
    );
    res.json(response.data);
  } catch (error) {
    console.error('Error with Ollama:', error.response?.data || error.message);
    res.status(500).json({ error: 'Error with Ollama integration.' });
  }
});

// Start Server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
