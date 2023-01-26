import {useBaseAsyncHook, useBaseAsyncHookState} from "../utils/useBaseAsyncHook";
import {useEffect} from "react";
import lighthouse from '@lighthouse-web3/sdk';

/**
 * @param {string} CID - The CID file uploaded using Lighthouse
 */
export interface UploadedFileDetails {
  CID: string;
}

/**
 * @param {File} file - The file to be uploaded using Lighthouse
 */
export interface UploadFileParams {
  file: File
}

/**
 * Hook used to upload files using lighthouse
 */
export const useUploadFile = (params: UploadFileParams): useBaseAsyncHookState<UploadedFileDetails> => {
  const { completed, error, loading, progress, result,
    startAsyncAction, endAsyncActionSuccess, updateAsyncActionProgress } = useBaseAsyncHook<UploadedFileDetails>();

  useEffect(() => {
    startAsyncAction();
    const progressCallback = (progressData) => {
      const percentageDone = 100 - parseInt((progressData.total / progressData.uploaded).toFixed(2));
      uploadPercentage(percentageDone);
    };

    const output = lighthouse.upload(
      params.file.webkitRelativePath, process.env.LIGHTHOUSE_API_KEY, progressCallback)
      .then(data => { endAsyncActionSuccess({
        CID: data.data.Hash,
      })});
  }, [params.file]);

  const uploadPercentage = (percentage: number): void => {
    updateAsyncActionProgress(percentage);
  };

  return { completed, error, loading, progress, result };
};
