import {AbiItem} from "web3-utils";
import {ChainDetails, ContractDetails} from "./ProjectTypes/Project.types";

// TODO: update TEAM_ARCHIVE_ADDRESS and TEAM_ARCHIVE_ABI for network 3141 (fevm)
export const CONTRACTS_DETAILS: {80001: ContractDetails; 3141: ContractDetails} = {
  80001: {
    TEAM_ARCHIVE_ADDRESS: "0x0a06557A364e6701E11EC810f0093cCCc03f4871",
    TEAM_ARCHIVE_ABI: [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_team","type":"address"},{"indexed":false,"internalType":"address","name":"_admin","type":"address"}],"name":"AdminAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_team","type":"address"},{"indexed":false,"internalType":"address","name":"_admin","type":"address"}],"name":"AdminRemoved","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_team","type":"address"},{"indexed":true,"internalType":"uint256","name":"_id","type":"uint256"}],"name":"FileAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_team","type":"address"},{"indexed":true,"internalType":"uint256","name":"_id","type":"uint256"}],"name":"FileRemoved","type":"event"},{"inputs":[{"internalType":"address","name":"_teamAddress","type":"address"},{"internalType":"address","name":"_newAdmin","type":"address"}],"name":"addAdmin","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_teamAddress","type":"address"},{"internalType":"uint256[]","name":"_ids","type":"uint256[]"},{"internalType":"string[]","name":"_metadata_CIDs","type":"string[]"}],"name":"addFiles","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"fileAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"fileList","outputs":[{"internalType":"uint256","name":"previous_id","type":"uint256"},{"internalType":"uint256","name":"next_id","type":"uint256"},{"components":[{"internalType":"string","name":"CID_metadata","type":"string"},{"internalType":"address","name":"uploaderAddress","type":"address"},{"internalType":"uint256","name":"addedAt","type":"uint256"}],"internalType":"struct TeamArchive.File","name":"file","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"firstDocumentElement","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_teamAddress","type":"address"}],"name":"getAdminList","outputs":[{"internalType":"address[]","name":"_teamAdmins","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_teamAddress","type":"address"},{"internalType":"uint256","name":"_startId","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"bool","name":"_reverse","type":"bool"}],"name":"getTeamFiles","outputs":[{"components":[{"internalType":"string","name":"CID_metadata","type":"string"},{"internalType":"address","name":"uploaderAddress","type":"address"},{"internalType":"uint256","name":"addedAt","type":"uint256"}],"internalType":"struct TeamArchive.File[]","name":"files","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"lastDocumentElement","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_teamAddress","type":"address"},{"internalType":"address","name":"_adminToRemove","type":"address"}],"name":"removeAdmin","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_teamAddress","type":"address"},{"internalType":"uint256[]","name":"_ids","type":"uint256[]"}],"name":"removeFiles","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"teamAdminList","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"}] as unknown as AbiItem,
  },
  3141: {
    TEAM_ARCHIVE_ADDRESS: "0x35912ec51ED76af08311346A118047dBC1d06Fe7",
    TEAM_ARCHIVE_ABI: [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"string","name":"_cid","type":"string"},{"indexed":true,"internalType":"bytes32","name":"_hash","type":"bytes32"}],"name":"CID2HashAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"previousAdminRole","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"newAdminRole","type":"bytes32"}],"name":"RoleAdminChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"sender","type":"address"}],"name":"RoleGranted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"sender","type":"address"}],"name":"RoleRevoked","type":"event"},{"inputs":[],"name":"DEFAULT_ADMIN_ROLE","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"WRITER","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_cid","type":"string"},{"internalType":"bytes32","name":"_hash","type":"bytes32"}],"name":"addHash","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_hash","type":"bytes32"}],"name":"getCIDsFromHash","outputs":[{"internalType":"string[]","name":"CIDs","type":"string[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_cid","type":"string"}],"name":"getHashFromCID","outputs":[{"internalType":"bytes32","name":"hash","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"}],"name":"getRoleAdmin","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"getRoleMember","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"}],"name":"getRoleMemberCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"grantRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"hasRole","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"renounceRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"revokeRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"sha2ToCIDs","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"}] as unknown as AbiItem,
  }
};
export const CHAIN_DETAILS: {80001: ChainDetails; 3141: ChainDetails} = {
  80001: {
    EXPLORER_URL: "https://mumbai.polygonscan.com/",
    ID: 80001,
    IS_TESTNET: true
  },
  3141: {
    EXPLORER_URL: "https://explorer.glif.io/?network=hyperspacenet",
    ID: 3141,
    IS_TESTNET: true
  }
};
export const IPFS_GATEWAY_BASE_URL: string = "https://gateway.ipfs.io";
