'use client';
import { useState } from 'react';
import { generateVC } from '../../../lib/api';
import { motion } from 'framer-motion';

export default function IssuerForm() {
  const [holderDid, setHolderDid] = useState('');
  const [flight, setFlight] = useState('');
  const [departure, setDeparture] = useState('');
  const [arrival, setArrival] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    setResult(null);
    try {
      const res = await generateVC(holderDid, { flight, departure, arrival });
      setResult(`✅ VC généré : ${res.vc}`);
    } catch (e) {
      console.error(e);
      setResult('❌ Erreur lors de la génération du VC');
    }
    setLoading(false);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="space-y-4">
      <h2 className="text-xl font-bold text-cyan-400">🛠️ Émettre un Verifiable Credential</h2>

      <input
        placeholder="DID du Holder"
        value={holderDid}
        onChange={(e) => setHolderDid(e.target.value)}
        className="w-full p-2 rounded bg-zinc-800 border border-white/10 text-white"
      />
      <input
        placeholder="Numéro de vol (ex: AF123)"
        value={flight}
        onChange={(e) => setFlight(e.target.value)}
        className="w-full p-2 rounded bg-zinc-800 border border-white/10 text-white"
      />
      <input
        placeholder="Départ (ex: Paris)"
        value={departure}
        onChange={(e) => setDeparture(e.target.value)}
        className="w-full p-2 rounded bg-zinc-800 border border-white/10 text-white"
      />
      <input
        placeholder="Arrivée (ex: Tokyo)"
        value={arrival}
        onChange={(e) => setArrival(e.target.value)}
        className="w-full p-2 rounded bg-zinc-800 border border-white/10 text-white"
      />

      <button
        onClick={handleGenerate}
        disabled={loading}
        className="px-4 py-2 rounded bg-cyan-600 hover:bg-cyan-500 text-white transition"
      >
        {loading ? 'Génération en cours...' : 'Générer VC'}
      </button>

      {result && (
        <motion.pre initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} className="mt-4 p-3 bg-black/30 text-green-300 text-xs overflow-x-auto rounded">
          {result}
        </motion.pre>
      )}
    </motion.div>
  );
}
