// App.tsx
'use client';
import { useState } from 'react';
import IssuerForm from './components/IssuerForm';
import VerifierForm from './components/VerifierForm';
import RegistryViewer from './components/RegistryViewer';
import VCRevocationForm from './components/VCRevocationForm';
import { motion } from 'framer-motion';

export default function App() {
  const [view, setView] = useState<'issuer' | 'verifier' | 'registry' | 'crl'>('issuer');

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-950 via-slate-900 to-black text-white px-6 py-8 font-sans tracking-wide relative overflow-hidden">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.1 }} transition={{ duration: 2 }} className="absolute inset-0 bg-gradient-to-tr from-purple-500 via-blue-500 to-cyan-500 blur-3xl opacity-20" />
      <motion.header initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }} className="text-center mb-10 z-10 relative">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-blue-500 text-transparent bg-clip-text drop-shadow-lg">🧬 Identity Vault v2 (Web3 Edition)</h1>
        <p className="mt-2 text-slate-400 text-lg">Verifiable Credentials - Blockchain Secured</p>
      </motion.header>
      <div className="flex justify-center gap-4 mb-8 z-10 relative">
        {[
          { key: 'issuer', label: 'Émetteur' },
          { key: 'verifier', label: 'Vérificateur' },
          { key: 'registry', label: 'Registry On-chain' },
          { key: 'crl', label: 'CRL / Révocation' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setView(tab.key as any)}
            className={`px-6 py-2 rounded-full border-2 transition-all ${
              view === tab.key
                ? 'border-fuchsia-400 bg-fuchsia-500/10 text-fuchsia-300 shadow-lg'
                : 'border-slate-700 hover:border-fuchsia-400 text-slate-300 hover:text-fuchsia-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <motion.main initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="max-w-4xl mx-auto bg-white/5 p-6 md:p-10 rounded-2xl shadow-xl border border-white/10 backdrop-blur-xl z-10 relative">
        {view === 'issuer' && <IssuerForm />}
        {view === 'verifier' && <VerifierForm />}
        {view === 'registry' && <RegistryViewer />}
        {view === 'crl' && <VCRevocationForm />}
      </motion.main>
      <footer className="mt-12 text-center text-sm text-slate-500 relative z-10">
        <p>Built by <a href="#" className="underline hover:text-cyan-400">Thierry Delahaye</a> • Powered by Ethereum Sepolia • Web3 Ready</p>
      </footer>
    </div>
  );
}

 