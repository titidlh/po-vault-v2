import express, { Request, Response } from 'express';
import contract from '../utils/contract.js';

const router = express.Router();

// ✅ Révoquer un VC
router.post('/revoke', async (req: Request, res: Response): Promise<void> => {
  const { hash } = req.body;
  if (!hash) {
    res.status(400).json({ success: false, message: 'Hash VC manquant' });
    return;
  }

  try {
    const tx = await contract.revokeVC(hash);
    await tx.wait();
    res.json({ success: true, txHash: tx.hash });
  } catch (e) {
    console.error(e);
    res.status(500).json({ success: false, message: 'Erreur lors de la révocation du VC' });
  }
});

// ✅ Vérifier si un VC est révoqué
router.get('/is-revoked/:hash', async (req: Request, res: Response): Promise<void> => {
  const hash = req.params.hash;
  try {
    const result = await contract.isVCRevoked(hash);
    res.json({ hash, revoked: result });
  } catch (e) {
    console.error(e);
    res.status(500).json({ success: false, message: 'Erreur lors de la vérification du VC' });
  }
});

export default router;
