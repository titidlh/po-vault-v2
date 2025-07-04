const BASE_URL = 'http://localhost:4001';

// === API DID Registry ===

// Vérifier si un DID est enregistré (on-chain)
export async function checkDID(did: string) {
  const res = await fetch(`${BASE_URL}/did/is-registered/${did}`);
  if (!res.ok) throw new Error('Erreur lors de la vérification du DID');
  return res.json(); // { did, registered: true/false }
}

// Enregistrer un nouveau DID (on-chain)
export async function registerDID(did: string) {
  const res = await fetch(`${BASE_URL}/did/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ did }),
  });
  if (!res.ok) throw new Error('Erreur lors de l’enregistrement du DID');
  return res.json(); // { success: true, txHash: "0x..." }
}

// === API CRL (Revocation List) ===

// Vérifier si un VC est révoqué (on-chain)
export async function checkVCRevocation(vcHash: string) {
  const res = await fetch(`${BASE_URL}/crl/is-revoked/${vcHash}`);
  if (!res.ok) throw new Error('Erreur lors de la vérification de révocation VC');
  return res.json(); // { hash, revoked: true/false }
}

// Révoquer un VC
export async function revokeVC(hash: string) {
  const res = await fetch(`${BASE_URL}/crl/revoke`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ hash }),
  });
  if (!res.ok) throw new Error('Erreur lors de la révocation du VC');
  return res.json(); // { success: true, txHash }
}

// Annuler la révocation d'un VC
export async function unrevokeVC(hash: string) {
  const res = await fetch(`${BASE_URL}/crl/unrevoke`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ hash }),
  });
  if (!res.ok) throw new Error('Erreur lors de la restauration du VC');
  return res.json(); // { success: true, txHash }
}

// === API Issuer ===

// Générer un VC
export async function generateVC(holderDid: string, credentialSubject: any) {
  const res = await fetch(`${BASE_URL}/issuer/generate-vc`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ holderDid, credentialSubject }),
  });
  if (!res.ok) throw new Error('Erreur lors de la génération du VC');
  return res.json(); // { success: true, vc: "jwt..." }
}

// === API Verifier ===

// Vérifier un VC (signature + DID + révocation) - On-chain verifier
export async function verifyCredential(vc: string) {
  const res = await fetch(`${BASE_URL}/verifier/verify-vc`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ vc }),
  });
  if (!res.ok) throw new Error('Erreur lors de la vérification du VC');
  return res.json(); // { success, message, issuerDid, vcHash }
}

// === API Verifier Backend (Registry API directement) ===

export async function verifyVCBackend(vc: string) {
  const res = await fetch(`${BASE_URL}/verifier/verify-vc`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ vc }),
  });

  if (!res.ok) throw new Error('Erreur lors de la vérification du VC (backend)');
  return res.json();
}
