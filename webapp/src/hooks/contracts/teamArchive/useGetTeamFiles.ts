import {useContractRead} from "wagmi";
import {useBaseAsyncHook, useBaseAsyncHookState} from "../../utils/useBaseAsyncHook";
import {CONTRACTS_DETAILS} from "../../../utils/constants";
import {useGetFirstDocumentElement} from "./useGetFirstDocumentElement";
import {useGetLastDocumentElement} from "./useGetLastDocumentElement";
import {useEffect, useMemo, useState} from "react";
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
  jwt: string;
  publicKey: string;
  enabled: boolean;  // true if we want to enable the call, false otherwise
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
  jwt: string;
  teamFiles: {CIDMetadata: string, addedAt: number, uploaderAddress: string}[];
}

const getCIDsFromCIDsMetadata = async (params: GetCIDsFromCIDsMetadataParams): Promise<TeamFile[]> => {
  let promises = [];
  params.teamFiles.forEach(teamFile => {
    promises.push(lighthouse.fetchEncryptionKey(teamFile.CIDMetadata, params.publicKey, params.jwt));
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
  for (let i=0; i<params.teamFiles.length; i++) {
    const teamFile = params.teamFiles[i];
    const file = files[i];
    const fileContent = JSON.parse(await file.text());
    result.push({
      CIDMetadata: teamFile.CIDMetadata,
      CIDFile: fileContent.CID,
      addedAt: teamFile.addedAt,
      uploaderAddress: teamFile.uploaderAddress,
      name: fileContent.name,
      size: parseInt(fileContent.size)
    });
  }
  return result;
}

/**
 * Hook used to get files associated with the teamAddress parameter.
 */
export const useGetTeamFiles = (params: GetTeamFilesParams): useBaseAsyncHookState<GetTeamFilesResponse> => {
  const {completed, error, loading, result, progress,
    startAsyncAction, endAsyncActionSuccess, endAsyncActionError} = useBaseAsyncHook<GetTeamFilesResponse>();
  const [teamFiles, setTeamFiles] = useState<TeamFile[]>([]);

  const firstElementResult = useGetFirstDocumentElement({chainId: params.chainId, teamAddress: params.teamAddress});
  const lastElementResult = useGetLastDocumentElement({chainId: params.chainId, teamAddress: params.teamAddress});

  let startId = useMemo(() => {
    if (firstElementResult.completed && lastElementResult.completed) {
      if (params.reverse === false) return firstElementResult.result;
      else return lastElementResult.result;
    }
    return -1;
  }, [params.reverse, firstElementResult.completed, lastElementResult.completed, lastElementResult.result, firstElementResult.result]);

  const contractRead = useContractRead({
    address: CONTRACTS_DETAILS[params.chainId]?.TEAM_ARCHIVE_ADDRESS,
    abi: CONTRACTS_DETAILS[params.chainId]?.TEAM_ARCHIVE_ABI,
    functionName: "getTeamFiles",
    args: [params.teamAddress, startId, params.amount, params.reverse],
    onError: ((e) => endAsyncActionError(e.message)),
    enabled: startId>0 && params.enabled,
    watch: true
  });

  useEffect(() => {
    if (contractRead.isSuccess && contractRead.data) {
      new Promise (async (resolve, reject) => {
        const teamFiles = await getCIDsFromCIDsMetadata({
          teamFiles: contractRead.data.map((teamFile: {CID_metadata: string, addedAt: BigNumber, uploaderAddress: string}) => {
            return {
              CIDMetadata: teamFile.CID_metadata,
              addedAt: teamFile.addedAt.toNumber(),
              uploaderAddress: teamFile.uploaderAddress
            };
          }),
          jwt: params.jwt,
          publicKey: params.publicKey,
        });
        setTeamFiles(teamFiles);
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
