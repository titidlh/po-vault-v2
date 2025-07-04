import express, { Request, Response } from 'express';
import contract from '../utils/contract.js';

const router = express.Router();

// ✅ Enregistrer un DID
router.post('/register', async (req: Request, res: Response): Promise<void> => {
  const { did } = req.body;
  if (!did) {
    res.status(400).json({ success: false, message: 'DID manquant' });
    return;
  }

  try {
    const tx = await contract.registerDID(did);
    await tx.wait();
    res.json({ success: true, txHash: tx.hash });
  } catch (e) {
    console.error(e);
    res.status(500).json({ success: false, message: 'Erreur lors de l’enregistrement du DID' });
  }
});

// ✅ Vérifier un DID
router.get('/is-registered/:did', async (req: Request, res: Response): Promise<void> => {
  const did = req.params.did;
  try {
    const result = await contract.isDIDRegistered(did);
    res.json({ did, registered: result });
  } catch (e) {
    console.error(e);
    res.status(500).json({ success: false, message: 'Erreur lors de la vérification du DID' });
  }
});

export default router;
