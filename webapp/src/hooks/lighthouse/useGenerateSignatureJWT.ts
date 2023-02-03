import {useBaseAsyncHook, useBaseAsyncHookState} from "../utils/useBaseAsyncHook";
import {useEffect} from "react";
import {useAccount, useSigner} from "wagmi";
import {AuthMessage, getAuthMessage, getJWT} from "@lighthouse-web3/kavach";


export interface GenerateSignatureResponse {
  jwt: string;
  publicKey: string;
}

/**
 * Hook used to generate JWT from signature for lighthouse
 */
export const useGenerateSignatureJWT = (): useBaseAsyncHookState<GenerateSignatureResponse> => {
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
        jwt: JWT,
        publicKey: account.address,
      });
    }).then(() => {});
  }, [account.isConnected, signer.status]);

  return { completed, error, loading, result, progress };
}
