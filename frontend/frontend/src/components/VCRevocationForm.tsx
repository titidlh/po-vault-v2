'use client';
import { useState } from 'react';
import { revokeVC, unrevokeVC, checkVCRevocation } from '../../../lib/api';
import { motion } from 'framer-motion';

export default function VCRevocationForm() {
  const [vcHash, setVcHash] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [revocationStatus, setRevocationStatus] = useState<string | null>(null);

  const handleRevoke = async () => {
    const res = await revokeVC(vcHash);
    setMessage(res.success ? `✅ VC ${vcHash} révoqué.` : '❌ Échec révocation.');
  };

  const handleUnrevoke = async () => {
    const res = await unrevokeVC(vcHash);
    setMessage(res.success ? `✅ VC ${vcHash} restauré.` : '❌ Échec restauration.');
  };

  const handleCheck = async () => {
    const res = await checkVCRevocation(vcHash);
    setRevocationStatus(res.revoked ? '⚠️ VC révoqué' : '✅ VC actif');
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
      <h2 className="text-xl font-bold text-red-400">🛑 Gestion Révocation VC</h2>

      <input
        placeholder="Hash du VC (SHA-256)"
        value={vcHash}
        onChange={(e) => setVcHash(e.target.value)}
        className="w-full p-2 rounded bg-zinc-800 border border-white/10 text-white"
      />

      <div className="flex flex-wrap gap-2">
        <button
          onClick={handleRevoke}
          className="px-4 py-2 rounded bg-red-600 hover:bg-red-500 text-white"
        >
          Révoquer VC
        </button>
        <button
          onClick={handleUnrevoke}
          className="px-4 py-2 rounded bg-green-600 hover:bg-green-500 text-white"
        >
          Annuler Révocation
        </button>
        <button
          onClick={handleCheck}
          className="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600 text-white"
        >
          Vérifier Statut
        </button>
      </div>

      {message && <p className="text-cyan-300">{message}</p>}
      {revocationStatus && <p className="text-fuchsia-300">{revocationStatus}</p>}
    </motion.div>
  );
}
