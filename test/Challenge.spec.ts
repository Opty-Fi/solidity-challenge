import { ethers } from "hardhat";
import { Signer, BigNumber } from "ethers";
import { expect } from "chai";
import {
  Challenge,
  Challenge__factory,
  Incrementor,
  Incrementor__factory,
} from "../typechain";

describe("Challenge", () => {
  let signers: Signer[],
    admin: Signer,
    adminAddress: string,
    challengeFactory: Challenge__factory,
    challenge: Challenge,
    incrementorFactory: Incrementor__factory,
    incrementor: Incrementor;
  const nums: BigNumber[] = [1, 2, 3].map((num) => BigNumber.from(num)),
    weth: string = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    tokens: string[] = [
      "0x514910771AF9Ca656af840dff83E8264EcF986CA", // LINK
      "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984", // UNI
      "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599", // WBTC
      "0x6B175474E89094C44Da98b954EedeAC495271d0F", // DAI
      "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48", // USDC
    ],
    tokensAsBigNumbers: BigNumber[] = [
      BigNumber.from("464057641162257223597913127019930606481545201354"),
      BigNumber.from("180374059643543449999388718682590567161426737540"),
      BigNumber.from("196268403159008932410419402999721616371951519129"),
      BigNumber.from("611382286831621467233887798921843936019654057231"),
      BigNumber.from("917551056842671309452305380979543736893630245704"),
    ],
    numsAsAddresses: string[] = [
      "0x0000000000000000000000000000000000000001",
      "0x0000000000000000000000000000000000000002",
      "0x0000000000000000000000000000000000000003",
    ],
    pairsCorrect: string[] = [
      "0xa2107fa5b38d9bbd2c461d6edf11b11a50f6b974",
      "0xd3d2e2692501a5c9ca623199d38826e513033a17",
      "0xbb2b8038a1640196fbe3e38816f3e67cba72d940",
      "0xa478c2975ab1ea89e8196811f51a7b7ade33eb11",
      "0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc",
      "0xae461ca67b15dc8dc81ce7615e0320da1a9ab8d5",
    ].map((pair) => ethers.utils.getAddress(pair));

  beforeEach(async () => {
    // get signers array
    signers = await ethers.getSigners();
    // pull out 1 signer as our admin
    admin = signers[0];
    // get admin's address
    adminAddress = await admin.getAddress();
    // get contact factorties
    [challengeFactory, incrementorFactory] = await Promise.all([
      ethers.getContractFactory(
        "Challenge",
        admin
      ) as Promise<Challenge__factory>,
      ethers.getContractFactory(
        "Incrementor",
        admin
      ) as Promise<Incrementor__factory>,
    ]);
    // get contacts
    [challenge, incrementor] = await Promise.all([
      challengeFactory.deploy(),
      incrementorFactory.deploy(),
    ]);
  });

  it("delegates incrementing of storage variables", async () => {
    // increment x
    (await challenge.incrementX(incrementor.address)).wait(6);
    expect(await challenge.x()).to.eq(BigNumber.from(1));
    // increment y
    (await challenge.incrementY(incrementor.address)).wait(6);
    expect(await challenge.y()).to.eq(BigNumber.from(1));
    // increment z
    (await challenge.incrementZ(incrementor.address)).wait(6);
    expect(await challenge.z()).to.eq(BigNumber.from(1));
  });

  it("determines if an Ethereum account is a contract", async () => {
    expect(await challenge.isContract(challenge.address)).to.be.true;
    expect(await challenge.isContract(adminAddress)).to.be.false;
  });

  it("converts address to uint256", async () => {
    expect(await challenge.addressToUint256(tokens[0])).to.eq(
      tokensAsBigNumbers[0]
    );
    expect(await challenge.addressToUint256(tokens[1])).to.eq(
      tokensAsBigNumbers[1]
    );
    expect(await challenge.addressToUint256(tokens[2])).to.eq(
      tokensAsBigNumbers[2]
    );
    expect(await challenge.addressToUint256(tokens[3])).to.eq(
      tokensAsBigNumbers[3]
    );
    expect(await challenge.addressToUint256(tokens[4])).to.eq(
      tokensAsBigNumbers[4]
    );
  });

  it("converts uint256 to address", async () => {
    expect(await challenge.uint256ToAddress(nums[0])).to.eq(numsAsAddresses[0]);
    expect(await challenge.uint256ToAddress(nums[1])).to.eq(numsAsAddresses[1]);
    expect(await challenge.uint256ToAddress(nums[2])).to.eq(numsAsAddresses[2]);
  });

  it("computes UniswapV2 pair addresses", async () => {
    // compute weth-token pairs
    const pairsComputed = await Promise.all(
      tokens.map(
        async (token) => await challenge.getUniswapV2PairAddress(weth, token)
      )
    );
    // add 1 non-weth pair
    pairsComputed.push(
      await challenge.getUniswapV2PairAddress(tokens[3], tokens[4])
    );
    expect(pairsComputed[0]).to.eq(pairsCorrect[0]);
    expect(pairsComputed[1]).to.eq(pairsCorrect[1]);
    expect(pairsComputed[2]).to.eq(pairsCorrect[2]);
    expect(pairsComputed[3]).to.eq(pairsCorrect[3]);
    expect(pairsComputed[4]).to.eq(pairsCorrect[4]);
    expect(pairsComputed[5]).to.eq(pairsCorrect[5]);
  });
});