import { ethers } from "hardhat";

async function main() {
  const IdentityRegistry = await ethers.getContractFactory("IdentityRegistry");
  const contract = await IdentityRegistry.deploy();

  // Attendre que la transaction de déploiement soit minée
  await contract.waitForDeployment();

  // Obtenir l'adresse déployée
  const deployedAddress = await contract.getAddress();

  console.log(`✅ IdentityRegistry déployé sur : ${deployedAddress}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
