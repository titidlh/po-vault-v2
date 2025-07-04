'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function RegistryViewer() {
  const [dids, setDids] = useState<string[]>([]);

  useEffect(() => {
    // 👉 Remplace par un appel API plus tard (lecture on-chain si tu veux)
    setDids(['did:example:state123', 'did:example:airport456']);
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
      <h2 className="text-xl font-bold text-blue-300">📜 DIDs enregistrés on-chain</h2>
      <ul className="space-y-2">
        {dids.map((did, idx) => (
          <li key={idx} className="bg-blue-900/20 border border-blue-700 px-4 py-2 rounded text-blue-100">
            {did}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
