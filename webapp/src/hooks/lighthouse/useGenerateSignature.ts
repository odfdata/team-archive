import {useBaseAsyncHook, useBaseAsyncHookState} from "../utils/useBaseAsyncHook";
import {useEffect} from "react";
import {useAccount, useSigner} from "wagmi";
import lighthouse from "@lighthouse-web3/sdk";
import { getAuthMessage, AuthMessage, getJWT } from "@lighthouse-web3/kavach";


export interface GenerateSignatureResponse {
  signedMessage: string;
  publicKey: string;
}

/**
 * Hook used to generate signature for lighthouse
 */
export const useGenerateSignature = (): useBaseAsyncHookState<GenerateSignatureResponse> => {
  // TODO: understand how to implement this part using "wagmi"
  const { completed, error, loading, result, progress,
    startAsyncAction, endAsyncActionSuccess, endAsyncActionError } = useBaseAsyncHook<GenerateSignatureResponse>();

  const account = useAccount();
  const signer = useSigner();

  useEffect(() => {
    if (account.isConnected === false || signer.status !== "success") return;
    startAsyncAction();
    new Promise (async (resolve, reject) => {
      const authMessage: AuthMessage = await getAuthMessage(account.address);
      const signedMessage = await signer.data.signMessage(authMessage.message);
      const { JWT, error } = await getJWT(account.address, signedMessage);
      endAsyncActionSuccess({
        signedMessage: JWT,
        publicKey: account.address,
      });
    }).then(() => {});
  }, [account.isConnected, signer.status]);

  return { completed, error, loading, result, progress };
}
