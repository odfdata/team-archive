import {useContractRead} from "wagmi";
import {useBaseAsyncHook, useBaseAsyncHookState} from "../../utils/useBaseAsyncHook";
import {CONTRACTS_DETAILS} from "../../../utils/constants";
import {BigNumber} from "@ethersproject/bignumber";

export interface IsTeamMemberParams {
  chainId: number;
  /**
   * The team address for which you want to retrieve the files
   */
  teamAddress: string;
  userAddress: string;  //wallet of the user to checkì
}


/**
 * Hook used to check if the account is part of the team
 */
export const useIsTeamMember = (params: IsTeamMemberParams): useBaseAsyncHookState<boolean> => {
  const {completed, error, loading, result, progress,
    startAsyncAction, endAsyncActionSuccess, endAsyncActionError} = useBaseAsyncHook<boolean>();

  const contractRead = useContractRead({
    address: params.teamAddress as `0x${string}`,
    abi: CONTRACTS_DETAILS[params.chainId]?.FAKE_TEAM_TOKEN_ABI,
    functionName: "balanceOf",
    args: [params.userAddress],
    onError: ((e) => endAsyncActionError(e.message)),
    watch: true
  });

  let isTeamMember = false;
  if (contractRead.data) {
    try {
      isTeamMember = (contractRead.data as unknown as BigNumber).gt(0);
    } catch (e) { }
  }

  return {
    completed: contractRead.isSuccess,
    error,
    loading: contractRead.isFetching,
    progress,
    result: isTeamMember
  };
}
