import React, {useEffect, useState} from 'react';
import {Box, Button, CircularProgress, Typography} from "@mui/material";
import {InsertDriveFile, Upload} from "@mui/icons-material";
import {theme} from "../../../GlobalStyles";
import {fileReducerActions} from "../../../store/reducers/file";
import Step0_UploadFile from "./Step0_UploadFile";
import {useAddFiles} from "../../../hooks/contracts/teamArchive/useAddFiles";
import {useParams} from "react-router";
import {useNetwork} from "wagmi";
import {useAppSelector} from "../../../hooks/redux/reduxHooks";
import {CHAIN_DETAILS} from "../../../utils/constants";

/**
 *
 * @param {React.PropsWithChildren<IStep1>} props
 * @return {JSX.Element}
 * @constructor
 */
const Step1: React.FC<IStep1> = (props) => {

  const [transactionInProgress, setTransactionInProgress] = useState<boolean>(false);

  const network = useNetwork();
  const { teamAddress } = useParams();
  const uploadedCID = useAppSelector(state => state.file.fileUploading_uploadedFileCID);

  const txData = useAddFiles({
    chainId: network.chain.id,
    teamAddress: teamAddress,
    metadataCIDs: [uploadedCID]
  })

  // once tx completed, go to the last step
  useEffect(() => {
    if (txData.completed && txData.error === "")
      props.changeStep(2);
  }, [txData.completed]);

  // cancel the transaction in progress in case of error
  useEffect(() => {
    if (txData.error)
      setTransactionInProgress(false);
  }, [txData.error]);

  return (
    <Box paddingY={2}>
      {
        !transactionInProgress ?
          <Box display={"flex"} alignItems={"center"} flexDirection={"column"}>
            <Box display={"flex"} alignItems={"center"} flexDirection={"column"}>
              <Typography textAlign={"center"}>
                File correctly uploaded to IPFS!<br/>
                Please, confirm the transaction to include in you team's archive.
              </Typography>
            </Box>
            <Box display={"flex"} sx={{mt: 3}}>
              <Button variant={"contained"} onClick={() => {setTransactionInProgress(true); txData.write();}}>
                Include in Team Archive
              </Button>
            </Box>
          </Box>
          :
          <Box display={"flex"} flexDirection={"column"} alignItems={"center"} justifyContent={"center"}>
            <CircularProgress/>
            {
              txData.txHash ?
                <Typography variant={"body1"} sx={{mt: 1}}>
                  Follow your <a target={"_blank"} href={`${CHAIN_DETAILS[network.chain.id].EXPLORER_URL}tx/${txData.txHash}`}>transaction</a>
                </Typography>
                :
                ""
            }
          </Box>
      }
    </Box>
  );
};

export interface IStep1 {
  changeStep: (number) => void;
}

export default Step1;
