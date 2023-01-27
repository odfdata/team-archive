import React, {useEffect} from 'react';
import {useGenerateSignature} from "../../../hooks/lighthouse/useGenerateSignature";
import {Box, CircularProgress, Typography} from "@mui/material";
import {useAppDispatch} from "../../../hooks/redux/reduxHooks";
import {userReducerActions} from "../../../store/reducers/user";

/**
 *
 * @param {React.PropsWithChildren<IHomeSignMessageToAccessTeamFiles>} props
 * @return {JSX.Element}
 * @constructor
 */
const HomeSignMessageToAccessTeamFiles: React.FC<IHomeSignMessageToAccessTeamFiles> = (props) => {
  const signResult = useGenerateSignature();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (signResult && signResult.result) {
      dispatch(userReducerActions.setUserSignature(signResult.result.signedMessage));
    }
  }, [signResult]);

  return (
    <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
      <CircularProgress/>
      <Typography variant={"body1"} sx={{mt: 2}}>
        Please, Sign the message to confirm wallet connection
      </Typography>
    </Box>
  );
};

export interface IHomeSignMessageToAccessTeamFiles {

}

export default HomeSignMessageToAccessTeamFiles;
