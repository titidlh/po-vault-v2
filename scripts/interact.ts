import { ethers } from "hardhat";
import * as dotenv from "dotenv";
dotenv.config();

async function main() {
  const provider = new ethers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);
  const signer = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);

  const contractAddress = "0x85C0a8C1D97273c002451eF386977c7F8dC13e82";
  const abi = [
    "function registerDID(string did) external",
    "function revokeVC(string vcHash) external",
    "function unrevokeVC(string vcHash) external",
    "function isVCRevoked(string vcHash) view returns (bool)",
    "function isDIDRegistered(string did) view returns (bool)"
  ];

  const registry = new ethers.Contract(contractAddress, abi, signer);

  // Exemple : Enregistrer un DID
  const did = "did:example:issuer1";
  const tx = await registry.registerDID(did);
  console.log(`Transaction envoyée : ${tx.hash}`);
  await tx.wait();
  console.log(`✅ DID "${did}" enregistré.`);

  // Exemple : Révoquer un VC
  const hash = "1234abc";
  const tx2 = await registry.revokeVC(hash);
  console.log(`VC révoqué. TX: ${tx2.hash}`);

  // Exemple : Vérifier la révocation
  const revoked = await registry.isVCRevoked(hash);
  console.log(`VC ${hash} révoqué ?`, revoked);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
