import React from 'react';
import {Step, StepLabel, Stepper} from "@mui/material";

/**
 *
 * @param {React.PropsWithChildren<IUploadStepper>} props
 * @return {JSX.Element}
 * @constructor
 */
const UploadStepper: React.FC<IUploadStepper> = (props) => {
  return (
    <Stepper activeStep={props.activeStep}>
      <Step key={0} completed={false}>
        <StepLabel>{"Select File"}</StepLabel>
      </Step>
      <Step key={1} completed={false}>
        <StepLabel>{"Confirm publish"}</StepLabel>
      </Step>
      <Step key={2} completed={false}>
        <StepLabel>{"Upload complete"}</StepLabel>
      </Step>
    </Stepper>
  );
};

export interface IUploadStepper {
  activeStep: number
}

export default UploadStepper;
