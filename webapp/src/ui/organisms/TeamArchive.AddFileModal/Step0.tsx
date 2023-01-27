import React, {useState} from 'react';
import {InsertDriveFile, Upload} from "@mui/icons-material";
import {Box, Button, Typography} from "@mui/material";
import {theme} from "../../../GlobalStyles";
import Step0_UploadFile from "./Step0_UploadFile";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux/reduxHooks";
import {fileReducerActions} from "../../../store/reducers/file";

/**
 *
 * @param {React.PropsWithChildren<IStep0>} props
 * @return {JSX.Element}
 * @constructor
 */
const Step0: React.FC<IStep0> = (props) => {

  const [file, setFile] = useState< React.ChangeEvent<HTMLInputElement> | undefined>(undefined);

  const uploadInProgress = useAppSelector(state => state.file.fileUploading_fileUploadInProgress);
  const dispatch = useAppDispatch();


  return (
    <Box paddingY={2}>
      {
        file === undefined ?
          <Box display={"flex"} alignItems={"center"} flexDirection={"column"}>
            <Button variant="contained" component="label" startIcon={<Upload/>}>
              Upload
              <input hidden type="file" onChange={e => setFile(e)} />
            </Button>
            <Typography variant={"body1"} sx={{mt: 1}}>Select the file to upload</Typography>
          </Box>
          :
          !uploadInProgress ?
            <Box display={"flex"} alignItems={"center"} flexDirection={"column"}>
              <Box display={"flex"} alignItems={"center"} flexDirection={"column"}>
                <InsertDriveFile sx={{color: theme.palette.text.secondary, fontSize: 40}}/>
                <Typography variant="body2" sx={{mt: 1}}>
                  {file?.target.files[0].name}
                </Typography>
              </Box>
              <Box display={"flex"} sx={{mt: 3}}>
                <Button variant={"outlined"} onClick={() => setFile(undefined)}>
                  Pick another
                </Button>
                <Button variant={"contained"} sx={{ml: 2}} onClick={() => dispatch(fileReducerActions.setFileUploadingInProgress(true))}>
                  Confirm
                </Button>
              </Box>
            </Box>
            :
            <Step0_UploadFile file={file} changeStep={props.changeStep} />
      }
    </Box>
  );
};

export interface IStep0 {
  changeStep: (number) => void;
}

export default Step0;
