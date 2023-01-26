import {useBaseAsyncHook, useBaseAsyncHookState} from "../utils/useBaseAsyncHook";
import {UploadFileResponse} from "./useUploadFile";
import {useEffect} from "react";
import {useAccount, useSigner, useSignMessage} from "wagmi";
import lighthouse from "@lighthouse-web3/sdk";

export interface GenerateSignatureParams {

}

export interface GenerateSignatureResponse {

}

/**
 * Hook used to generate signature for lighthouse
 */
export const useGenerateSignature = (
  params: GenerateSignatureParams): useBaseAsyncHookState<GenerateSignatureResponse> => {
  // TODO: understand how to implement this part using "wagmi"
  const { completed, error, loading, result, progress,
    startAsyncAction, endAsyncActionSuccess, endAsyncActionError } = useBaseAsyncHook<GenerateSignatureResponse>();
  /*
  const account = useAccount();
  const signMessage = useSignMessage();
  useEffect(() => {
    startAsyncAction();
    new Promise (async (resolve, reject) => {
      const messageRequested = (await lighthouse.getAuthMessage(account.address)).data.message;
      const signedMessage = await signMessage(messageRequested);
      return({
        signedMessage: signedMessage,
        publicKey: address
      });

      try {
        let isFile = await isCIDaFile(CID);
        endAsyncActionSuccess({
          isDirectory: !isFile,
          isFile: isFile
        });
      } catch (e) {
        endAsyncActionError(e.message());
      }
    }).then(() => {});
  }, []);
   */
  return { completed, error, loading, result, progress };
}
