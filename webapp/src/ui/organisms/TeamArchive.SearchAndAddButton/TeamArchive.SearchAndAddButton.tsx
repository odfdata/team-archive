import React, {useState} from 'react';
import {Box, Button, InputAdornment, TextField} from "@mui/material";
import {Add, Groups, Search} from "@mui/icons-material";
import TeamArchiveAddFileModal from "../TeamArchive.AddFileModal/TeamArchive.AddFileModal";
import {useAppDispatch} from "../../../hooks/redux/reduxHooks";
import {fileReducerActions} from "../../../store/reducers/file";

/**
 *
 * @param {React.PropsWithChildren<ITeamArchiveSearchAndAddButton>} props
 * @return {JSX.Element}
 * @constructor
 */
const TeamArchiveSearchAndAddButton: React.FC<ITeamArchiveSearchAndAddButton> = (props) => {

  const [fileNameSearch, setFileNameSearch] = useState<string>("");
  const dispatch = useAppDispatch();

  return (
    <Box display={"flex"} flexDirection={"row"} alignItems={"start"} justifyContent={"space-between"}>
      <TextField
        value={fileNameSearch}
        onChange={e => setFileNameSearch(e.target.value)}
        id="search-file-input"
        type={"search"}
        variant={"standard"}
        InputProps={{
          placeholder: "File Name",
          startAdornment:
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
        }}
      />
      <Button variant={"contained"}
              sx={{ml: 2}}
              startIcon={<Add/>}
              onClick={() => dispatch(fileReducerActions.setShowFileUploadingModal(true))}>
        Add File
      </Button>
      <TeamArchiveAddFileModal/>
    </Box>
  );
};

export interface ITeamArchiveSearchAndAddButton {

}

export default TeamArchiveSearchAndAddButton;
