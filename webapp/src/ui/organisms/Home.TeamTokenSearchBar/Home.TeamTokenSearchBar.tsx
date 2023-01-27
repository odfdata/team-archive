import {Box, Button, InputAdornment, TextField} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {Groups} from "@mui/icons-material";
import {useIsMobile} from "../../../hooks/ui/mobileTabletUI";
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

  const [teamAddressDebounced] = useDebounce(teamAddress, 500);

  const isMobile = useIsMobile();
  const navigate = useNavigate();

  useEffect(() => {
    let regex = /^0x[a-fA-F0-9]{40}$/;
    if (regex.test(teamAddressDebounced)) {
      navigate(`/team/${teamAddress}/archive`);
    }
  }, [teamAddressDebounced])

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
