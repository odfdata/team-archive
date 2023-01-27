import {Box, Button, FormControl, Input, InputAdornment, InputLabel, TextField} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {Groups} from "@mui/icons-material";
import {theme} from "../../../GlobalStyles";
import {useIsMobile} from "../../../hooks/ui/mobileTabletUI";
import {useGetTeamFiles} from "../../../hooks/contracts/teamArchive/useGetTeamFiles";
import {useAccount, useConnect, useNetwork, useProvider} from "wagmi";
import {useGenerateSignature} from "../../../hooks/lighthouse/useGenerateSignature";
import {useAppSelector} from "../../../hooks/redux/reduxHooks";
import {useNavigate} from "react-router";
import {useDebounce} from "use-debounce";

/**
 *
 * @param {React.PropsWithChildren<IHomeTeamTokenSearchBar>} props
 * @return {JSX.Element}
 * @constructor
 */
const HomeTeamTokenSearchBar: React.FC<IHomeTeamTokenSearchBar> = (props) => {

  const [teamAddress, setTeamAddress] = useState<string>("");
  const signature = useAppSelector(state => state.user.userSignature);

  const [teamAddressDebounced] = useDebounce(teamAddress, 500);

  const isMobile = useIsMobile();
  const network = useNetwork();
  const navigate = useNavigate();

  const teamFiles = useGetTeamFiles({
    amount: 100,
    chainId: network.chain.id,
    teamAddress: teamAddressDebounced,
    reverse: true,
    startId: 123456
  });

  useEffect(() => {
    if (teamFiles.completed && teamFiles.error === "" && teamFiles.result ) {
      navigate(`/team/${teamAddress}`);
    }
  }, [teamFiles.completed])

  return (
    <Box width={isMobile ? "100%" : 500} display={"flex"} flexDirection={"row"} alignItems={"center"}>
      <TextField
        fullWidth
        value={teamAddress}
        onChange={e => setTeamAddress(e.target.value)}
        id="search-team-input"
        type={"search"}
        label={"Enter your Team Token Address"}
        InputProps={{
          placeholder: "0xAbc23...",
          startAdornment:
            <InputAdornment position="start">
              <Groups />
            </InputAdornment>
        }}
      />
      <Button variant={"contained"} sx={{ml: 2}}>
        Enter
      </Button>
    </Box>
  );
};

export interface IHomeTeamTokenSearchBar {

}

export default HomeTeamTokenSearchBar;
