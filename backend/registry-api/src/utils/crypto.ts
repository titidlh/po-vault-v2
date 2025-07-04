import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { importSPKI } from 'jose';

//  recrée __dirname manuellement
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function loadIssuerPublicKey(): Promise<CryptoKey> {
  const pemPath = path.resolve(__dirname, '../keys/issuer-public-key.pem');
  const publicKeyPem = fs.readFileSync(pemPath, 'utf-8');
  return await importSPKI(publicKeyPem, 'RS256');
}
