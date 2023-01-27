import {useContractRead} from "wagmi";
import {useBaseAsyncHook, useBaseAsyncHookState} from "../../utils/useBaseAsyncHook";
import {CONTRACTS_DETAILS} from "../../../utils/constants";

export interface GetTeamFilesParams {
  chainId: number;
  /**
   * The team address for which you want to retrieve the files
   */
  teamAddress: string;

  startId: number;

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

/**
 * Hook used to get files associated with the teamAddress parameter.
 */
export const useGetTeamFiles = (params: GetTeamFilesParams): useBaseAsyncHookState<TeamFile[]> => {
  const {completed, error, loading, result, progress,
    startAsyncAction, endAsyncActionSuccess, endAsyncActionError} = useBaseAsyncHook<string[]>();
  
  const contractRead = useContractRead({
    address: CONTRACTS_DETAILS[params.chainId]?.TEAM_ARCHIVE_ADDRESS,
    abi: CONTRACTS_DETAILS[params.chainId]?.TEAM_ARCHIVE_ABI,
    functionName: "getTeamFiles",
    args: [params.teamAddress, params.startId, params.amount, params.reverse],
    onError: ((e) => endAsyncActionError(e.message))
  });

  return { completed: contractRead.isSuccess, error, loading: contractRead.isFetching, progress, result: contractRead.data as TeamFile[] };
}
