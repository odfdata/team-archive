import {useContractWrite, useNetwork, usePrepareContractWrite, useWaitForTransaction} from "wagmi";
import {
  useBaseSmartContractWrite,
  useBaseSmartContractWriteExternalReturn
} from "../../utils/useBaseSmartContractWrite";
import {CONTRACTS_DETAILS} from "../../../utils/constants";
import {useEffect, useMemo} from "react";
import {ethers} from "ethers";

export interface AddFilesParams {
  chainId: number;
  teamAddress: string;
  /**
   * The list of CIDs containing the metadata you want to index on-chain
   */
  metadataCIDs: string[];
}

const generateIDs = (metadataCIDs: string[]): number[] => {
  const IDs = [];
  metadataCIDs.forEach(metadataCID => {
    IDs.push(ethers.BigNumber.from(ethers.utils.randomBytes(32)));
  });
  return IDs;
}
export const useAddFiles = (params: AddFilesParams): useBaseSmartContractWriteExternalReturn<undefined> => {
  const {
    completed, error, loading, result, txHash, progress, endAsyncActionError, endAsyncActionSuccess, startAsyncAction,
    startAsyncActionWithTxHash
  } = useBaseSmartContractWrite<undefined>();
  const network = useNetwork();
  // generate ids for each metadata
  const ids = useMemo(() => generateIDs(params.metadataCIDs), []);
  const prepareContractWrite = usePrepareContractWrite({
    address: CONTRACTS_DETAILS[network.chain?.id]?.TEAM_ARCHIVE_ADDRESS,
    abi: CONTRACTS_DETAILS[network.chain?.id]?.TEAM_ARCHIVE_ABI,
    functionName: 'addFiles',
    args: [
      params.teamAddress,
      ids,
      params.metadataCIDs
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
    if (!contractWrite.writeAsync) return;
    startAsyncAction();
    contractWrite.writeAsync()
      .then(() => {
      })
      .catch(e => endAsyncActionError(e.message));
  });

  return {completed, error, loading, result, progress, txHash, write};
}
