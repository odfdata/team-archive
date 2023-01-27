import {useBaseAsyncHook, useBaseAsyncHookState} from "../../utils/useBaseAsyncHook";
import {TeamFile} from "./useGetTeamFiles";

export const useRemoveFiles = (params): useBaseAsyncHookState<boolean> => {
  const {completed, error, loading, result, progress,
    startAsyncAction, endAsyncActionSuccess, endAsyncActionError} = useBaseAsyncHook<boolean>();

  return { completed: completed, error, loading: loading, progress, result: true };
}
