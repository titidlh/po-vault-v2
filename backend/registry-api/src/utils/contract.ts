import { ethers } from "ethers";
import * as dotenv from "dotenv";
import IdentityRegistryBuild from "../abi/IdentityRegistry.json" with { type: "json" };

dotenv.config();

const provider = new ethers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);
const signer = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);

const contract = new ethers.Contract(
  process.env.CONTRACT_ADDRESS!,
  IdentityRegistryBuild.abi,
  signer
);

export default contract;
