import React, {useEffect} from 'react';
import {Box, CircularProgress, Typography} from "@mui/material";
import {useUploadFile} from "../../../hooks/lighthouse/useUploadFile";
import {useAccount} from "wagmi";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux/reduxHooks";
import {fileReducerActions} from "../../../store/reducers/file";
import {useParams} from "react-router";

/**
 *
 * @param {React.PropsWithChildren<IStep0UploadFile>} props
 * @return {JSX.Element}
 * @constructor
 */
const Step0UploadFile: React.FC<IStep0UploadFile> = (props) => {

  const signedMessage = useAppSelector(state => state.user.userSignature);
  const account = useAccount();
  const dispatch = useAppDispatch();
  const { teamAddress } = useParams();

  const status = useUploadFile({
    file: props.file,
    publicKey: account.address,
    signedMessage: signedMessage,
    teamAddress: teamAddress
  });

  useEffect(() => {
    if (status.completed) {
      dispatch(fileReducerActions.setFileUploadedCID(status.result.CID));
      dispatch(fileReducerActions.setFileUploadingInProgress(false));
      props.changeStep(1);
    }
  }, [status.completed])

  return (
    <Box display={"flex"} alignItems={"center"} justifyContent={"center"} flexDirection={"column"}>
      <CircularProgress/>
      <Typography variant={"body1"} sx={{mt: 2}}>
        File Uploading ...
      </Typography>
    </Box>
  );
};

export interface IStep0UploadFile {
  file: React.ChangeEvent<HTMLInputElement>;
  changeStep: (number) => void;
}

export default Step0UploadFile;
