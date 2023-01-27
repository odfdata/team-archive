import {useBaseAsyncHook, useBaseAsyncHookState} from "../utils/useBaseAsyncHook";
import {useEffect} from "react";
import lighthouse from '@lighthouse-web3/sdk';

/**
 * @param {File} file - The file to be uploaded using Lighthouse
 */
export interface UploadFileParams {
  publicKey: string;
  signedMessage: string;
  teamAdddress: string;
  file: File;
}

/**
 * @param {string} CID - The CID file uploaded using Lighthouse
 */
export interface UploadFileResponse {
  CID: string;
}

const createCondition = (teamAddress: string) => {
  return {
    id: 1,
    chain: "mumbai",
    method: "balanceOf",
    standardContractType: "ERC721",
    contractAddress: teamAddress,
    returnValueTest: { comparator: ">=", value: "1" },
    parameters: [":userAddress"],
  };
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
    new Promise(async (resolve, reject) => {
      // upload encrypted files to lighthouse
      const fileCID = await lighthouse.uploadEncrypted(
        params.file.webkitRelativePath,
        params.publicKey,
        process.env.REACT_APP_LIGHTHOUSE_API_KEY,
        params.signedMessage,
        progressCallback
      );
      console.log("process.env.LIGHTHOUSE_API_KEY", process.env.REACT_APP_LIGHTHOUSE_API_KEY);
      const metadataCID = await lighthouse.textUploadEncrypted(
        JSON.stringify({CID: fileCID.data.Hash, name: fileCID.data.Name, size: fileCID.data.Size}),
        process.env.REACT_APP_LIGHTHOUSE_API_KEY,
        params.publicKey,
        params.signedMessage
      );
      // TODO: apply access control
      const response = await lighthouse.accessCondition(
        params.publicKey,
        fileCID.data.Hash,
        params.signedMessage,
        createCondition(params.teamAdddress),
        "([1])"
      );
      console.log(response);
      endAsyncActionSuccess({
        CID: metadataCID.data.Hash
      });
    }).then(() => {});
  }, [params.file]);

  const uploadPercentage = (percentage: number): void => {
    updateAsyncActionProgress(percentage);
  };

  return { completed, error, loading, progress, result };
};
