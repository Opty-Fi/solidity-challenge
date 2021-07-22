# Solidity-Challenge

## INSTRUCTIONS:

### General Instructions

- Click the green "Use this template" button. **Make your solution repo private**, and invite **dhruvinparikh** and **fiqureshi1** to the repo once you're ready to submit. 

- AT THE TOP OF EACH CONTRACT FILE, PLEASE LIST GITHUB LINKS TO ANY AND ALL REPOS YOU BORROW FROM THAT YOU DO NOT EXPLICITLY IMPORT FROM ETC.
- PLEASE WRITE AS MUCH OR AS LITTLE CODE AS YOU THINK IS NEEDED TO COMPLETE THE TASK
- LIBRARIES AND UTILITY CONTRACTS (SUCH AS THOSE FROM OPENZEPPELIN) ARE FAIR GAME

### Challenge Contract

- Fill in the Challenge contract's functions so that the unit tests pass in `tests/Challenge.spec.ts`

  1. Please be overly explicit with your code comments
  2. Since the unit tests are written according to the incomplete contract, please do not rename functions or variables
### FindBugs Contracts

- You are required to comment comment above each lines for errors if any for each contract.
- Explain the error and how to mitigate that error.
- Coding of the solution is not required.
- You are only required to comment on way of fixing error in short paragraph

### MockERC1155 Contract

- Debug the contract

  1. Debugging includes incorrect code, anti-patterns, bad formatting, gas considerations etc
  2. Please comment your code explaining your reasoning for changes/additions
  3. There are no unit tests associated with the MockERC1155 contract
  4. In case you're unfamiliar, please read about the [ERC1155 standard here](https://docs.openzeppelin.com/contracts/4.x/erc1155), but please do not spend any time converting the contract into a proper ERC1155 contract
### UniswapV3PairLiquidity Contract

- Build a contract that does the following:

 1. Implements an ERC20 token
 2. Creates its own Uniswap V3 pair with ETH
 3. Seeds that Uniswap pair with liquidity
 4. The above requirements should be implemented directly in the token contract
 5. Include tests, deployment/migration scripts, and documentation.
 6. Please feel free to use any code/packages from the following Github Organizations and Docs:
      1. [Uniswap Org](https://github.com/Uniswap)
      2. [UniswapV3 Docs](https://docs.uniswap.org/)
### Pre Requisites

Before running any command, make sure to install dependencies:

```sh
$ yarn install
```

### Compile

Compile the smart contracts with Hardhat:

```sh
$ yarn compile
```

### Coverage

Generate the code coverage report:

```sh
$ yarn coverage
```

### Deploy

Deploy the contracts to Hardhat Network:

```sh
$ yarn deploy
```

### Test

Run the Mocha tests:

```sh
$ yarn test
```
### TypeChain

Compile the smart contracts and generate TypeChain artifacts:

```sh
$ yarn typechain
```
