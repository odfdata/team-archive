import React, {useEffect, useState} from 'react';
import {Box, Button, InputAdornment, TextField} from "@mui/material";
import {Add, Search} from "@mui/icons-material";
import TeamArchiveAddFileModal from "../TeamArchive.AddFileModal/TeamArchive.AddFileModal";
import {useAppDispatch} from "../../../hooks/redux/reduxHooks";
import file, {fileReducerActions} from "../../../store/reducers/file";
import {useDebounce} from "use-debounce";

/**
 *
 * @param {React.PropsWithChildren<ITeamArchiveSearchAndAddButton>} props
 * @return {JSX.Element}
 * @constructor
 */
const TeamArchiveSearchAndAddButton: React.FC<ITeamArchiveSearchAndAddButton> = (props) => {

  const [fileNameSearch, setFileNameSearch] = useState<string>("");
  const [fileNameSearchDebounced] = useDebounce(fileNameSearch, 500);
  const dispatch = useAppDispatch();

  // set the value to filter in the parent component
  useEffect(() => {
    props.filter(fileNameSearchDebounced);
  }, [fileNameSearchDebounced])

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
  filter: (string) => void;  // function used to set the filter written in this search bar
}

export default TeamArchiveSearchAndAddButton;
