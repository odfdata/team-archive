import {ethers, run} from "hardhat";
import {FakeTeamToken, TeamArchive} from "../../typechain-types";
import {deployTeamArchive} from "./SingleContracts/TeamArchive";
import {deployFakeTeamToken} from "./SingleContracts/Testing/FakeTeamToken";

/**
 * Function to deploy a fake team token contract
 *
 * @param {string} name - name of the fake team token
 * @param {string} symbol - symbol of the fake team token
 * @param {boolean} [withLogs] - true if we want to print the logs, false otherwise
 */
export const deployFakeTeamTokenNFT = async (
  name: string,
  symbol: string,
  withLogs: boolean = true
): Promise<{
  fakeTeamToken: FakeTeamToken
}> => {

  // We get the contract to deployContractStructure
  const [owner] = await ethers.getSigners();

  // get the next nonce
  let next_nonce = await owner.getTransactionCount();

  const fakeTeamToken = await deployFakeTeamToken(owner, name, symbol, next_nonce);
  if (withLogs)
    console.log("fakeTeamToken deployed - " + fakeTeamToken.address);

  return { fakeTeamToken: fakeTeamToken }
}


if (typeof require !== 'undefined' && require.main === module) {
  let chainId: "80001" | "3141" | "1337" = "3141";
  let name = "FakeTeamToken";
  let symbol = "FTT";
  deployFakeTeamTokenNFT(
    name,
    symbol
  )
    .then(async ({fakeTeamToken: fakeTeamToken}) => {
      // verify the contract if we're on Mumbai
      if (ethers.provider.network.chainId === 80001) {
        await new Promise((resolve) => {setTimeout(resolve,20000)});
        await run("verify:verify", {
          address: fakeTeamToken.address,
          constructorArguments: [
            name, symbol
          ],
        });
      }
      process.exit(0)
    })
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}



