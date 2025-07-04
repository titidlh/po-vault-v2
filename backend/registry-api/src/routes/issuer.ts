import { Router, Request, Response } from 'express';
import { SignJWT, importPKCS8 } from 'jose';
import dotenv from 'dotenv';

dotenv.config();

const router = Router();

const issuerDid = 'did:example:state123';
const privateKeyPem = process.env.ISSUER_PRIVATE_KEY!.replace(/\\n/g, '\n');

if (!privateKeyPem) {
  throw new Error('❌ Clé privée ISSUER_PRIVATE_KEY manquante dans le .env');
}

router.post('/generate-vc', async (req: Request, res: Response) => {
  try {
    const { holderDid, credentialSubject } = req.body;

    if (!holderDid || !credentialSubject) {
      res.status(400).json({ success: false, message: 'holderDid ou credentialSubject manquant' });
      return;
    }

    const privateKey = await importPKCS8(privateKeyPem, 'RS256');

    const now = Math.floor(Date.now() / 1000);

    const payload = {
      iss: issuerDid,
      sub: holderDid,
      iat: now,
      exp: now + 365 * 24 * 60 * 60,
      vc: {
        '@context': ['https://www.w3.org/2018/credentials/v1'],
        type: ['VerifiableCredential'],
        credentialSubject,
      },
    };

    const jwt = await new SignJWT(payload)
      .setProtectedHeader({ alg: 'RS256' })
      .setIssuedAt()
      .setExpirationTime('1y')
      .sign(privateKey);

    res.json({ success: true, vc: jwt });
  } catch (error) {
    console.error('Erreur génération VC:', error);
    res.status(500).json({ success: false, message: 'Erreur interne pendant la génération du VC' });
  }
});

export default router;
