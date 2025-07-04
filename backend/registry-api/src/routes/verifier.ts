import express, { Request, Response } from 'express';
import { jwtVerify } from 'jose';
import contract from '../utils/contract.js';
import crypto from 'crypto';
import { loadIssuerPublicKey } from '../utils/crypto.js';

const router = express.Router();

// ✅ Vérifier un VC
router.post('/verify-vc', async (req: Request, res: Response): Promise<void> => {
  const { vc } = req.body;

  if (!vc) {
    res.status(400).json({ success: false, message: 'VC manquant' });
    return;
  }

  try {
    // ✅ Importer la clé publique
    const publicKey = await loadIssuerPublicKey();

    // ✅ Vérifier la signature JWT
    await jwtVerify(vc, publicKey);

    // ✅ Décoder le VC
    const decodedPayload = JSON.parse(Buffer.from(vc.split('.')[1], 'base64').toString());
    const issuerDid = decodedPayload.iss;

    if (!issuerDid) {
      res.status(400).json({ success: false, message: 'Issuer DID manquant' });
      return;
    }

    // ✅ Vérifier que le DID est bien enregistré on-chain
    const isDidRegistered = await contract.isDIDRegistered(issuerDid);
    if (!isDidRegistered) {
      res.status(401).json({ success: false, message: 'DID non enregistré on-chain' });
      return;
    }

    // ✅ Vérifier que le VC n’est pas révoqué
    const vcHash = crypto.createHash('sha256').update(vc).digest('hex');
    const isRevoked = await contract.isVCRevoked(vcHash);
    if (isRevoked) {
      res.status(401).json({ success: false, message: 'VC révoqué' });
      return;
    }

    // ✅ Si tout est bon
    res.json({
      success: true,
      message: '✅ VC valide, DID OK, et non révoqué',
      issuerDid,
      vcHash,
    });
  } catch (error) {
    console.error('❌ Erreur de vérification VC :', error);
    res.status(500).json({ success: false, message: 'Erreur technique pendant la vérification' });
  }
});

export default router;
