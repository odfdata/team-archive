import {ethers, run} from "hardhat";
import {TeamArchive} from "../../typechain-types";
import {deployTeamArchive} from "./SingleContracts/TeamArchive";

/**
 * Function to deploy contracts. We've used a dedicate function, so that we can call it
 * also during testing
 *
 * @param {boolean} [withLogs] - true if we want to print the logs, false otherwise
 */
export const deployContracts = async (
  withLogs: boolean = true
): Promise<{
  teamArchive: TeamArchive
}> => {

  // We get the contract to deployContractStructure
  const [owner] = await ethers.getSigners();

  // get the next nonce
  let next_nonce = await owner.getTransactionCount();

  const teamArchive = await deployTeamArchive(owner, next_nonce);
  if (withLogs)
    console.log("teamArchive deployed - " + teamArchive.address);

  return { teamArchive: teamArchive }
}


if (typeof require !== 'undefined' && require.main === module) {
  let chainId: "80001" | "3141" | "1337" = "3141";
  deployContracts()
    .then(async ({teamArchive: teamArchive}) => {
      // verify the contract if we're on Mumbai
      if (ethers.provider.network.chainId === 80001) {
        await new Promise((resolve) => {setTimeout(resolve,20000)});
        await run("verify:verify", {
          address: teamArchive.address,
          constructorArguments: [],
        });
      }
      process.exit(0)
    })
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}



