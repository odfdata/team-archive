import {ethers} from "hardhat";
import {SignerWithAddress} from "@nomiclabs/hardhat-ethers/signers";
import {BigNumber} from "ethers";
import {FakeTeamToken} from "../../../../typechain-types";

/**
 * Deploy an instance of FakeTeamToken
 * @param signer - who's going to sign the transaction
 * @param name - token name
 * @param symbol - token symbol
 * @param [nonce] - if we want to pass a nonce, rather than having the code to evaluate it
 */
export async function deployFakeTeamToken(
  signer: SignerWithAddress,
  name: string,
  symbol: string,
  nonce: number = -1
): Promise<FakeTeamToken> {
  let next_nonce = nonce >= 0 ? nonce : await signer.getTransactionCount();
  let gasData = await ethers.provider.getFeeData();
  const contractFactory = await ethers.getContractFactory("FakeTeamToken", signer);
  const contract = await contractFactory.deploy(
    name,
    symbol,
    {
      nonce: next_nonce,
      maxPriorityFeePerGas: ethers.provider.network.chainId === 3141 ? gasData.maxPriorityFeePerGas?.toHexString() : undefined
    }
  ) as FakeTeamToken;
  await contract.deployed();
  return contract;
}


/**
 * Mint one team token
 * @param signer - who's going to sign the transaction
 * @param fakeTeamTokenAddress - address of the deployed FakeTeamToken
 * @param [nonce] - if we want to pass a nonce, rather than having the code to evaluate it
 */
export async function fakeTeamToken_mintOne(
  signer: SignerWithAddress,
  fakeTeamTokenAddress: string,
  nonce: number = -1
): Promise<void> {
  let next_nonce = nonce >= 0 ? nonce : await signer.getTransactionCount();
  let gasData = await ethers.provider.getFeeData();
  const contractFactory = await ethers.getContractFactory("FakeTeamToken", signer);
  let tx = await contractFactory
    .attach(fakeTeamTokenAddress)
    .mint(
      BigNumber.from(ethers.utils.randomBytes(32)),
      {
        nonce: next_nonce,
        maxPriorityFeePerGas: ethers.provider.network.chainId === 3141 ? gasData.maxPriorityFeePerGas?.toHexString() : undefined
      }
    );
  await tx.wait();
  return;
}
