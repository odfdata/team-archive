import {Box, Button, FormControl, Input, InputAdornment, InputLabel, TextField} from '@mui/material';
import React from 'react';
import {Groups} from "@mui/icons-material";
import {theme} from "../../../GlobalStyles";
import {useIsMobile} from "../../../hooks/ui/mobileTabletUI";

/**
 *
 * @param {React.PropsWithChildren<IHomeTeamTokenSearchBar>} props
 * @return {JSX.Element}
 * @constructor
 */
const HomeTeamTokenSearchBar: React.FC<IHomeTeamTokenSearchBar> = (props) => {
  const isMobile = useIsMobile();

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
