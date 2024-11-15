export default async function handler(req, res) {
  const { message, source } = req.body;

  const backendUrl =
    source === 'watsonx'
      ? 'http://localhost:5000/api/watsonx'
      : 'http://localhost:5000/api/ollama';

  try {
    const response = await fetch(backendUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error in Next.js API route:', error);
    res.status(500).json({ error: 'Error connecting to backend.' });
  }
}
