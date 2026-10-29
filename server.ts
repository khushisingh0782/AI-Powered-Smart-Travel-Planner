import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { handleGenerateItinerary } from './server/apiHandler.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// API route
app.post('/api/generate-itinerary', async (req, res) => {
  try {
    const preferences = req.body;
    const result = await handleGenerateItinerary(preferences);
    res.json(result);
  } catch (error: any) {
    console.error('Error generating itinerary:', error);
    res.status(500).json({ error: error?.message || 'Failed to generate itinerary' });
  }
});

// Serve frontend in production
const distPath = path.join(__dirname, 'dist');
app.use(express.static(distPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
