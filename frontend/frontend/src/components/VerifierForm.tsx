'use client';
import { useState } from 'react';
import { verifyCredential, checkDID, checkVCRevocation } from '../../../lib/api';
import { motion } from 'framer-motion';

export default function VerifierForm() {
  const [vc, setVc] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [issuerDid, setIssuerDid] = useState('');
  const [didStatus, setDidStatus] = useState<string | null>(null);
  const [vcHash, setVcHash] = useState('');
  const [revocationStatus, setRevocationStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleVerifyVC = async () => {
    setLoading(true);
    setResult(null);
    try {
      const res = await verifyCredential(vc);
      setResult(res.success ? `✅ VC VALIDE ✅\nDID: ${res.issuerDid}\nHash: ${res.vcHash}` : `❌ NON VALIDE : ${res.message}`);
    } catch (e) {
      console.error(e);
      setResult('❌ Erreur technique pendant la vérification');
    }
    setLoading(false);
  };

  const handleCheckDID = async () => {
    setDidStatus('⏳ Vérification...');
    try {
      const res = await checkDID(issuerDid);
      setDidStatus(res.registered ? '✅ DID émetteur enregistré' : '❌ DID émetteur inconnu');
    } catch (e) {
      console.error(e);
      setDidStatus('❌ Erreur technique pendant la vérification du DID');
    }
  };

  const handleCheckRevocation = async () => {
    setRevocationStatus('⏳ Vérification...');
    try {
      const res = await checkVCRevocation(vcHash);
      setRevocationStatus(res.revoked ? '⚠️ VC révoqué' : '✅ VC actif (non révoqué)');
    } catch (e) {
      console.error(e);
      setRevocationStatus('❌ Erreur technique pendant la vérification de révocation');
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="space-y-10">
      
      {/* Vérification complète VC */}
      <div className="bg-zinc-900/60 p-5 rounded-xl shadow-inner border border-fuchsia-800/30">
        <h2 className="text-2xl font-bold text-fuchsia-300 mb-3">🔎 Vérification du VC (Signature + On-chain)</h2>
        <textarea
          placeholder="Colle ici le JWT du VC"
          value={vc}
          onChange={(e) => setVc(e.target.value)}
          rows={6}
          className="w-full bg-zinc-800 text-white p-3 rounded border border-fuchsia-700/20 focus:ring-2 focus:ring-fuchsia-500/50"
        />
        <button
          onClick={handleVerifyVC}
          disabled={loading}
          className={`mt-3 px-4 py-2 rounded bg-fuchsia-600 hover:bg-fuchsia-500 text-white transition ${
            loading ? 'opacity-50 cursor-wait' : ''
          }`}
        >
          {loading ? '⏳ Vérification...' : 'Vérifier VC'}
        </button>
        {result && (
          <pre className="mt-3 text-sm whitespace-pre-wrap bg-black/30 p-3 rounded border border-white/10 text-fuchsia-200">{result}</pre>
        )}
      </div>

      {/* Vérification DID */}
      <div className="bg-zinc-900/60 p-5 rounded-xl shadow-inner border border-blue-800/30">
        <h3 className="text-xl text-blue-300 mb-2">✔️ Vérification d’un DID émetteur</h3>
        <input
          placeholder="Exemple : did:example:state123"
          value={issuerDid}
          onChange={(e) => setIssuerDid(e.target.value)}
          className="w-full bg-zinc-800 text-white p-2 rounded border border-blue-700/20 focus:ring-2 focus:ring-blue-500/50"
        />
        <button
          onClick={handleCheckDID}
          className="mt-2 px-4 py-2 rounded bg-blue-600 hover:bg-blue-500 text-white transition"
        >
          Vérifier DID
        </button>
        {didStatus && <p className="mt-2 text-blue-200">{didStatus}</p>}
      </div>

      {/* Vérification Révocation */}
      <div className="bg-zinc-900/60 p-5 rounded-xl shadow-inner border border-red-800/30">
        <h3 className="text-xl text-red-300 mb-2">🛑 Vérification de Révocation (on-chain)</h3>
        <input
          placeholder="Hash SHA-256 du VC"
          value={vcHash}
          onChange={(e) => setVcHash(e.target.value)}
          className="w-full bg-zinc-800 text-white p-2 rounded border border-red-700/20 focus:ring-2 focus:ring-red-500/50"
        />
        <button
          onClick={handleCheckRevocation}
          className="mt-2 px-4 py-2 rounded bg-red-600 hover:bg-red-500 text-white transition"
        >
          Vérifier Révocation
        </button>
        {revocationStatus && <p className="mt-2 text-red-200">{revocationStatus}</p>}
      </div>
    </motion.div>
  );
}
