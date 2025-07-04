import express from 'express';
import dotenv from 'dotenv';
import crlRoutes from './routes/crl.js';
import didRoutes from './routes/did.js';
import issuerRoutes from './routes/issuer.js';
import verifierRoutes from './routes/verifier.js';


dotenv.config();

const app = express();
app.use(express.json());

app.get('/status', (_, res) => {
  res.send('✅ Registry API Ready');
});

app.use('/crl', crlRoutes);
app.use('/did', didRoutes);
app.use('/issuer', issuerRoutes);
app.use('/verifier', verifierRoutes);

const PORT = 4001;
app.listen(PORT, () => {
  console.log(`🚀 Registry API listening on http://localhost:${PORT}`);
});
