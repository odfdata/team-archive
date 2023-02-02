import React from 'react';
import {DoneAll, DoneAllTwoTone} from "@mui/icons-material";
import {theme} from "../../../GlobalStyles";
import {Box, Typography} from "@mui/material";

/**
 *
 * @param {React.PropsWithChildren<IStep2>} props
 * @return {JSX.Element}
 * @constructor
 */
const Step2: React.FC<IStep2> = (props) => {
  return (
    <Box paddingY={2} display={"flex"} alignItems={"center"} justifyContent={"center"} flexDirection={"column"}>
      <DoneAll style={{fontSize: 50, color: theme.palette.primary.main}}/>
      <Typography sx={{mt: 2}}>
        File correctly added to your Team Archive!
      </Typography>
    </Box>
  );
};

export interface IStep2 {

}

export default Step2;
