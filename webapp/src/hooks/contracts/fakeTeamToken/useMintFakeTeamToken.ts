import {useContractWrite, useNetwork, usePrepareContractWrite, useWaitForTransaction} from "wagmi";
import {
  useBaseSmartContractWrite,
  useBaseSmartContractWriteExternalReturn
} from "../../utils/useBaseSmartContractWrite";
import {CONTRACTS_DETAILS} from "../../../utils/constants";
import {useEffect, useMemo} from "react";
import {ethers} from "ethers";

export const useMintFakeTeamToken = (): useBaseSmartContractWriteExternalReturn<undefined> => {
  const {
    completed, error, loading, result, txHash, progress, endAsyncActionError, endAsyncActionSuccess, startAsyncAction,
    startAsyncActionWithTxHash
  } = useBaseSmartContractWrite<undefined>();
  const network = useNetwork();

  const newTokenId = useMemo(() => ethers.BigNumber.from(ethers.utils.randomBytes(32)), []);

  const prepareContractWrite = usePrepareContractWrite({
    address: CONTRACTS_DETAILS[network.chain?.id]?.FAKE_TEAM_TOKEN_ADDRESS,
    abi: CONTRACTS_DETAILS[network.chain?.id]?.FAKE_TEAM_TOKEN_ABI,
    functionName: 'mint',
    args: [
      newTokenId
    ]
  });
  const contractWrite = useContractWrite(prepareContractWrite.config);
  const waitForTx = useWaitForTransaction({
    hash: contractWrite.data?.hash,
  });

  useEffect(() => {
    if (waitForTx.status === "success") endAsyncActionSuccess(undefined)
    else if (waitForTx.status === "loading") startAsyncActionWithTxHash(contractWrite.data?.hash)
    else if (waitForTx.status === "error") endAsyncActionError(waitForTx.error.message)
  }, [waitForTx.status]);

  const write = (() => {
    // if (!contractWrite.writeAsync) return;
    startAsyncAction();
    contractWrite.writeAsync()
      .then(() => {
      })
      .catch(e => endAsyncActionError(e.message));
  });

  return {completed, error, loading, result, progress, txHash, write};
}
