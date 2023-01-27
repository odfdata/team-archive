import React, {useState} from 'react';
import {FileUploader} from "react-drag-drop-files";
import {InsertDriveFile} from "@mui/icons-material";
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

  const [file, setFile] = useState<File | undefined>(undefined);

  const uploadInProgress = useAppSelector(state => state.file.fileUploading_fileUploadInProgress);
  const dispatch = useAppDispatch();


  return (
    <Box paddingY={2}>
      {
        file === undefined ?
          <FileUploader
            handleChange={(f) => setFile(f)}
            label={"Drop your file here, or click to select"}/>
          :
          !uploadInProgress ?
            <Box display={"flex"} alignItems={"center"} flexDirection={"column"}>
              <Box display={"flex"} alignItems={"center"} flexDirection={"column"}>
                <InsertDriveFile sx={{color: theme.palette.text.secondary, fontSize: 40}}/>
                <Typography variant="body2" sx={{mt: 1}}>
                  {file?.name}
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
