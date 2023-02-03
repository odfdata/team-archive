import React, {useState} from 'react';
import {Box, Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux/reduxHooks";
import {fileReducerActions} from "../../../store/reducers/file";
import UploadStepper from "./UploadStepper";
import Step0 from "./Step0";
import Step1 from "./Step1";
import Step2 from "./Step2";

/**
 *
 * @param {React.PropsWithChildren<ITeamArchiveAddFileModal>} props
 * @return {JSX.Element}
 * @constructor
 */
const TeamArchiveAddFileModal: React.FC<ITeamArchiveAddFileModal> = (props) => {

  const [activeStep, setActiveStep] = useState<number>(0);

  const showDialog = useAppSelector(state => state.file.showFileUploadingModal);
  const fileUploading_fileUploadInProgress = useAppSelector(state => state.file.fileUploading_fileUploadInProgress);
  const dispatch = useAppDispatch();

  // handle the close for the modal. If there's a click outside of it, it doesn't close
  const handleClose = (e, reason) => {
    if (reason !== "backdropClick") {
      setActiveStep(0);
      dispatch(fileReducerActions.setShowFileUploadingModal(false))
    }
  }

  const goToStep = (stepChosen: 0 |1 | 2) => {
    setActiveStep(stepChosen);
  }

  return (
    <Dialog
      open={showDialog}
      onClose={handleClose}
      disableEscapeKeyDown
    >
      <DialogTitle>
        {"Add New File"}
      </DialogTitle>
      <DialogContent>
        <UploadStepper activeStep={activeStep}/>
        <Box mt={2}>
          { activeStep === 0 ? <Step0 changeStep={goToStep} /> : ""}
          { activeStep === 1 ? <Step1 changeStep={goToStep} /> : ""}
          { activeStep === 2 ? <Step2/> : ""}
        </Box>
      </DialogContent>
      {
        (activeStep === 0 && !fileUploading_fileUploadInProgress) || activeStep === 2 ?
          <DialogActions>
            <Button onClick={() => handleClose(1,1)}>Close</Button>
          </DialogActions>
          :
          ""
      }
    </Dialog>
  );
};

export interface ITeamArchiveAddFileModal {

}

export default TeamArchiveAddFileModal;
