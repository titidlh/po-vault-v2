# Identity Vault v2

> A decentralized identity vault to issue, verify, and revoke Verifiable Credentials (VCs) on Ethereum using DIDs, JWTs, and a smart contract registry (Sepolia).

## 🔧 Stack technique

- **Frontend** : React + Tailwind + Framer Motion  
- **Backend API** : Node.js / Express (Issuer + Verifier + Registry)  
- **Smart Contract** : Solidity (DID registry + VC Revocation List)  
- **Blockchain** : Ethereum Sepolia testnet  
- **VC format** : JWT + JSON-LD (W3C Verifiable Credentials)  

## 📂 Architecture

📁 poc-vault-v2  
├── backend  
│   ├── registry-api → Vérification, registre, révocation VC (Node.js)  
│   ├── issuer-api → Signature et génération VC (Node.js)  
│   └── verifier-api → Optionnel : vérification hors chaîne  
├── frontend → Application Web (React + Tailwind)  
├── smart-contracts → Contrats Solidity (Sepolia)  
└── README.md  

## ⚙️ Installation

### 1. Cloner le projet

```bash
git clone https://github.com/TON-UTILISATEUR/identity-vault-v2.git
cd identity-vault-v2
2. Lancer les API

cd backend/registry-api
cp .env.example .env
npm install
npm run dev

    Répéter pour issuer-api et verifier-api si nécessaire.

3. Lancer le frontend

cd frontend
npm install
npm run dev

🧪 Fonctionnalités principales

    ✅ Génération d’un VC signé

    ✅ Vérification signature JWT + DID enregistré + VC non révoqué

    ✅ Révocation on-chain avec smart contract

    ✅ UI Web3 immersive avec feedback utilisateur

🚀 Déploiement & DevOps

Consulte le fichier DEVOPS_REPORT.md pour les instructions de déploiement.
📸 Aperçu

(Screenshots à ajouter ici)
👤 Auteur

Thierry Delahaye
M2 Systèmes & Réseaux – Projet de fin d’année
