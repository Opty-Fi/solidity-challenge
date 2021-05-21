import "dotenv/config";
import { ethers } from "ethers";

export function getInfuraProvider(
  network: string = "homestead",
  nodeProviderApiKey: string
): ethers.providers.BaseProvider {
  return new ethers.providers.InfuraProvider(network, nodeProviderApiKey);
}

export function getAlchemyProvider(
  network: string = "homestead",
  nodeProviderApiKey: string
): ethers.providers.BaseProvider {
  return new ethers.providers.AlchemyProvider(network, nodeProviderApiKey);
}

export function getWallet(network: string = "homestead") {
  return (useInfura: boolean) => (pvtKey: string): ethers.Wallet =>
    useInfura
      ? new ethers.Wallet(
          pvtKey,
          getInfuraProvider(network, process.env.INFURA_KEY as string)
        )
      : new ethers.Wallet(
          pvtKey,
          getAlchemyProvider(network, process.env.ALCHEMY_KEY as string)
        );
}

export function getContract(
  signerOrProvider: ethers.Signer | ethers.providers.Provider
) {
  return function getContractWithSigner(
    address: string,
    abi: ethers.ContractInterface
  ): ethers.Contract {
    return new ethers.Contract(address, abi, signerOrProvider);
  };
}