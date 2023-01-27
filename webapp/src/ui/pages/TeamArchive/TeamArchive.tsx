import React, {useEffect} from 'react';
import { useParams } from 'react-router';
import {useGetTeamFiles} from "../../../hooks/contracts/teamArchive/useGetTeamFiles";
import {useNetwork} from "wagmi";
import {Box, Tab, Tabs} from "@mui/material";
import {Folder, Phone} from "@mui/icons-material";
import CommonBasePageStructure from "../../organisms/Common.BasePageStructure/Common.BasePageStructure";
import {useAppDispatch} from "../../../hooks/redux/reduxHooks";
import {fileReducerActions} from "../../../store/reducers/file";
import TeamArchiveSearchAndAddButton
  from "../../organisms/TeamArchive.SearchAndAddButton/TeamArchive.SearchAndAddButton";

/**
 *
 * @param {React.PropsWithChildren<ITeamHomepage>} props
 * @return {JSX.Element}
 * @constructor
 */
const TeamArchive: React.FC<ITeamHomepage> = (props) => {
  const { teamAddress } = useParams();
  const network = useNetwork();
  const dispatch = useAppDispatch();

  const teamFiles = useGetTeamFiles({
    amount: 100,
    chainId: network.chain.id,
    teamAddress: teamAddress,
    reverse: true
  });

  useEffect(() => {
    if (teamFiles.completed && teamFiles.error === "" && teamFiles.result ) {
      console.log(teamFiles.result);
      // dispatch(fileReducerActions.setFileList(teamFiles.result.teamFiles));
    }
  }, [teamFiles.completed])

  // evaluate the current tab

  return (
    <CommonBasePageStructure>

      <Box mt={4}>
        <TeamArchiveSearchAndAddButton/>
      </Box>



    </CommonBasePageStructure>
  );
};

export interface ITeamHomepage {

}

export default TeamArchive;
