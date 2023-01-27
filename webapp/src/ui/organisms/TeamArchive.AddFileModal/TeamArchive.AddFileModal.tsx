import React, {useState} from 'react';
import {Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux/reduxHooks";
import {fileReducerActions} from "../../../store/reducers/file";
import UploadStepper from "./UploadStepper";
import Step0 from "./Step0";

/**
 *
 * @param {React.PropsWithChildren<ITeamArchiveAddFileModal>} props
 * @return {JSX.Element}
 * @constructor
 */
const TeamArchiveAddFileModal: React.FC<ITeamArchiveAddFileModal> = (props) => {

  const [activeStep, setActiveStep] = useState<number>(0);

  const showDialog = useAppSelector(state => state.file.showFileUploadingModal);
  const dispatch = useAppDispatch();

  // handle the close for the modal. If there's a click outside of it, it doesn't close
  const handleClose = (e, reason) => {
    if (reason !== "backdropClick")
      dispatch(fileReducerActions.setShowFileUploadingModal(false))
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
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => {}}>Disagree</Button>
        <Button onClick={() => {}} autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export interface ITeamArchiveAddFileModal {

}

export default TeamArchiveAddFileModal;
