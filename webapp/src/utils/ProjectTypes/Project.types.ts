import {AbiItem} from "web3-utils";

/**
 * Details of the chain we can connect to
 *
 * @param {string} EXPLORER_URL - URL base of the explorer
 * @param {number} ID - id of the chain
 * @param {boolean} IS_TESTNET - true if it's a testnet, false otherwise
 */
export interface ChainDetails {
  EXPLORER_URL: string,
  ID: number,
  IS_TESTNET: boolean
}

/**
 * Details of the contracts we want to interact with on the chain
 *
 * @param {string} TEAM_ARCHIVE_ADDRESS - sc address of the Team Archive
 * @param {AbiItem} TEAM_ARCHIVE_ABI - ABI of the Team Archive
 */
export interface ContractDetails {
  TEAM_ARCHIVE_ADDRESS: string,
  TEAM_ARCHIVE_ABI: AbiItem
}
