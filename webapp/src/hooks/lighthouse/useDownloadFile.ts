import lighthouse from "@lighthouse-web3/sdk";
import {useEffect} from "react";
import {useBaseAsyncHook, useBaseAsyncHookState} from "../utils/useBaseAsyncHook";

export interface DownloadFileParams {
  CID: string;
  publicKey: string;
  jwt: string;
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
      const keyObject = await lighthouse.fetchEncryptionKey(params.CID, params.publicKey, params.jwt);
      const decrypted = await lighthouse.decryptFile(params.CID, keyObject.data.key);
      endAsyncActionSuccess({
        decrypted: decrypted,
      });
    }).then(() => {});
  }, [params.CID]);

  return { completed, error, loading, progress, result };
}
