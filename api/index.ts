import { VercelRequest, VercelResponse } from '@vercel/node';
const app = require('../src/app');


const PORT = 4000;

app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
export default (req: VercelRequest, res: VercelResponse) => {
  app(req, res);
};
