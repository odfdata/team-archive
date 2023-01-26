import {useBaseAsyncHook, useBaseAsyncHookState} from "../utils/useBaseAsyncHook";
import {UploadFileResponse} from "./useUploadFile";
import {useEffect} from "react";
import {useAccount, useProvider, useSigner, useSignMessage} from "wagmi";
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

  const account = useAccount();
  const signer = useSigner();

  useEffect(() => {
    if (account.isConnected === false) return;
    startAsyncAction();
    new Promise (async (resolve, reject) => {
      const messageRequested = (await lighthouse.getAuthMessage(account.address)).data.message;
      const signedMessage = await signer.data.signMessage(messageRequested);
      endAsyncActionSuccess({
        signedMessage: signedMessage,
        publicKey: account.address,
      });
    }).then(() => {});
  }, [account.isConnected]);

  return { completed, error, loading, result, progress };
}
