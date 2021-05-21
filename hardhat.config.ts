import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-ethers";
import "@typechain/hardhat";
import "solidity-coverage";
import "hardhat-gas-reporter";
import { HardhatUserConfig } from "hardhat/config";
require("dotenv").config();

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      forking: {
        url: process.env.ALCHEMY_URL as string,
        // blockNumber:
      },
    },
    ropsten: {
      url: process.env.ALCHEMY_URL as string,
      accounts: [process.env.DEV_PRIVATE_KEY as string],
    },
    rinkeby: {
      url: process.env.ALCHEMY_URL as string,
      accounts: [process.env.DEV_PRIVATE_KEY as string],
    },
    kovan: {
      url: process.env.ALCHEMY_URL as string,
      accounts: [process.env.DEV_PRIVATE_KEY as string],
    },
  },
  solidity: {
    compilers: [
      {
        version: "0.8.2",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: "0.7.6",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: "0.6.12",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  gasReporter: {
    currency: "USD",
    enabled: process.env.REPORT_GAS ? true : false,
  },
};

export default config;