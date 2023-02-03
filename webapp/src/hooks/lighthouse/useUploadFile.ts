import {useBaseAsyncHook, useBaseAsyncHookState} from "../utils/useBaseAsyncHook";
import React, {useEffect} from "react";
import lighthouse from '@lighthouse-web3/sdk';
import * as textUploadFileEncrypted from '@lighthouse-web3/sdk/Lighthouse/uploadEncrypted/browser/textUploadEncrypted.js';
import {useNetwork} from "wagmi";

/**
 * @param {File} file - The file to be uploaded using Lighthouse
 */
export interface UploadFileParams {
  publicKey: string;
  jwt: string;
  teamAddress: string;
  file: React.ChangeEvent<HTMLInputElement>;
}

/**
 * @param {string} CID - The CID file uploaded using Lighthouse
 */
export interface UploadFileResponse {
  CID: string;
}

const createCondition = (chainId: number, teamAddress: string) => {
  const chainName = chainId === 80001 ? 'mumbai' : 'hyperspace';
  return {
    id: 1,
    chain: chainName,
    method: "balanceOf",
    standardContractType: "ERC721",
    contractAddress: teamAddress,
    returnValueTest: { comparator: ">=", value: "1" },
    parameters: [":userAddress"],
  };
}

let uploadLaunched = false;

/**
 * Hook used to upload encrypted files using lighthouse
 */
export const useUploadFile = (params: UploadFileParams): useBaseAsyncHookState<UploadFileResponse> => {
  const { completed, error, loading, progress, result,
    startAsyncAction, endAsyncActionSuccess, updateAsyncActionProgress } = useBaseAsyncHook<UploadFileResponse>();

  const network = useNetwork();

  useEffect(() => {
    if (params.file && !uploadLaunched) {
      uploadLaunched = true;
      startAsyncAction();
      const progressCallback = (progressData) => {
        const percentageDone = 100 - parseInt((progressData.total / progressData.uploaded).toFixed(2));
        uploadPercentage(percentageDone);
      };
      new Promise(async (resolve, reject) => {
        // upload encrypted files to lighthouse
        const fileCID = await lighthouse.uploadEncrypted(
          // @ts-ignore
          params.file,
          params.publicKey,
          process.env.REACT_APP_LIGHTHOUSE_API_KEY,
          params.jwt,
          progressCallback
        );
        const metadataCID = await textUploadFileEncrypted(
          JSON.stringify({CID: fileCID.data.Hash, name: fileCID.data.Name, size: fileCID.data.Size}),
          process.env.REACT_APP_LIGHTHOUSE_API_KEY,
          params.publicKey,
          params.jwt
        );
        await lighthouse.accessCondition(
          params.publicKey,
          fileCID.data.Hash,
          params.jwt,
          [createCondition(network.chain.id, params.teamAddress)],
          "([1])"
        );
        await lighthouse.accessCondition(
          params.publicKey,
          metadataCID.data.Hash,
          params.jwt,
          [createCondition(network.chain.id, params.teamAddress)],
          "([1])"
        );
        endAsyncActionSuccess({
          CID: metadataCID.data.Hash
        });
        uploadLaunched = false;
      }).then(() => {});
    }
  }, []);

  const uploadPercentage = (percentage: number): void => {
    updateAsyncActionProgress(percentage);
  };

  return { completed, error, loading, progress, result };
};
