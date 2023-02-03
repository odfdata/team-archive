import {Box, Button, InputAdornment, TextField} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {Groups} from "@mui/icons-material";
import {useIsMobile} from "../../../hooks/ui/mobileTabletUI";
import {useNavigate} from "react-router";
import {useDebounce} from "use-debounce";
import {useMintFakeTeamToken} from "../../../hooks/contracts/fakeTeamToken/useMintFakeTeamToken";
import {CONTRACTS_DETAILS} from "../../../utils/constants";
import {useNetwork} from "wagmi";

/**
 *
 * @param {React.PropsWithChildren<IHomeTeamTokenSearchBar>} props
 * @return {JSX.Element}
 * @constructor
 */
const HomeTeamTokenSearchBar: React.FC<IHomeTeamTokenSearchBar> = (props) => {

  const [teamAddress, setTeamAddress] = useState<string>("");
  const [mintInProgress, setMintInProgress] = useState<boolean>(false);

  const [teamAddressDebounced] = useDebounce(teamAddress, 500);
  const mintFakeTeamToken = useMintFakeTeamToken();

  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const network = useNetwork();

  useEffect(() => {
    let regex = /^0x[a-fA-F0-9]{40}$/;
    if (regex.test(teamAddressDebounced)) {
      navigate(`/team/${teamAddress}/archive`);
    }
  }, [teamAddressDebounced]);

  // redirect to the team page once the token has been minted
  useEffect(( ) => {
    if (mintFakeTeamToken.completed && mintFakeTeamToken.error === "") {
      accessFakeTeam();
    } else if (mintFakeTeamToken.completed) setMintInProgress(false);
  }, [mintFakeTeamToken.result, mintFakeTeamToken.completed])

  /**
   * Mint one fake team token
   */
  const mint = () => {
    setMintInProgress(true);
    mintFakeTeamToken.write();
  }

  /**
   * Redirects the user to the fake team token archive page
   */
  const accessFakeTeam = () => {
    navigate(`/team/${CONTRACTS_DETAILS[network.chain.id].FAKE_TEAM_TOKEN_ADDRESS}/archive`);
  }

  return (
    <Box display={"flex"} flexDirection={"column"}>
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
      <Box mt={4} display={"flex"} alignItems={"center"} justifyContent={"center"}>
        <Button variant={"outlined"} onClick={mint} disabled={mintInProgress}>
          Get a Fake Team Token
        </Button>
        <Button variant={"outlined"} onClick={accessFakeTeam} disabled={mintInProgress} sx={{ml: 2}}>
          Access FakeTeam
        </Button>
      </Box>
    </Box>
  );
};

export interface IHomeTeamTokenSearchBar {

}

export default HomeTeamTokenSearchBar;
