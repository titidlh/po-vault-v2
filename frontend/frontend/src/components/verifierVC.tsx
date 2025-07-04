'use client';
import { useState } from 'react';
import { verifyVCBackend } from '../../../lib/api';

export default function VerifierVC() {
  const [vcInput, setVcInput] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    setLoading(true);
    setResult(null);

    try {
      const res = await verifyVCBackend(vcInput);
      if (res.success) {
        setResult(`✅ VC VALIDE ✅\nDID émetteur : ${res.issuerDid}\nVC Hash : ${res.vcHash}`);
      } else {
        setResult(`❌ VC NON VALIDE : ${res.message}`);
      }
    } catch (error) {
      console.error(error);
      setResult('❌ Erreur technique pendant la vérification');
    }

    setLoading(false);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-green-400">Vérification complète d'un VC</h2>

      <textarea
        placeholder="Colle ici le VC (JWT)"
        value={vcInput}
        onChange={(e) => setVcInput(e.target.value)}
        rows={6}
        className="w-full p-2 rounded bg-zinc-800 border border-white/10 text-white"
      />

      <button
        onClick={handleVerify}
        disabled={loading}
        className="px-4 py-2 rounded bg-green-600 hover:bg-green-500 text-white"
      >
        Vérifier le VC
      </button>

      {result && (
        <pre className="text-white bg-zinc-900 p-2 rounded whitespace-pre-wrap">{result}</pre>
      )}
    </div>
  );
}
