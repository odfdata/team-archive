import {useContractRead} from "wagmi";
import {useBaseAsyncHook, useBaseAsyncHookState} from "../../utils/useBaseAsyncHook";
import {CONTRACTS_DETAILS} from "../../../utils/constants";
import {useGetFirstDocumentElement} from "./useGetFirstDocumentElement";
import {useGetLastDocumentElement} from "./useGetLastDocumentElement";
import {useEffect, useMemo} from "react";
import {BigNumber} from "@ethersproject/bignumber";
import lighthouse from "@lighthouse-web3/sdk";

export interface GetTeamFilesParams {
  chainId: number;
  /**
   * The team address for which you want to retrieve the files
   */
  teamAddress: string;

  amount: number;

  reverse: boolean;

  signedMessage: string;
  publicKey: string;
}

export interface TeamFile {

  CIDMetadata: string;
  /**
   * The IPFS CID file
   */
  CIDFile: string;
  /**
   * The address owner of the file
   */
  uploaderAddress: string;
  /**
   * The UNIX timestamp in which the file has been added
   */
  addedAt: number;

  name: string;

  size: number;
}

export interface GetTeamFilesResponse {
  teamFiles: TeamFile[];
  refetch: any;
}

interface GetCIDsFromCIDsMetadataParams {
  publicKey: string;
  signedMessage: string;
  teamFiles: {CIDMetadata: string, addedAt: number, uploaderAddress: string}[];
}

const getCIDsFromCIDsMetadata = async (params: GetCIDsFromCIDsMetadataParams): Promise<TeamFile[]> => {
  let promises = [];
  params.teamFiles.forEach(teamFile => {
    promises.push(lighthouse.fetchEncryptionKey(teamFile.CIDMetadata, params.publicKey, params.signedMessage));
  });
  const encryptionKeys = [];
  let responses = await Promise.all(promises);
  params.teamFiles.forEach((teamFile, index) => {
    encryptionKeys.push({
      CIDMetadata: teamFile.CIDMetadata,
      encryptionKey: responses[index].data.key
    });
  });
  promises = [];
  encryptionKeys.forEach(encryptionKey => {
    promises.push(lighthouse.decryptFile(encryptionKey.CIDMetadata, encryptionKey.encryptionKey));
  });
  const files = await Promise.all(promises);
  const result: TeamFile[] = [];
  params.teamFiles.forEach((teamFile, index) => {
    const file = files[index];
    const fileContent = JSON.parse(file);
    result.push({
      CIDMetadata: teamFile.CIDMetadata,
      CIDFile: fileContent.CID,
      addedAt: teamFile.addedAt,
      uploaderAddress: teamFile.uploaderAddress,
      name: fileContent.name,
      size: fileContent.size
    });
  });
  return [];
}

/**
 * Hook used to get files associated with the teamAddress parameter.
 */
export const useGetTeamFiles = (params: GetTeamFilesParams): useBaseAsyncHookState<GetTeamFilesResponse> => {
  const {completed, error, loading, result, progress,
    startAsyncAction, endAsyncActionSuccess, endAsyncActionError} = useBaseAsyncHook<GetTeamFilesResponse>();

  const firstElementResult = useGetFirstDocumentElement({chainId: params.chainId, teamAddress: params.teamAddress});
  const lastElementResult = useGetLastDocumentElement({chainId: params.chainId, teamAddress: params.teamAddress});

  let startId = useMemo(() => {
    if (firstElementResult.completed && lastElementResult.completed) {
      if (params.reverse === false) return firstElementResult.result;
      else return lastElementResult.result;
    }
    return -1;
  }, [params.reverse, firstElementResult.completed, lastElementResult.completed]);

  const contractRead = useContractRead({
    address: CONTRACTS_DETAILS[params.chainId]?.TEAM_ARCHIVE_ADDRESS,
    abi: CONTRACTS_DETAILS[params.chainId]?.TEAM_ARCHIVE_ABI,
    functionName: "getTeamFiles",
    args: [params.teamAddress, startId, params.amount, params.reverse],
    onError: ((e) => endAsyncActionError(e.message)),
    enabled: startId>0,
  });

  let teamFiles = [];
  useEffect(() => {
    if (contractRead.isSuccess && contractRead.data) {
      new Promise (async (resolve, reject) => {
        teamFiles = await getCIDsFromCIDsMetadata({
          teamFiles: contractRead.data.map((teamFile: {CID_metadata: string, addedAt: BigNumber, uploaderAddress: string}) => {
            return {
              CIDMetadata: teamFile.CID_metadata,
              addedAt: teamFile.addedAt.toNumber(),
              uploaderAddress: teamFile.uploaderAddress
            };
          }),
          signedMessage: params.signedMessage,
          publicKey: params.publicKey,
        });
      }).then(()=> {});
    }
  }, [contractRead.isSuccess]);

  return {
    completed: contractRead.isSuccess,
    error,
    loading: contractRead.isFetching,
    progress,
    result: {
      teamFiles: teamFiles,
      refetch: contractRead.refetch
    }
  };
}
