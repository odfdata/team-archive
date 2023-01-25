# Smart Contracts

These smart contracts represent the core structure of **Team Archive** project

## How to run

Contracts have been developed using the [hardhat framework](https://hardhat.org/). 

You need to create a `.secrets.json` file to run the scripts. You can just copy and renaming `.secrets.example.json` file to access al the documents.

You also need to take care at `./scripts/ProjectConstants.js` as that file contains constants that might be changed
if you want to work on a local instance of the solution.

These are the commands you need to run the scripts:
* `yarn install` to install dependencies
* `yarn hardhat compile` to compile smart contracts
* `yarn hardhat test` to run tests
* `yarn hardhat verify {contract_address} "arg01" "arg02" "arg03..."` to verify the deployed smart contracts on PolygonScan
