import express from 'express';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import config from '../src/config';

const app = express();

const PORT = config.port;
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`)
})

app.get('*', (req: VercelRequest, res: VercelResponse) => {
  res.send('Hello from Express on Vercel!');
});

export default (req: VercelRequest, res: VercelResponse) => {
  app(req, res);
}

