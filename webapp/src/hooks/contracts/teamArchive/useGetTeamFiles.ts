import {useContractRead} from "wagmi";
import {useBaseAsyncHook, useBaseAsyncHookState} from "../../utils/useBaseAsyncHook";
import {CONTRACTS_DETAILS} from "../../../utils/constants";
import {useGetFirstDocumentElement} from "./useGetFirstDocumentElement";
import {useGetLastDocumentElement} from "./useGetLastDocumentElement";
import {useEffect, useMemo} from "react";

export interface GetTeamFilesParams {
  chainId: number;
  /**
   * The team address for which you want to retrieve the files
   */
  teamAddress: string;

  amount: number;

  reverse: boolean;
}

export interface TeamFile {
  /**
   * The IPFS CID file
   */
  CID: string;
  /**
   * The address owner of the file
   */
  teamAddress: string;
  /**
   * The UNIX timestamp in which the file has been added
   */
  addDate: number;
}

export interface GetTeamFilesResponse {
  teamFiles: TeamFile[];
  refetch: any;
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
    enabled: startId>=0
  });
  return {
    completed: contractRead.isSuccess,
    error,
    loading: contractRead.isFetching,
    progress,
    result: {
      teamFiles: contractRead.data as TeamFile[],
      refetch: contractRead.refetch
    }
  };
}
