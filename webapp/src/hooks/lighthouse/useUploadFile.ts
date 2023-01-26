import {useBaseAsyncHook, useBaseAsyncHookState} from "../utils/useBaseAsyncHook";

export interface UploadedFileDetails {

}

export interface UploadFileParams {
  file: File
}

/**
 * Hook used to upload files using lighthouse
 */
export const useUploadFile = (params: UploadFileParams): useBaseAsyncHookState<UploadedFileDetails> => {
  const { completed, error, loading, progress, result,
    startAsyncAction, endAsyncActionSuccess, updateAsyncActionProgress } = useBaseAsyncHook<UploadedFileDetails>();
  return { completed, error, loading, progress, result };
};
