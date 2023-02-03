import {ethers, run} from "hardhat";
import {FakeTeamToken, TeamArchive} from "../../typechain-types";
import {deployTeamArchive} from "./SingleContracts/TeamArchive";
import {deployFakeTeamToken, fakeTeamToken_mintOne} from "./SingleContracts/Testing/FakeTeamToken";

const fakeTokenAddress = "0x869A859a31b0Dcc6a99ae4461d7163F4335819d1";

/**
 * Mint one Fake Team Token
 *
 * @param {boolean} [withLogs] - true if we want to print the logs, false otherwise
 */
export const mintFakeTeamToken = async (
  withLogs: boolean = true
): Promise<void> => {

  // We get the contract to deployContractStructure
  const [owner] = await ethers.getSigners();

  // get the next nonce
  let next_nonce = await owner.getTransactionCount();

  const fakeTeamToken = await fakeTeamToken_mintOne(owner, fakeTokenAddress, next_nonce);
  if (withLogs)
    console.log("One FakeTeamToken minted");

  return;
}


if (typeof require !== 'undefined' && require.main === module) {
  let chainId: "80001" | "3141" | "1337" = "3141";
  mintFakeTeamToken()
    .then()
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}



