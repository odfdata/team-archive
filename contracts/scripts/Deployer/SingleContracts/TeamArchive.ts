import {ethers} from "hardhat";
import {SignerWithAddress} from "@nomiclabs/hardhat-ethers/signers";
import {BigNumber} from "ethers";
import {TeamArchive} from "../../../typechain-types";

/**
 * Deploy an instance of TeamArchive
 * @param signer - who's going to sign the transaction
 * @param [nonce] - if we want to pass a nonce, rather than having the code to evaluate it
 */
export async function deployTeamArchive(
  signer: SignerWithAddress,
  nonce: number = -1
): Promise<TeamArchive> {
  let next_nonce = nonce >= 0 ? nonce : await signer.getTransactionCount();
  let gasData = await ethers.provider.getFeeData();
  const contractFactory = await ethers.getContractFactory("TeamArchive", signer);
  const contract = await contractFactory.deploy(
    {
      nonce: next_nonce,
      maxPriorityFeePerGas: ethers.provider.network.chainId === 3141 ? gasData.maxPriorityFeePerGas?.toHexString() : undefined
    }
  ) as TeamArchive;
  await contract.deployed();
  return contract;
}


/**
 * Adds files to the team archive
 * @param signer - who's going to sign the transaction
 * @param teamArchiveAddress - address of the deployed TeamArchive
 * @param teamAddress - address of the team
 * @param ids - list of IDS
 * @param CIDMetadataList - list of files to add
 * @param [nonce] - if we want to pass a nonce, rather than having the code to evaluate it
 */
export async function teamArchive_addFiles(
  signer: SignerWithAddress,
  teamArchiveAddress: string,
  teamAddress: string,
  ids: BigNumber[],
  CIDMetadataList: string[],
  nonce: number = -1
): Promise<void> {
  let next_nonce = nonce >= 0 ? nonce : await signer.getTransactionCount();
  let gasData = await ethers.provider.getFeeData();
  const contractFactory = await ethers.getContractFactory("TeamArchive", signer);
  let tx = await contractFactory
    .attach(teamArchiveAddress)
    .addFiles(
      teamAddress,
      ids,
      CIDMetadataList,
      {
        nonce: next_nonce,
        maxPriorityFeePerGas: ethers.provider.network.chainId === 3141 ? gasData.maxPriorityFeePerGas?.toHexString() : undefined
      }
    );
  await tx.wait();
  return;
}

/**
 * Adds an address as admin
 * @param signer - who's going to sign the transaction
 * @param teamArchiveAddress - address of the deployed TeamArchive
 * @param teamAddress - address of the team
 * @param newAdmin - address of the new admin to add
 * @param [nonce] - if we want to pass a nonce, rather than having the code to evaluate it
 */
export async function teamArchive_addAdmin(
  signer: SignerWithAddress,
  teamArchiveAddress: string,
  teamAddress: string,
  newAdmin: string,
  nonce: number = -1
): Promise<void> {
  let next_nonce = nonce >= 0 ? nonce : await signer.getTransactionCount();
  let gasData = await ethers.provider.getFeeData();
  const contractFactory = await ethers.getContractFactory("TeamArchive", signer);
  let tx = await contractFactory
    .attach(teamArchiveAddress)
    .addAdmin(
      teamAddress,
      newAdmin,
      {
        nonce: next_nonce,
        maxPriorityFeePerGas: ethers.provider.network.chainId === 3141 ? gasData.maxPriorityFeePerGas?.toHexString() : undefined
      }
    );
  await tx.wait();
  return;
}
