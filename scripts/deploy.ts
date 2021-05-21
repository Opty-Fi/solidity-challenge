import "dotenv/config";
import { ethers } from "hardhat";
import { Signer } from "ethers";
import { getWallet } from "../utils/helpers";

const contractName = "";
const constructorParams: any[] = [];
const wallet = getWallet(process.env.NETWORK as string)(false)(
  process.env.DEV_PRIVATE_KEY as string
);

async function main(
  contractName: string,
  constructorParams?: any[],
  signer?: Signer
): Promise<void> {
  const factory = await ethers.getContractFactory(contractName, signer);
  const contract = await factory.deploy(...constructorParams!);
  await contract.deployed();
  console.log("Contract deployed to:", contract.address);
}

main(contractName, constructorParams, wallet)
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });