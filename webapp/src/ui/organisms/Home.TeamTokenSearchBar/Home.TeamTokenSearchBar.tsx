import {Box, Button, FormControl, Input, InputAdornment, InputLabel, TextField} from '@mui/material';
import React from 'react';
import {Groups} from "@mui/icons-material";
import {theme} from "../../../GlobalStyles";
import {useIsMobile} from "../../../hooks/ui/mobileTabletUI";
import {useGetTeamFiles} from "../../../hooks/contracts/teamArchive/useGetTeamFiles";
import {useAccount, useConnect, useNetwork, useProvider} from "wagmi";
import {useGenerateSignature} from "../../../hooks/lighthouse/useGenerateSignature";

/**
 *
 * @param {React.PropsWithChildren<IHomeTeamTokenSearchBar>} props
 * @return {JSX.Element}
 * @constructor
 */
const HomeTeamTokenSearchBar: React.FC<IHomeTeamTokenSearchBar> = (props) => {
  const isMobile = useIsMobile();
  const network = useNetwork();

  const data = useGenerateSignature({});
  console.log(data.result);

  return (
    <Box width={isMobile ? "100%" : 500} display={"flex"} flexDirection={"row"} alignItems={"center"}>
      <TextField
        fullWidth
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
