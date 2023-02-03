# Smart Contracts

These smart contracts represent the core structure of **Team Archive** project

## How to run

Contracts have been developed using the [hardhat framework](https://hardhat.org/). 

You need to create a `.secrets.json` file to run the scripts. You can just copy and renaming `.secrets.example.json` file to access al the documents.

These are the commands you need to run the scripts:
* `yarn install` to install dependencies
* `yarn hardhat compile` to compile smart contracts
* `yarn hardhat run scripts/Deployer/deploy.ts --network {network-name}` to deploy the TeamArchive.sol smart contract
* `yarn hardhat run scripts/Deployer/deployFakeTeamToken.ts --network {network-name}` to deploy a fake ERC721 to create a team
* `yarn hardhat run scripts/Deployer/mintFakeTeamToken.ts --network {network-name}` to mint one fake team token.
Make sure to edit the `mintFakeTeamToken.ts` file inserting the correct address of the deployed Fake Team ERC-721
* `yarn hardhat verify {contract_address} "arg01" "arg02" "arg03..."` to verify the deployed smart contracts on PolygonScan
