import {Box, Typography} from '@mui/material';
import React from 'react';
import {useAccount} from "wagmi";
import ConnectWalletButton from "../../atoms/atoms/ConnectWalletButton/ConnectWalletButton";
import HomeTeamTokenSearchBar from "../../organisms/Home.TeamTokenSearchBar/Home.TeamTokenSearchBar";
import {useAppSelector} from "../../../hooks/redux/reduxHooks";
import HomeSignMessageToAccessTeamFiles
  from "../../organisms/Home.SignMessageToAccessTeamFiles/Home.SignMessageToAccessTeamFiles";

/**
 *
 * @param {React.PropsWithChildren<IHome>} props
 * @return {JSX.Element}
 * @constructor
 */
const Home: React.FC<IHome> = (props) => {

  const account = useAccount();
  const signStored = useAppSelector(state => state.user.userSignature);

  return (
    <Box width={"100%"} minHeight={"100vh"}
         display={"flex"} flexDirection={"column"} alignItems={"center"} pt={20}>
      <h1>Team Archive</h1>
      <Typography variant="subtitle1">
        Decentralized web3 storage and meeting platform
      </Typography>
      <Box mt={5}>
        {
          !account.isConnected ?
            <ConnectWalletButton/>
            :
            signStored === "" ?
              <HomeSignMessageToAccessTeamFiles/>
              :
              <HomeTeamTokenSearchBar/>
        }
      </Box>
    </Box>
  );
};

export interface IHome {

}

export default Home;
