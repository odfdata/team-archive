import {useBaseAsyncHook, useBaseAsyncHookState} from "../utils/useBaseAsyncHook";
import {useEffect} from "react";
import lighthouse from '@lighthouse-web3/sdk';

/**
 * @param {File} file - The file to be uploaded using Lighthouse
 */
export interface UploadFileParams {
  publicKey: string;
  signedMessage: string;
  file: File;
}

/**
 * @param {string} CID - The CID file uploaded using Lighthouse
 */
export interface UploadFileResponse {
  CID: string;
}

/**
 * Hook used to upload encrypted files using lighthouse
 */
export const useUploadFile = (params: UploadFileParams): useBaseAsyncHookState<UploadFileResponse> => {
  const { completed, error, loading, progress, result,
    startAsyncAction, endAsyncActionSuccess, updateAsyncActionProgress } = useBaseAsyncHook<UploadFileResponse>();

  useEffect(() => {
    startAsyncAction();
    const progressCallback = (progressData) => {
      const percentageDone = 100 - parseInt((progressData.total / progressData.uploaded).toFixed(2));
      uploadPercentage(percentageDone);
    };
    // upload encrypted files to lighthouse
    lighthouse.uploadEncrypted(
      params.file.webkitRelativePath,
      params.publicKey,
      process.env.LIGHTHOUSE_API_KEY,
      params.signedMessage,
      progressCallback
    ).then(data => {
      lighthouse.textUploadEncrypted(
        JSON.stringify({CID: data.data.Hash, name: data.data.Name, size: data.data.Size}),
        process.env.LIGHTHOUSE_API_KEY,
        params.publicKey,
        params.signedMessage
      ).then(data => {
        endAsyncActionSuccess({
          CID: data.data.Hash
        });
      });
    });
  }, [params.file]);

  const uploadPercentage = (percentage: number): void => {
    updateAsyncActionProgress(percentage);
  };

  return { completed, error, loading, progress, result };
};
