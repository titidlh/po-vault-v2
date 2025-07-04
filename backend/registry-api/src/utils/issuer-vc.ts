import { SignJWT, importPKCS8 } from 'jose';
import dotenv from 'dotenv';

dotenv.config();

const issuerPrivateKeyPem = process.env.ISSUER_PRIVATE_KEY;
if (!issuerPrivateKeyPem) {
  throw new Error('❌ Clé privée ISSUER_PRIVATE_KEY manquante dans le .env');
}

// ✅ Fonction : Importer la clé privée PEM en CryptoKey
async function getPrivateKey() {
  return await importPKCS8(issuerPrivateKeyPem, 'RS256');
}

// ✅ Fonction principale : Générer un VC sous forme de JWT
export async function generateVC(issuerDid: string, holderDid: string, credentialSubject: object) {
  const now = Math.floor(Date.now() / 1000);

  const payload = {
    iss: issuerDid,
    sub: holderDid,
    iat: now,
    exp: now + 365 * 24 * 60 * 60, // 1 an
    vc: {
      '@context': ['https://www.w3.org/2018/credentials/v1'],
      type: ['VerifiableCredential'],
      credentialSubject,
    },
  };

  const privateKey = await getPrivateKey();

  const jwt = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'RS256', typ: 'JWT' })
    .sign(privateKey);

  return jwt;
}
