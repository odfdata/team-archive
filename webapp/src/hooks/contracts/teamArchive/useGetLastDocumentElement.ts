import {useBaseAsyncHook, useBaseAsyncHookState} from "../../utils/useBaseAsyncHook";
import {useContractRead} from "wagmi";
import {CONTRACTS_DETAILS} from "../../../utils/constants";

export interface GetLastDocumentElementParams {
  chainId: number;
  teamAddress: string;
}

/**
 * Hook used to get the last document element id associated with the teamAddress parameter
 */
export const useGetLastDocumentElement = (params: GetLastDocumentElementParams): useBaseAsyncHookState<number> => {
  const {completed, error, loading, result, progress,
    startAsyncAction, endAsyncActionSuccess, endAsyncActionError} = useBaseAsyncHook<string[]>();

  const contractRead = useContractRead({
    address: CONTRACTS_DETAILS[params.chainId]?.TEAM_ARCHIVE_ADDRESS,
    abi: CONTRACTS_DETAILS[params.chainId]?.TEAM_ARCHIVE_ABI,
    functionName: "lastDocumentElement",
    args: [params.teamAddress],
    onError: ((e) => endAsyncActionError(e.message)),
    watch: true
  });
  return { completed: contractRead.isSuccess, error, loading: contractRead.isFetching, progress, result: contractRead.data as unknown as number };
}
