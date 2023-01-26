import lighthouse from "@lighthouse-web3/sdk";
import {useAccount, useSignMessage} from "wagmi";
import {useEffect} from "react";
import {useBaseAsyncHook, useBaseAsyncHookState} from "../utils/useBaseAsyncHook";
import {UploadFileResponse} from "./useUploadFile";

export interface DownloadFileParams {
  CID: string;
  publicKey: string;
  signedMessage: string;
}

export interface DownloadFileResponse {
  decrypted: File
}

export const useDownloadFile = (params): useBaseAsyncHookState<DownloadFileResponse> => {
  const { completed, error, loading, progress, result,
    startAsyncAction, endAsyncActionSuccess, updateAsyncActionProgress } = useBaseAsyncHook<DownloadFileResponse>();

  useEffect(() => {
    startAsyncAction();
    new Promise (async (resolve, reject) => {
      const keyObject = await lighthouse.fetchEncryptionKey(params.CID, params.publicKey, params.signedMessage);
      const decrypted = await lighthouse.decryptFile(params, keyObject.data.key);
      endAsyncActionSuccess({
        decrypted: decrypted,
      });
    }).then(() => {});
  }, [params.CID]);

  return { completed, error, loading, progress, result };
}
